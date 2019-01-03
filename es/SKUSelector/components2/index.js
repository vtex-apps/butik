function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { withRuntimeContext } from 'render';

import SKUSelector from './SKUSelector';
import { SKUSelectorContainerPropTypes } from '../utils/proptypes';
import { getMainVariationName, getVariationOptions, getMaxSkuPrice, parseSku } from '../utils/index';

import './global.css';

/**
 * Display a list of SKU items of a product and its specifications.
 */

var SKUSelectorContainer = function (_Component) {
  _inherits(SKUSelectorContainer, _Component);

  function SKUSelectorContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, SKUSelectorContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleSkuSelection = function (skuId) {
      _this.props.onSKUSelected ? _this.props.onSKUSelected(skuId) : _this.redirectToSku(skuId);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SKUSelectorContainer.prototype.redirectToSku = function redirectToSku(skuId) {
    var navigate = this.props.runtime.navigate;

    var slug = this.props.productSlug;

    navigate({
      page: 'store/product',
      params: { slug: slug },
      query: 'skuId=' + skuId
    });
  };

  SKUSelectorContainer.prototype.render = function render() {
    if (!this.props.skuSelected || !this.props.skuSelected.variations || this.props.skuSelected.variations.length === 0) return null;

    var skuSelected = this.props.skuSelected && parseSku(this.props.skuSelected);
    var skuItems = this.props.skuItems && this.props.skuItems.map(function (sku) {
      return parseSku(sku);
    });
    var itemId = skuSelected.itemId;
    var variations = skuSelected.variations;

    var name = getMainVariationName(variations);
    var mainVariation = {
      name: name,
      value: skuSelected[name],
      options: getVariationOptions(name, skuItems)
    };

    var maxSkuPrice = getMaxSkuPrice(skuItems);
    var secondaryVariation = {};

    var filteredSkus = skuItems.filter(function (sku) {
      return sku[name] === mainVariation.value;
    });

    if (variations.length > 1) {
      secondaryVariation.name = variations.filter(function (variation) {
        return variation !== name;
      })[0];
      secondaryVariation.options = getVariationOptions(secondaryVariation.name, filteredSkus);
    }

    return React.createElement(SKUSelector, {
      mainVariation: mainVariation,
      secondaryVariation: secondaryVariation,
      onSelectSku: this.handleSkuSelection,
      maxSkuPrice: maxSkuPrice,
      selectedId: itemId
    });
  };

  return SKUSelectorContainer;
}(Component);

SKUSelectorContainer.propTypes = process.env.NODE_ENV !== "production" ? SKUSelectorContainerPropTypes : {};

export default withRuntimeContext(SKUSelectorContainer);