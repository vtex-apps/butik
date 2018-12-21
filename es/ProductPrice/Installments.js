function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import PricePropTypes from './propTypes';

/** Installments component */

var Installments = function (_Component) {
  _inherits(Installments, _Component);

  function Installments() {
    _classCallCheck(this, Installments);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Installments.prototype.render = function render() {
    var _props = this.props,
        showLabels = _props.showLabels,
        formatNumber = _props.formatNumber,
        installments = _props.installments,
        currencyOptions = _props.currencyOptions,
        className = _props.className,
        installmentClass = _props.installmentClass,
        interestRateClass = _props.interestRateClass;


    if (!installments || isEmpty(installments)) {
      return null;
    }

    var noInterestRateInstallments = installments.filter(function (installment) {
      return !installment.InterestRate;
    });

    /*
     * - The selected installment will be the one with the highest `NumberOfInstallments`;
     * - If there is no 'interest-free' installments, the normal installments will be analyzed.
     */
    var installment = (isEmpty(noInterestRateInstallments) ? installments : noInterestRateInstallments).reduce(function (previous, current) {
      return previous.NumberOfInstallments > current.NumberOfInstallments ? previous : current;
    });

    var formattedInstallmentPrice = formatNumber(installment.Value, currencyOptions);

    var _map = [installment.NumberOfInstallments, formattedInstallmentPrice, React.createElement(
      Fragment,
      null,
      'x'
    )].map(function (element, index) {
      return React.createElement(
        'span',
        { className: installmentClass, key: index },
        element
      );
    }),
        installmentsElement = _map[0],
        installmentPriceElement = _map[1],
        timesElement = _map[2];

    return React.createElement(
      'div',
      { className: classNames('vtex-price-installments__container', className) },
      showLabels ? React.createElement(FormattedMessage, {
        id: 'pricing.installment-display',
        values: {
          installments: installmentsElement,
          installmentPrice: installmentPriceElement,
          times: timesElement
        }
      }) : React.createElement(
        Fragment,
        null,
        installmentsElement,
        timesElement,
        ' ',
        installmentPriceElement
      ),
      !installment.InterestRate && React.createElement(
        'div',
        { className: classNames('vtex-price-installments__interest-rate', interestRateClass) },
        React.createElement(FormattedMessage, { id: 'pricing.interest-free' })
      )
    );
  };

  return Installments;
}(Component);

export { Installments as default };
Installments.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Classes to be applied to the root element */
  className: PropTypes.string,
  /** Classes to be applied to installment value element */
  installmentClass: PropTypes.string,
  /** Classes to be applied to interest rate element */
  interestRateClass: PropTypes.string,
  /** Product installments to be displayed */
  installments: PricePropTypes.installments,
  /** Pages editor config to display labels */
  showLabels: PropTypes.bool.isRequired,
  /** react-intl function to format the prices*/
  formatNumber: PropTypes.func.isRequired,
  /** Options to be passe to the formatNumber function*/
  currencyOptions: PropTypes.shape({
    style: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    minimumFractionDigits: PropTypes.number.isRequired,
    maximumFractionDigits: PropTypes.number.isRequired
  }).isRequired
} : {};