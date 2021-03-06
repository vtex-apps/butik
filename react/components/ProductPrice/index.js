import React, { Component } from 'react'
import classNames from 'classnames'
import { isNil } from 'ramda'
import ContentLoader from 'react-content-loader'
import { FormattedMessage, injectIntl } from 'react-intl'

import PricePropTypes from './propTypes'
import Installments from './Installments'

/**
 * The Price component. Shows the prices information of the Product Summary.
 */
class Price extends Component {
  static propTypes = PricePropTypes

  static defaultProps = {
    showListPrice: true,
    showLabels: true,
    showInstallments: false,
    showSavings: false,
    labelSellingPrice: null,
  }

  constructor(props) {
    super(props)

    this.currencyOptions = {
      style: 'currency',
      currency: props.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  }

  render() {
    const {
      sellingPrice,
      listPrice,
      unavailable,
      showListPrice,
      showInstallments,
      showLabels,
      showSavings,
      showStartingAt,
      labelSellingPrice,
      className,
      loaderClass,
      listPriceContainerClass,
      listPriceLabelClass,
      listPriceClass,
      sellingPriceContainerClass,
      sellingPriceLabelClass,
      sellingPriceClass,
      savingsContainerClass,
      savingsClass,
      installments,
      installmentClass,
      interestRateClass,
      installmentContainerClass,
      startingAtClass,
      unavailableClass,
      styles,
      intl: { formatNumber },
    } = this.props

    if ((showListPrice && isNil(listPrice)) || isNil(sellingPrice)) {
      return <Price.Loader loaderClass={loaderClass} {...styles} />
    }

    if (unavailable)
      return (
        <div className={unavailableClass}>
          <FormattedMessage id="pricing.unavailable" />
        </div>
      )

    const differentPrices = showListPrice && sellingPrice !== listPrice

    return (
      <div className={classNames('vtex-price', className)}>
        {differentPrices && (
          <div
            className={classNames(
              'vtex-price-list__container',
              listPriceContainerClass
            )}>
            {showLabels && (
              <div
                className={classNames(
                  'vtex-price-list__label',
                  listPriceLabelClass
                )}>
                <FormattedMessage id="pricing.from" />
              </div>
            )}
            <span className={classNames('vtex-price-list', listPriceClass)}>
              {formatNumber(listPrice, this.currencyOptions)}
            </span>
          </div>
        )}
        <div
          className={classNames(
            'vtex-price-selling__container',
            sellingPriceContainerClass
          )}>
          {showLabels && (
            <div
              className={classNames(
                'vtex-price-selling__label',
                sellingPriceLabelClass
              )}>
              {labelSellingPrice || <FormattedMessage id="pricing.to" />}
            </div>
          )}
          {showStartingAt && (
            <span
              className={classNames(
                'vtex-price-selling__from-tag',
                startingAtClass
              )}>
              <FormattedMessage id="pricing.startingAtLabel" />{' '}
            </span>
          )}
          <div className={classNames('vtex-price-selling', sellingPriceClass)}>
            {formatNumber(sellingPrice, this.currencyOptions)}
          </div>
        </div>
        {showInstallments && (
          <Installments
            installments={installments}
            showLabels={showLabels}
            formatNumber={formatNumber}
            currencyOptions={this.currencyOptions}
            className={installmentContainerClass}
            interestRateClass={interestRateClass}
            installmentClass={installmentClass}
          />
        )}
        {differentPrices && showSavings && (
          <div
            className={classNames(
              'vtex-price-savings__container',
              savingsContainerClass
            )}>
            <div className={classNames('vtex-price-savings', savingsClass)}>
              <FormattedMessage
                id="pricing.savings"
                values={{
                  savings: formatNumber(
                    listPrice - sellingPrice,
                    this.currencyOptions
                  ),
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

Price.Loader = (loaderProps = {}) => {
  const { loaderClass, ...filteredLoaderProps } = loaderProps

  return (
    <div className={classNames('vtex-price vtex-price-loader', loaderClass)}>
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        width={300}
        height={70}
        preserveAspectRatio="xMinYMin meet"
        {...filteredLoaderProps}>
        <rect
          height="0.75em"
          width="50%"
          x="25%"
          {...filteredLoaderProps['vtex-price-list__container--loader']}
        />
        <rect {...filteredLoaderProps['vtex-price-selling__label--loader']} />
        <rect
          height="1em"
          width="70%"
          x="15%"
          y="1.25em"
          {...filteredLoaderProps['vtex-price-selling--loader']}
        />
        <rect
          height="0.75em"
          width="80%"
          x="10%"
          y="2.75em"
          {...filteredLoaderProps['vtex-price-installments--loader']}
        />
        <rect {...filteredLoaderProps['vtex-price-savings--loader']} />
      </ContentLoader>
    </div>
  )
}

Price.Loader.displayName = 'Price.Loader'

const priceWithIntel = injectIntl(Price)

priceWithIntel.schema = {
  title: 'editor.productPrice.title',
  description: 'editor.productPrice.description',
  type: 'object',
  properties: {
    labelSellingPrice: {
      type: 'string',
      title: 'editor.productPrice.labelSellingPrice',
      default: Price.defaultProps.labelSellingPrice,
      isLayout: true,
    },
    showListPrice: {
      type: 'boolean',
      title: 'editor.productPrice.showListPrice',
      default: Price.defaultProps.showListPrice,
      isLayout: true,
    },
    showLabels: {
      type: 'boolean',
      title: 'editor.productPrice.showLabels',
      default: Price.defaultProps.showLabels,
      isLayout: true,
    },
    showInstallments: {
      type: 'boolean',
      title: 'editor.productPrice.showInstallments',
      default: Price.defaultProps.showInstallments,
      isLayout: true,
    },
    showSavings: {
      type: 'boolean',
      title: 'editor.productPrice.showSavings',
      default: Price.defaultProps.showSavings,
      isLayout: true,
    },
  },
}

export default priceWithIntel
