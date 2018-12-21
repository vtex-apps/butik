var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import debounce from 'debounce';
import { FormattedMessage } from 'react-intl';
import './global.css';

var transitionStyle = function transitionStyle(transitionTime) {
  return {
    transition: transitionTime + 'ms ease-in-out'
  };
};

var GradientCollapse = function (_Component) {
  _inherits(GradientCollapse, _Component);

  function GradientCollapse(props) {
    _classCallCheck(this, GradientCollapse);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.calcMaxHeight = function () {
      var collapseHeight = _this.props.collapseHeight;

      var wrapper = _this.wrapper.current;

      if (wrapper.scrollHeight > collapseHeight) {
        var maxHeight = wrapper.scrollHeight + 60;
        _this.setState({ isCollapseVisible: true, maxHeight: maxHeight });
      } else _this.setState({ isCollapseVisible: false, maxHeight: 'auto' });
    };

    _this.debouncedCalcMaxHeight = debounce(_this.calcMaxHeight, 500);

    _this.state = { isCollapseVisible: true, collapsed: true, maxHeight: 'auto' };

    _this.wrapper = React.createRef();
    return _this;
  }

  GradientCollapse.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.debouncedCalcMaxHeight);
    this.calcMaxHeight();
  };

  GradientCollapse.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedCalcMaxHeight);
  };

  GradientCollapse.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        collapseHeight = _props.collapseHeight;
    var _state = this.state,
        collapsed = _state.collapsed,
        isCollapseVisible = _state.isCollapseVisible,
        maxHeight = _state.maxHeight;

    var height = isCollapseVisible && collapsed ? collapseHeight : maxHeight;
    var transitionTime = 600;
    var fadeOutTime = 400;

    return React.createElement(
      Transition,
      { timeout: transitionTime, 'in': !collapsed },
      function (state) {
        return React.createElement(
          'div',
          {
            style: _extends({}, transitionStyle(transitionTime), {
              height: height,
              overflow: 'hidden'
            }),
            className: 'relative' },
          React.createElement(
            'div',
            { ref: _this2.wrapper, className: 'h-auto' },
            children
          ),
          React.createElement(
            'div',
            {
              className: (isCollapseVisible ? 'flex' : 'dn') + ' absolute bottom-0 pointer-events-none w-100 h-100 flex-column justify-end' },
            React.createElement('div', {
              style: transitionStyle(fadeOutTime),
              className: (state === 'entered' ? 'o-0' : '') + ' fade-bottom w-100 h-50'
            }),
            React.createElement(
              'div',
              {
                className: (state === 'entered' ? 'bg-transparent' : 'bg-base') + ' tc w-100 pointer-events-auto' },
              React.createElement(
                'div',
                {
                  className: 'c-action-primary t-action pointer ma5',
                  onClick: function onClick() {
                    return _this2.setState({ collapsed: !collapsed });
                  } },
                state === 'entered' || collapsed && state !== 'exited' ? React.createElement(FormattedMessage, { id: 'product-description.collapse.showLess' }) : React.createElement(FormattedMessage, { id: 'product-description.collapse.showMore' })
              )
            )
          )
        );
      }
    );
  };

  return GradientCollapse;
}(Component);

GradientCollapse.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Maximum height collapsed */
  collapseHeight: PropTypes.number.isRequired,
  children: PropTypes.node
} : {};

export default GradientCollapse;