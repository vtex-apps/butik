import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export default {
  /** Currency, e.g.: "BRL" */
  currency: PropTypes.string,
  /** Product selling price */
  sellingPrice: PropTypes.number,
  /** Product list price */
  listPrice: PropTypes.number,
  /** True if the product is unavailable */
  unavailable: PropTypes.bool,
  /** Set visibility of list price */
  showListPrice: PropTypes.bool.isRequired,
  /** Set visibility of labels */
  showLabels: PropTypes.bool.isRequired,
  /** Set visibility of installments */
  showInstallments: PropTypes.bool.isRequired,
  /** Set visibility of savings */
  showSavings: PropTypes.bool,
  /** Shows 'From ' before the actual price */
  showStartingAt: PropTypes.bool,
  /** Text to the selling price's label */
  labelSellingPrice: PropTypes.string,
  /** Available installments */
  installments: PropTypes.arrayOf(
    PropTypes.shape({
      /** Installment value */
      Value: PropTypes.number.isRequired,
      /** Interest rate (zero if interest-free) */
      InterestRate: PropTypes.number.isRequired,
      /** Calculated total value */
      TotalValuePlusInterestRate: PropTypes.number,
      /** Number of installments */
      NumberOfInstallments: PropTypes.number.isRequired,
      /** Installment offer name */
      Name: PropTypes.string,
    })
  ),
  /** Classes to be applied to root element */
  className: PropTypes.string,
  /** Classes to be applied to loader root element */
  loaderClass: PropTypes.string,
  /** Classes to be applied to container of list price */
  listPriceContainerClass: PropTypes.string,
  /** Classes to be applied to label of price */
  listPriceLabelClass: PropTypes.string,
  /** Classes to be applied to price value */
  listPriceClass: PropTypes.string,
  /** Classes to be applied to selling price container */
  sellingPriceContainerClass: PropTypes.string,
  /** Classes to be applied to selling price label */
  sellingPriceLabelClass: PropTypes.string,
  /** Classes to be applied to selling price value */
  sellingPriceClass: PropTypes.string,
  /** Classes to be applied to savings container */
  savingsContainerClass: PropTypes.string,
  /** Classes to be applied to savings */
  savingsClass: PropTypes.string,
  /** Classes to be applied to installment element */
  installmentClass: PropTypes.string,
  /** Classes to be applied to installment container */
  installmentContainerClass: PropTypes.string,
  /** Classes to be applied to interest rate element */
  interestRateClass: PropTypes.string,
  /** Classes to be applied to the fromLabel */
  startingAtClass: PropTypes.string,
  /** Classes to be applied to the unavailable message */
  unavailableClass: PropTypes.string,
  /** Component and content loader styles */
  styles: PropTypes.object,
  /** intl property to format data */
  intl: intlShape.isRequired,
}
