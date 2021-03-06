import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import VariationSelector from './components/VariationSelector'
import { Machine } from 'xstate'
import { interpret } from 'xstate/lib/interpreter'
import hash from 'object-hash'
import './global.css'

/**
 * Display a list of SKU items of a product and its specifications.
 */
class SKUSelector extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
    this.visualVariations = []
    this.standardVariations = []
    this.stateMachine = {}
    this.variationsOptions = {}
  }

  componentDidMount() {
    const { skus, variations, selectedVariations } = this.props
    if (!variations || !variations.length) return

    variations.forEach(variation => {
      /** Separate all variations into visualVariations and standardVariations based on the thumbSrc value */
      if (variation.hasThumbs) this.visualVariations.push(variation.name)
      else this.standardVariations.push(variation.name)

      /** Fills variationsOptions with all possible variationOptions */
      this.variationsOptions[variation.name] = {}
      skus.forEach(sku => {
        this.variationsOptions[variation.name][sku[variation.name]] = true
      })
    })

    this.stateMachine.interpret = interpret(
      this.createStateMachine(
        skus,
        this.visualVariations,
        this.standardVariations,
        selectedVariations && hash(selectedVariations)
      )
    )

    this.setState({ stateMachineStateHash: this.stateMachine.initial })
    this.stateMachine.interpret.onTransition(this.handleStateTransition).start()
  }

  handleStateTransition = state => {
    const stateMachineStateHash = state.value
    const { onChange } = this.props

    this.setState({ stateMachineStateHash })

    const stateMachineState = this.stateMachine.states[stateMachineStateHash]

    const selectedVariations = stateMachineState.variations
    const { sku, price } = stateMachineState

    const allVariationsSelected = Object.keys(selectedVariations).reduce(
      (accumulator, variation) =>
        accumulator && selectedVariations[variation] !== null,
      true
    )

    onChange({
      sku,
      allVariationsSelected,
      selectedVariations,
      price,
    })
  }

  /** Returns the variation that has a different label if there is exactly one different variation
   * or undefined otherwise
   * */
  getDifferentVariation = (stateA, stateB) => {
    let counter = 0
    let differentVariation = null

    Object.keys(stateA).forEach(variation => {
      if (stateA[variation] !== stateB[variation]) {
        counter++
        differentVariation = variation
      }
    })

    if (counter === 1) return differentVariation
  }

  /** Creates a state machine whose state is based on the selected variations **/
  createStateMachine = (
    skus,
    visualVariations,
    standardVariations,
    initialState
  ) => {
    const { stateMachine } = this
    stateMachine.id = 'SKUSelector'
    stateMachine.states = {}
    stateMachine.transitions = {}

    const { states, transitions } = stateMachine

    skus.forEach(sku => {
      /** Creates all possible states without selecting some standardVariations **/
      const bitMaskLimit = 1 << standardVariations.length

      for (let bitMask = 0; bitMask < bitMaskLimit; bitMask++) {
        const state = { variations: {} }

        visualVariations.forEach(
          variation => (state.variations[variation] = sku[variation])
        )

        standardVariations.forEach((variation, variationIndex) => {
          if ((1 << variationIndex) & bitMask)
            state.variations[variation] = sku[variation]
          else state.variations[variation] = null
        })

        const stateKey = hash(state.variations)

        if (bitMask === 0 && !stateMachine.initial)
          stateMachine.initial = stateKey

        if (!states[stateKey] || !states[stateKey].available) {
          if (!states[stateKey]) states[stateKey] = {}

          states[stateKey].variations = state.variations
          states[stateKey].sku = sku.sku
          states[stateKey].available = sku.available
        }

        if (sku.available) {
          if (states[stateKey].price) {
            const { value, notUnique } = states[stateKey].price

            states[stateKey].price.notUnique =
              notUnique || sku.price.notUnique || sku.price.value !== value

            states[stateKey].price.value = Math.min(value, sku.price.value)
          } else states[stateKey].price = { ...sku.price }
        }
      }
    })

    /** Creates a transition from A to B if there is only one different variation **/
    Object.keys(states).forEach(keyA => {
      states[keyA].on = {}

      Object.keys(states).forEach(keyB => {
        const stateA = states[keyA].variations
        const stateB = states[keyB].variations

        const differentVariation = this.getDifferentVariation(stateA, stateB)
        if (!differentVariation) return

        const action = {
          variation: differentVariation,
          label: stateB[differentVariation],
        }

        const actionHash = hash(action)
        transitions[actionHash] = action
        states[keyA].on[actionHash] = keyB
      })
    })

    if (initialState && stateMachine.states[initialState])
      stateMachine.initial = initialState

    return Machine(stateMachine)
  }

  onSelectItem = actionHash => () => {
    this.stateMachine.interpret.send(actionHash)
  }

  render() {
    if (!this.props.variations || !this.props.variations.length) return null

    const { visualVariations, standardVariations } = this
    const { askToSelectVariations, designTokens } = this.props
    const variations = visualVariations.concat(standardVariations)

    const { stateMachineStateHash } = this.state
    if (!stateMachineStateHash) return <div />

    const stateMachineStates = this.stateMachine.states
    const stateMachineState = stateMachineStates[stateMachineStateHash]

    const transitions = stateMachineState.on
    const selectedVariations = stateMachineState.variations

    return (
      <React.Fragment>
        {variations.map((variation, variationIndex) => {
          const selectedItem = selectedVariations[variation]

          const items = Object.keys(this.variationsOptions[variation]).reduce(
            (accumulator, label) => {
              const selected = selectedItem === label

              const actionHash = hash({
                variation,
                label: selected ? null : label,
              })

              const nextStateHash = transitions[actionHash]

              if (nextStateHash || selected) {
                const available = selected
                  ? stateMachineState.available
                  : stateMachineStates[nextStateHash].available

                accumulator.push({
                  label,
                  available,
                  thumbSrc: null,
                  onSelectItem: this.onSelectItem(actionHash),
                })
              }
              return accumulator
            },
            []
          )

          return (
            <VariationSelector
              key={variationIndex}
              variation={{
                name: variation,
                items,
              }}
              designTokens={designTokens}
              selectedItem={selectedItem}
              askToSelectVariation={askToSelectVariations && !selectedItem}
            />
          )
        })}
      </React.Fragment>
    )
  }
}

SKUSelector.propTypes = {
  /** Variation name, the same used as key in 'skus' */
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      hasThumbs: PropTypes.bool,
    })
  ),
  /** Can just pass vtex product.items */
  skus: PropTypes.arrayOf(
    PropTypes.shape({
      /** Value that will be returned when selected */
      sku: PropTypes.any,
      /** True if it's available, available quantity > 0 */
      available: PropTypes.bool,
      /** Necessary for the component return the minimum price at each state */
      price: PropTypes.shape({
        /** The minimum price of that Sku */
        value: PropTypes.number,
        /** True if this sku have different prices from multiple sellers */
        notUnique: PropTypes.bool,
      }),
      /** Also has the values for each variation as variationName: label */
    })
  ),
  /** selectedVariations in the initial state of the form {variationName: label}
   *  for all variations using null if it's not selected */
  selectedVariations: PropTypes.object,
  /** Function called when the state change is triggered. It receives the selected sku,
   *  the variations that are selected and a boolean telling if all variations are selected  */
  onChange: PropTypes.func,
  /** Boolean prop that displays a warning text beside not selected variations */
  askToSelectVariations: PropTypes.bool,
  /** Used to change internal designs. When set, will replace component className **/
  designTokens: PropTypes.shape({ skuSelectorContainer: PropTypes.string }),
}

export default SKUSelector
