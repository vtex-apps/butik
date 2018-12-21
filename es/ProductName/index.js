var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import classNames from 'classnames';

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
var ProductName = (_temp = _class = function (_Component) {
  _inherits(ProductName, _Component);

  function ProductName() {
    _classCallCheck(this, ProductName);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ProductName.prototype.render = function render() {
    var _props = this.props,
        productReferenceClass = _props.productReferenceClass,
        brandNameClass = _props.brandNameClass,
        skuNameClass = _props.skuNameClass,
        loaderClass = _props.loaderClass,
        className = _props.className,
        name = _props.name,
        styles = _props.styles,
        skuName = _props.skuName,
        showSku = _props.showSku,
        brandName = _props.brandName,
        showBrandName = _props.showBrandName,
        productReference = _props.productReference,
        showProductReference = _props.showProductReference;


    if (!name) {
      return React.createElement(ProductName.Loader, _extends({ className: loaderClass }, styles));
    }

    return React.createElement(
      'div',
      { className: classNames('vtex-product-name', className) },
      React.createElement(
        'span',
        {
          className: classNames('vtex-product-name__brand', brandNameClass) },
        name,
        ' ',
        showBrandName && brandName && '- ' + brandName
      ),
      showSku && skuName && React.createElement(
        'span',
        { className: classNames('vtex-product-name__sku', skuNameClass) },
        skuName
      ),
      showProductReference && productReference && React.createElement(
        'span',
        {
          className: classNames('vtex-product-name__product-reference', productReferenceClass) },
        'REF: ' + productReference
      )
    );
  };

  return ProductName;
}(Component), _class.defaultProps = {
  showBrandName: false,
  showProductReference: false,
  showSku: false
}, _class.Loader = function () {
  var loaderProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement(
    'div',
    {
      className: classNames('vtex-product-name vtex-product-name-loader', loaderProps.className) },
    React.createElement(
      ContentLoader,
      _extends({
        style: {
          width: '100%',
          height: '100%'
        },
        width: 456,
        height: 100,
        preserveAspectRatio: 'xMinYMin meet'
      }, loaderProps),
      React.createElement('rect', _extends({
        height: '1.125em',
        width: '75%',
        x: '15%'
      }, loaderProps['vtex-product-name__brand--loader'])),
      React.createElement('rect', _extends({
        height: '1.125em',
        width: '50%',
        x: '25%',
        y: '1.75em'
      }, loaderProps['vtex-product-name__sku--loader']))
    )
  );
}, _temp);
ProductName.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Name of the product */
  name: PropTypes.string,
  /** Selected SKU name */
  skuName: PropTypes.string,
  /** Show sku */
  showSku: PropTypes.bool,
  /** Product reference */
  productReference: PropTypes.string,
  /** Show product reference */
  showProductReference: PropTypes.bool,
  /** Brand name */
  brandName: PropTypes.string,
  /** Show brand name */
  showBrandName: PropTypes.bool,
  /** Component and content loader styles */
  styles: PropTypes.object,
  /** Classes to be applied to root element */
  className: PropTypes.string,
  /** Classes to be applied to brandName element */
  brandNameClass: PropTypes.string,
  /** Classes to be applied to skuName element */
  skuNameClass: PropTypes.string,
  /** Classes to be applied to productReference element */
  productReferenceClass: PropTypes.string,
  /** Classes to be applied to loader root element */
  loaderClass: PropTypes.string
} : {};


ProductName.schema = {
  title: 'editor.productName.title',
  description: 'editor.productName.description',
  type: 'object',
  properties: {
    showBrandName: {
      type: 'boolean',
      title: 'editor.productName.showBrandName.title',
      default: false,
      isLayout: true
    },
    showSku: {
      type: 'boolean',
      title: 'editor.productName.showSku.title',
      default: false,
      isLayout: true
    },
    showProductReference: {
      type: 'boolean',
      title: 'editor.productName.showProductReference.title',
      default: false,
      isLayout: true
    }
  }
};

export default ProductName;