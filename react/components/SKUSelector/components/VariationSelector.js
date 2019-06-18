import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import ItemSelector from './ItemSelector'

class VariationSelector extends React.PureComponent {
  render() {
    const {
      variation,
      selectedItem,
      askToSelectVariation,
      designTokens,
    } = this.props

    return (
      <div
        className={
          (designTokens && designTokens.skuSelectorContainer) ||
          'vtex-sku-selector__container flex flex-column mb7'
        }>
        <div className="vtex-sku-selector__name-container ma1">
          <span className="vtex-sku-selector__name db t-small overflow-hidden mb3">
            <span className="c-muted-2">{variation.name}</span>
            {askToSelectVariation ? (
              <span className="c-danger ml3 t-mini">
                <FormattedMessage id="sku-selector.select-warning" />{' '}
                {variation.name}
              </span>
            ) : null}
          </span>
          <div className="inline-flex flex-wrap ml2">
            {variation.items.map((item, i) => (
              <ItemSelector
                selected={selectedItem === item.label}
                key={i}
                handleSelect={item.onSelectItem}
                label={item.label}
                thumbSrc={item.thumbSrc}
                isAvailable={item.available}
                variation={variation.name}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

VariationSelector.propTypes = {
  variation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired,
        thumbSrc: PropTypes.string,
        onSelectItem: PropTypes.func.isRequired,
      })
    ).isRequired,
  }).isRequired,
  /** It's either null when no item is selected or the selected item index */
  selectedItem: PropTypes.string,
  askToSelectVariation: PropTypes.bool,
  designTokens: PropTypes.shape({ skuSelectorContainer: PropTypes.string }),
}

export default VariationSelector
