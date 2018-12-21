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
    const { skus, variations } = this.props

    variations.forEach(variation => {
      /** Separate all variations into visualVariations and standardVariations based on thumbSrc value */
      if (variation.thumbSrc) this.visualVariations.push(variation.name)
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
        this.standardVariations
      )
    )

    this.setState({ stateMachineStateHash: this.stateMachine.initial })
    this.stateMachine.interpret
      .onTransition(state =>
        this.setState({ stateMachineStateHash: state.value })
      )
      .start()
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
  createStateMachine = (skus, visualVariations, standardVariations) => {
    const { stateMachine } = this
    stateMachine.id = 'SKUSelector'
    stateMachine.states = {}
    stateMachine.initial = null
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

        if (bitMask === 0 && !stateMachine.initial)
          stateMachine.initial = hash(state.variations)

        const stateKey = hash(state.variations)
        if (states[stateKey]) continue

        states[stateKey] = state
        states[stateKey].sku = sku.skuId
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

    return Machine(stateMachine)
  }

  onSelectItem = actionHash => () => {
    this.stateMachine.interpret.send(actionHash)
  }

  render() {
    const { visualVariations, standardVariations } = this
    const variations = visualVariations.concat(standardVariations)

    const { stateMachineStateHash } = this.state
    if (!stateMachineStateHash) return <div />

    const stateMachineState = this.stateMachine.states[stateMachineStateHash]

    const transitions = stateMachineState.on
    const selectedVariations = stateMachineState.variations

    return (
      <React.Fragment>
        {variations.map((variation, variationIndex) => {
          const selectedItem = selectedVariations[variation]

          const items = Object.keys(this.variationsOptions[variation]).reduce(
            (accumulator, label) => {
              const actionHash = hash({
                variation,
                label: label === selectedItem ? null : label,
              })

              if (
                transitions[actionHash] ||
                label === selectedVariations[variation]
              )
                accumulator.push({
                  label,
                  available: true,
                  thumbSrc: null,
                  onSelectItem: this.onSelectItem(actionHash),
                })
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
              selectedItem={selectedItem}
            />
          )
        })}
      </React.Fragment>
    )
  }
}

// UP => selected SKU, isSkuFullySelected

SKUSelector.propTypes = {
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      /** Variation name, the same used as key in 'skus' */
      name: PropTypes.string,
    })
  ),
  /** Can just pass vtex product.items */
  skus: PropTypes.arrayOf(
    PropTypes.shape({
      /** Value that will be returned as identifier when selected */
      skuId: PropTypes.any,
      /** Also has the values for each variation as variationName: label */
    })
  ),
  handleSKUSelect: PropTypes.func,
}
export default SKUSelector
