function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import HtmlParser from 'react-html-parser';
import GradientCollapse from './components/GradientCollapse';

import './global.css';

/**
 * Product Description Component.
 * Render the description and technical specifications of a product
 */

var ProductDescription = function (_Component) {
  _inherits(ProductDescription, _Component);

  function ProductDescription() {
    _classCallCheck(this, ProductDescription);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ProductDescription.prototype.render = function render() {
    var _props = this.props,
        specifications = _props.specifications,
        description = _props.description;


    if (!description || !specifications) {
      return null;
    }

    var specificationItems = specifications.map(function (specification) {
      return { property: specification.name, specifications: specification.values[0] };
    });

    return React.createElement(
      'div',
      { className: 'vtex-product-description flex-l' },
      React.createElement(
        'div',
        { className: 'w-100 w-60-l' },
        React.createElement(
          'div',
          { className: 't-heading-5 mb5' },
          React.createElement(FormattedMessage, { id: 'product-description.title' })
        ),
        React.createElement(
          'div',
          { className: 'c-muted-1' },
          React.createElement(
            GradientCollapse,
            { collapseHeight: 220 },
            HtmlParser(description)
          )
        )
      ),
      specifications.length > 0 && React.createElement(
        'div',
        { className: 'vtex-product-specifications mt9 mt0-l w-100 w-40-l pl8-l' },
        React.createElement(
          'div',
          { className: 'vtex-product-specifications__title t-heading-5 mb5' },
          React.createElement(FormattedMessage, { id: 'technicalspecifications.title' })
        ),
        React.createElement(
          GradientCollapse,
          { collapseHeight: 220 },
          React.createElement(
            'table',
            { className: 'vtex-product-specifications__table w-100 bg-base border-collapse' },
            React.createElement(
              'thead',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'th',
                  { className: 'w-50 b--muted-4 bb bt c-muted-2 t-body tl pa5' },
                  React.createElement(FormattedMessage, { id: 'product-description.property' })
                ),
                React.createElement(
                  'th',
                  { className: 'w-50 b--muted-4 bb bt c-muted-2 t-body tl pa5' },
                  React.createElement(FormattedMessage, { id: 'product-description.specification' })
                )
              )
            ),
            React.createElement(
              'tbody',
              null,
              specificationItems.map(function (specification, i) {
                return React.createElement(
                  'tr',
                  { key: i },
                  React.createElement(
                    'td',
                    { className: 'w-50 b--muted-4 bb pa5' },
                    specification.property
                  ),
                  React.createElement(
                    'td',
                    { className: 'w-50 b--muted-4 bb pa5' },
                    specification.specifications
                  )
                );
              })
            )
          )
        )
      )
    );
  };

  return ProductDescription;
}(Component);

ProductDescription.defaultProps = {
  specifications: []
};

ProductDescription.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Product description string */
  description: PropTypes.string,
  /** Intl object to provides internationalization */
  intl: intlShape.isRequired,
  /** Specifications that will be displayed on the table */
  specifications: PropTypes.arrayOf(PropTypes.shape({
    /** Specification name */
    name: PropTypes.string.isRequired,
    /** Specifications value */
    values: PropTypes.arrayOf(PropTypes.string).isRequired
  }))
} : {};

export default injectIntl(ProductDescription);