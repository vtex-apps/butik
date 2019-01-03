function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import SelectorItem from './SelectorItem';
import { stripUrl, isColor } from '../utils';

var Variation = function (_Component) {
  _inherits(Variation, _Component);

  function Variation() {
    _classCallCheck(this, Variation);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Variation.prototype.render = function render() {
    var _props = this.props,
        variation = _props.variation,
        onSelectItem = _props.onSelectItem,
        maxSkuPrice = _props.maxSkuPrice,
        isSelected = _props.isSelected;


    var displayImage = isColor(variation.name);

    return React.createElement(
      'div',
      { className: 'vtex-sku-selector__container flex flex-column mb7' },
      React.createElement(
        'div',
        { className: 'vtex-sku-selector__name-container ma1' },
        React.createElement(
          'span',
          { className: 'vtex-sku-selector__name c-muted-2 db t-small overflow-hidden mb3' },
          variation.name
        ),
        React.createElement(
          'div',
          { className: 'inline-flex flex-wrap ml2' },
          variation.options.map(function (skuItem) {
            if (!skuItem.images.length) return null;
            var _skuItem$images = skuItem.images,
                skuImage = _skuItem$images[0];
            var _skuItem$sellers = skuItem.sellers,
                seller = _skuItem$sellers[0];

            return React.createElement(
              SelectorItem,
              {
                isSelected: isSelected(skuItem),
                key: skuItem.itemId,
                isAvailable: seller.commertialOffer.AvailableQuantity > 0,
                maxPrice: maxSkuPrice,
                skuId: skuItem.itemId,
                price: seller.commertialOffer.Price,
                onClick: function onClick() {
                  return onSelectItem(skuItem.itemId);
                },
                isImage: displayImage },
              displayImage ? React.createElement('img', {
                src: stripUrl(skuImage.imageUrl),
                alt: skuImage.imageLabel
              }) : React.createElement(
                'span',
                { className: 'c-on-base t-body' },
                skuItem[variation.name]
              )
            );
          })
        )
      )
    );
  };

  return Variation;
}(Component);

export { Variation as default };