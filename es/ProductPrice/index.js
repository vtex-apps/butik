var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import ContentLoader from 'react-content-loader';
import { FormattedMessage, injectIntl } from 'react-intl';

import PricePropTypes from './propTypes';
import Installments from './Installments';

/**
 * The Price component. Shows the prices information of the Product Summary.
 */
var Price = (_temp2 = _class = function (_Component) {
  _inherits(Price, _Component);

  function Price() {
    var _temp, _this, _ret;

    _classCallCheck(this, Price);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.currencyOptions = {
      style: 'currency',
      currency: _this.context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Price.prototype.render = function render() {
    var _props = this.props,
        sellingPrice = _props.sellingPrice,
        listPrice = _props.listPrice,
        showListPrice = _props.showListPrice,
        showInstallments = _props.showInstallments,
        showLabels = _props.showLabels,
        showSavings = _props.showSavings,
        labelSellingPrice = _props.labelSellingPrice,
        className = _props.className,
        loaderClass = _props.loaderClass,
        listPriceContainerClass = _props.listPriceContainerClass,
        listPriceLabelClass = _props.listPriceLabelClass,
        listPriceClass = _props.listPriceClass,
        sellingPriceContainerClass = _props.sellingPriceContainerClass,
        sellingPriceLabelClass = _props.sellingPriceLabelClass,
        sellingPriceClass = _props.sellingPriceClass,
        savingsContainerClass = _props.savingsContainerClass,
        savingsClass = _props.savingsClass,
        installments = _props.installments,
        installmentClass = _props.installmentClass,
        interestRateClass = _props.interestRateClass,
        installmentContainerClass = _props.installmentContainerClass,
        styles = _props.styles,
        formatNumber = _props.intl.formatNumber;
    var classes = this.props.classes;
    // avoiding undefined verifications

    classes = _extends({}, Price.defaultProps.classes, classes);

    if (showListPrice && isNil(listPrice) || isNil(sellingPrice)) {
      return React.createElement(Price.Loader, _extends({ loaderClass: loaderClass }, styles));
    }

    var differentPrices = showListPrice && sellingPrice !== listPrice;

    return React.createElement(
      'div',
      { className: classNames('vtex-price', className) },
      differentPrices && React.createElement(
        'div',
        { className: classNames('vtex-price-list__container', listPriceContainerClass) },
        showLabels && React.createElement(
          'div',
          { className: classNames('vtex-price-list__label', listPriceLabelClass) },
          React.createElement(FormattedMessage, { id: 'pricing.from' })
        ),
        React.createElement(
          'span',
          { className: classNames('vtex-price-list', listPriceClass) },
          formatNumber(listPrice, this.currencyOptions)
        )
      ),
      React.createElement(
        'div',
        { className: classNames('vtex-price-selling__container', sellingPriceContainerClass) },
        showLabels && React.createElement(
          'div',
          { className: classNames('vtex-price-selling__label', sellingPriceLabelClass) },
          labelSellingPrice || React.createElement(FormattedMessage, { id: 'pricing.to' })
        ),
        React.createElement(
          'div',
          { className: classNames('vtex-price-selling', sellingPriceClass) },
          formatNumber(sellingPrice, this.currencyOptions)
        )
      ),
      showInstallments && React.createElement(Installments, {
        installments: installments,
        showLabels: showLabels,
        formatNumber: formatNumber,
        currencyOptions: this.currencyOptions,
        className: installmentContainerClass,
        interestRateClass: interestRateClass,
        installmentClass: installmentClass
      }),
      differentPrices && showSavings && React.createElement(
        'div',
        { className: classNames('vtex-price-savings__container', savingsContainerClass) },
        React.createElement(
          'div',
          { className: classNames('vtex-price-savings', savingsClass) },
          React.createElement(FormattedMessage, {
            id: 'pricing.savings',
            values: {
              savings: formatNumber(listPrice - sellingPrice, this.currencyOptions)
            }
          })
        )
      )
    );
  };

  return Price;
}(Component), _class.contextTypes = {
  culture: PropTypes.object
}, _class.defaultProps = {
  showListPrice: true,
  showLabels: true,
  showInstallments: false,
  showSavings: false,
  labelSellingPrice: null
}, _temp2);
Price.propTypes = process.env.NODE_ENV !== "production" ? PricePropTypes : {};


Price.Loader = function () {
  var loaderProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement(
    'div',
    { className: classNames('vtex-price vtex-price-loader', loaderProps.loaderClass) },
    React.createElement(
      ContentLoader,
      _extends({
        style: {
          width: '100%',
          height: '100%'
        },
        width: 300,
        height: 70,
        preserveAspectRatio: 'xMinYMin meet'
      }, loaderProps),
      React.createElement('rect', _extends({
        height: '0.75em',
        width: '50%',
        x: '25%'
      }, loaderProps['vtex-price-list__container--loader'])),
      React.createElement('rect', loaderProps['vtex-price-selling__label--loader']),
      React.createElement('rect', _extends({
        height: '1em',
        width: '70%',
        x: '15%',
        y: '1.25em'
      }, loaderProps['vtex-price-selling--loader'])),
      React.createElement('rect', _extends({
        height: '0.75em',
        width: '80%',
        x: '10%',
        y: '2.75em'
      }, loaderProps['vtex-price-installments--loader'])),
      React.createElement('rect', loaderProps['vtex-price-savings--loader'])
    )
  );
};

Price.Loader.displayName = 'Price.Loader';

var priceWithIntel = injectIntl(Price);

priceWithIntel.schema = {
  title: 'editor.productPrice.title',
  description: 'editor.productPrice.description',
  type: 'object',
  properties: {
    labelSellingPrice: {
      type: 'string',
      title: 'editor.productPrice.labelSellingPrice',
      default: Price.defaultProps.labelSellingPrice,
      isLayout: true
    },
    showListPrice: {
      type: 'boolean',
      title: 'editor.productPrice.showListPrice',
      default: Price.defaultProps.showListPrice,
      isLayout: true
    },
    showLabels: {
      type: 'boolean',
      title: 'editor.productPrice.showLabels',
      default: Price.defaultProps.showLabels,
      isLayout: true
    },
    showInstallments: {
      type: 'boolean',
      title: 'editor.productPrice.showInstallments',
      default: Price.defaultProps.showInstallments,
      isLayout: true
    },
    showSavings: {
      type: 'boolean',
      title: 'editor.productPrice.showSavings',
      default: Price.defaultProps.showSavings,
      isLayout: true
    }
  }
};

export default priceWithIntel;