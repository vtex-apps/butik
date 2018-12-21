import React from 'react'
import PropTypes from 'prop-types'
import ItemSelector from './ItemSelector'

class VariationSelector extends React.PureComponent {
  render() {
    const { variation, selectedItem } = this.props

    return (
      <div className="vtex-sku-selector__container flex flex-column mb7">
        <div className="vtex-sku-selector__name-container ma1">
          <span className="vtex-sku-selector__name c-muted-2 db t-small overflow-hidden mb3">
            {variation.name}
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
}

export default VariationSelector
