function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VariationSelector from './components/VariationSelector';
import { Machine } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
import hash from 'object-hash';
import './global.css';

/**
 * Display a list of SKU items of a product and its specifications.
 */

var SKUSelector = function (_PureComponent) {
  _inherits(SKUSelector, _PureComponent);

  function SKUSelector(props) {
    _classCallCheck(this, SKUSelector);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _this.getDifferentVariation = function (stateA, stateB) {
      var counter = 0;
      var differentVariation = null;

      Object.keys(stateA).forEach(function (variation) {
        if (stateA[variation] !== stateB[variation]) {
          counter++;
          differentVariation = variation;
        }
      });

      if (counter === 1) return differentVariation;
    };

    _this.createStateMachine = function (skus, visualVariations, standardVariations) {
      var stateMachine = _this.stateMachine;

      stateMachine.id = 'SKUSelector';
      stateMachine.states = {};
      stateMachine.initial = null;
      stateMachine.transitions = {};

      var states = stateMachine.states,
          transitions = stateMachine.transitions;


      skus.forEach(function (sku) {
        /** Creates all possible states without selecting some standardVariations **/
        var bitMaskLimit = 1 << standardVariations.length;

        var _loop = function _loop(bitMask) {
          var state = { variations: {} };

          visualVariations.forEach(function (variation) {
            return state.variations[variation] = sku[variation];
          });

          standardVariations.forEach(function (variation, variationIndex) {
            if (1 << variationIndex & bitMask) state.variations[variation] = sku[variation];else state.variations[variation] = null;
          });

          if (bitMask === 0 && !stateMachine.initial) stateMachine.initial = hash(state.variations);

          var stateKey = hash(state.variations);
          if (states[stateKey]) return 'continue';

          states[stateKey] = state;
          states[stateKey].sku = sku.skuId;
        };

        for (var bitMask = 0; bitMask < bitMaskLimit; bitMask++) {
          var _ret = _loop(bitMask);

          if (_ret === 'continue') continue;
        }
      });

      /** Creates a transition from A to B if there is only one different variation **/
      Object.keys(states).forEach(function (keyA) {
        states[keyA].on = {};

        Object.keys(states).forEach(function (keyB) {
          var stateA = states[keyA].variations;
          var stateB = states[keyB].variations;

          var differentVariation = _this.getDifferentVariation(stateA, stateB);
          if (!differentVariation) return;

          var action = {
            variation: differentVariation,
            label: stateB[differentVariation]
          };

          var actionHash = hash(action);
          transitions[actionHash] = action;
          states[keyA].on[actionHash] = keyB;
        });
      });

      return Machine(stateMachine);
    };

    _this.onSelectItem = function (actionHash) {
      return function () {
        _this.stateMachine.interpret.send(actionHash);
      };
    };

    _this.state = {};
    _this.visualVariations = [];
    _this.standardVariations = [];
    _this.stateMachine = {};
    _this.variationsOptions = {};
    return _this;
  }

  SKUSelector.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        skus = _props.skus,
        variations = _props.variations;


    variations.forEach(function (variation) {
      /** Separate all variations into visualVariations and standardVariations based on thumbSrc value */
      if (variation.thumbSrc) _this2.visualVariations.push(variation.name);else _this2.standardVariations.push(variation.name);

      /** Fills variationsOptions with all possible variationOptions */
      _this2.variationsOptions[variation.name] = {};
      skus.forEach(function (sku) {
        _this2.variationsOptions[variation.name][sku[variation.name]] = true;
      });
    });

    this.stateMachine.interpret = interpret(this.createStateMachine(skus, this.visualVariations, this.standardVariations));

    this.setState({ stateMachineStateHash: this.stateMachine.initial });
    this.stateMachine.interpret.onTransition(function (state) {
      return _this2.setState({ stateMachineStateHash: state.value });
    }).start();
  };

  /** Returns the variation that has a different label if there is exactly one different variation
   * or undefined otherwise
   * */


  /** Creates a state machine whose state is based on the selected variations **/


  SKUSelector.prototype.render = function render() {
    var _this3 = this;

    var visualVariations = this.visualVariations,
        standardVariations = this.standardVariations;

    var variations = visualVariations.concat(standardVariations);

    var stateMachineStateHash = this.state.stateMachineStateHash;

    if (!stateMachineStateHash) return React.createElement('div', null);

    var stateMachineState = this.stateMachine.states[stateMachineStateHash];

    var transitions = stateMachineState.on;
    var selectedVariations = stateMachineState.variations;

    return React.createElement(
      React.Fragment,
      null,
      variations.map(function (variation, variationIndex) {
        var selectedItem = selectedVariations[variation];

        var items = Object.keys(_this3.variationsOptions[variation]).reduce(function (accumulator, label) {
          var actionHash = hash({
            variation: variation,
            label: label === selectedItem ? null : label
          });

          if (transitions[actionHash] || label === selectedVariations[variation]) accumulator.push({
            label: label,
            available: true,
            thumbSrc: null,
            onSelectItem: _this3.onSelectItem(actionHash)
          });
          return accumulator;
        }, []);

        return React.createElement(VariationSelector, {
          key: variationIndex,
          variation: {
            name: variation,
            items: items
          },
          selectedItem: selectedItem
        });
      })
    );
  };

  return SKUSelector;
}(PureComponent);

// UP => selected SKU, isSkuFullySelected

SKUSelector.propTypes = process.env.NODE_ENV !== "production" ? {
  variations: PropTypes.arrayOf(PropTypes.shape({
    /** Variation name, the same used as key in 'skus' */
    name: PropTypes.string
  })),
  /** Can just pass vtex product.items */
  skus: PropTypes.arrayOf(PropTypes.shape({
    /** Value that will be returned as identifier when selected */
    skuId: PropTypes.any
    /** Also has the values for each variation as variationName: label */
  })),
  handleSKUSelect: PropTypes.func
} : {};
export default SKUSelector;