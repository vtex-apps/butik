function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import ItemSelector from './ItemSelector';

var VariationSelector = function (_React$PureComponent) {
  _inherits(VariationSelector, _React$PureComponent);

  function VariationSelector() {
    _classCallCheck(this, VariationSelector);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  VariationSelector.prototype.render = function render() {
    var _props = this.props,
        variation = _props.variation,
        selectedItem = _props.selectedItem;


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
          variation.items.map(function (item, i) {
            return React.createElement(ItemSelector, {
              selected: selectedItem === item.label,
              key: i,
              handleSelect: item.onSelectItem,
              label: item.label,
              thumbSrc: item.thumbSrc,
              isAvailable: item.available,
              variation: variation.name
            });
          })
        )
      )
    );
  };

  return VariationSelector;
}(React.PureComponent);

VariationSelector.propTypes = process.env.NODE_ENV !== "production" ? {
  variation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      thumbSrc: PropTypes.string,
      onSelectItem: PropTypes.func.isRequired
    })).isRequired
  }).isRequired,
  /** It's either null when no item is selected or the selected item index */
  selectedItem: PropTypes.string
} : {};

export default VariationSelector;