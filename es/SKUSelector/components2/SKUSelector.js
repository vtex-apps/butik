function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import Variation from './Variation';
import { SKUSelectorPropTypes } from '../utils/proptypes';

/** Renders the main and the secondary variation, if it exists. */

var SKUSelector = function (_Component) {
  _inherits(SKUSelector, _Component);

  function SKUSelector() {
    _classCallCheck(this, SKUSelector);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  SKUSelector.prototype.render = function render() {
    var _props = this.props,
        selectedId = _props.selectedId,
        onSelectSku = _props.onSelectSku,
        mainVariation = _props.mainVariation,
        secondaryVariation = _props.secondaryVariation,
        maxSkuPrice = _props.maxSkuPrice;


    return React.createElement(
      'div',
      { className: 'vtex-sku-selector' },
      React.createElement(Variation, {
        variation: mainVariation,
        onSelectItem: onSelectSku,
        isSelected: function isSelected(sku) {
          return sku[mainVariation.name] === mainVariation.value;
        },
        maxSkuPrice: maxSkuPrice
      }),
      secondaryVariation.name && React.createElement(Variation, {
        variation: secondaryVariation,
        onSelectItem: onSelectSku,
        isSelected: function isSelected(sku) {
          return sku.itemId === selectedId;
        },
        maxSkuPrice: maxSkuPrice
      })
    );
  };

  return SKUSelector;
}(Component);

export { SKUSelector as default };


SKUSelector.propTypes = process.env.NODE_ENV !== "production" ? SKUSelectorPropTypes : {};