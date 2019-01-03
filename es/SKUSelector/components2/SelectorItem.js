function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import classNames from 'classnames';

/**
 * Inherits the components2 that should be displayed inside the Selector component.
 */

var SelectorItem = function (_PureComponent) {
  _inherits(SelectorItem, _PureComponent);

  function SelectorItem() {
    _classCallCheck(this, SelectorItem);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  SelectorItem.prototype.render = function render() {
    var _props = this.props,
        isAvailable = _props.isAvailable,
        isSelected = _props.isSelected,
        children = _props.children,
        maxPrice = _props.maxPrice,
        price = _props.price,
        onClick = _props.onClick,
        isImage = _props.isImage;

    var discount = getDiscount(maxPrice, price);

    return React.createElement(
      'div',
      {
        className: classNames('vtex-sku-selector__item relative di pointer flex items-center', isImage && 'vtex-sku-selector__item-image'),
        onClick: onClick },
      React.createElement('div', {
        className: classNames('absolute frame-around b--action-primary br3 bw1', isSelected && 'ba')
      }),
      React.createElement(
        'div',
        {
          className: classNames('w-100 h-100 ba br2 b b--muted-4 z-1 c-muted-5 flex items-center overflow-hidden', isSelected || 'hover-b--muted-2') },
        React.createElement('div', {
          className: classNames('absolute absolute--fill', isAvailable || 'diagonal-cross')
        }),
        React.createElement(
          'div',
          {
            className: classNames(isImage || 'c-on-base center pl5 pr5 z-1') },
          children
        )
      ),
      discount > 0 && React.createElement(
        'span',
        { className: 'vtex-sku-selector__bagde b' },
        React.createElement(FormattedNumber, { value: discount, style: 'percent' })
      )
    );
  };

  return SelectorItem;
}(PureComponent);

export { SelectorItem as default };


SelectorItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Index of the item into the selector parent component starting from 0 */
  index: PropTypes.number,
  /** Children components2 */
  children: PropTypes.node,
  /** Function that is called when the item is clicked */
  onClick: PropTypes.func,
  /** Flag that indicates if the sku is available */
  isAvailable: PropTypes.bool,
  /** Flag that indicates if the current item is selected */
  isSelected: PropTypes.bool,
  /** Max sku price */
  maxPrice: PropTypes.number,
  /** Price of the current sku */
  price: PropTypes.number,
  /** SKU's ID */
  skuId: PropTypes.string,
  /** True if it's an image variation */
  isImage: PropTypes.bool
} : {};

SelectorItem.defaultProps = {
  index: 0,
  children: {},
  isAvailable: true,
  isSelected: false
};

var getDiscount = function getDiscount(maxPrice, price) {
  var discount = 0;
  if (maxPrice && price) {
    discount = 1 - price / maxPrice;
  }
  return discount;
};