function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@vtex/styleguide/lib/Spinner';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import './global.css';
import ImageResizer from '../ImageResizer';

var styles = { barColorPrimary: { backgroundColor: 'currentColor' } };
var LinearProgressWithStyle = withStyles(styles)(LinearProgress);

var LOAD_STATES = {
  LOADING: 'LOADING',
  TRANSITION: 'TRANSITION',
  LOADED: 'LOADED'
};

var imageMinRatio = 2 / 3;

export var LOADER_TYPES = {
  SPINNER: 'SPINNER',
  LINEAR: 'LINEAR'
};

var BlurredLoader = function (_React$Component) {
  _inherits(BlurredLoader, _React$Component);

  function BlurredLoader(props) {
    _classCallCheck(this, BlurredLoader);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.generateImage = function (urlIndex) {
      var realUrls = _this.props.realUrls;
      var realUrlIndex = _this.state.realUrlIndex;

      var bestUrlIndex = urlIndex || _this.props.bestUrlIndex;

      if (realUrlIndex && bestUrlIndex <= realUrlIndex) {
        return;
      }

      var hdImageLoader = new Image();
      hdImageLoader.src = realUrls[bestUrlIndex];

      hdImageLoader.onerror = function () {
        var realUrlIndex = _this.state.realUrlIndex;

        if (!realUrlIndex) realUrlIndex = 0;

        if (_this.loadCounter > 10) return;
        _this.loadCounter++;
        _this.generateImage(Math.max(bestUrlIndex - 1, realUrlIndex));
      };

      hdImageLoader.onload = function () {
        var realUrlIndex = _this.state.realUrlIndex;

        if (realUrlIndex && bestUrlIndex <= realUrlIndex) return;

        _this.setState({
          loadState: LOAD_STATES.TRANSITION,
          realUrlIndex: bestUrlIndex
        });

        var timer = setTimeout(function () {
          _this.setState({ loadState: LOAD_STATES.LOADED });
          _this.props.onload && _this.props.onload();
          delete _this.timers[timer];
        }, 1000);
        _this.timers[timer] = true;

        if (_this.props.bestUrlIndex > bestUrlIndex) {
          _this.generateImage();
        }
      };
    };

    _this.Loader = function () {
      var loaderType = _this.props.loaderType;
      var loadState = _this.state.loadState;

      switch (loaderType) {
        case LOADER_TYPES.LINEAR:
          return React.createElement(
            'div',
            {
              className: 'w-100 top-0 z-2 absolute transition-opacity-1 ' + (loadState === LOAD_STATES.LOADING ? 'o-100' : 'o-0') },
            React.createElement(LinearProgressWithStyle, { className: 'c-action-primary' })
          );
        case LOADER_TYPES.SPINNER:
          return React.createElement(
            'div',
            {
              className: 'absolute z-2 center-all left-0 right-0 top-0 bottom-0 transition-opacity-1 ' + (loadState === LOAD_STATES.LOADING ? 'o-100' : 'o-0'),
              style: { height: 40, width: 40 } },
            React.createElement(Spinner, null)
          );
        default:
          return null;
      }
    };

    _this.state = {
      loadState: LOAD_STATES.LOADING,
      realUrlIndex: null
    };
    _this.timers = {};
    _this.loadCounter = 0;
    return _this;
  }

  BlurredLoader.prototype.componentDidMount = function componentDidMount() {
    this.generateImage();
  };

  BlurredLoader.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    var keys = Object.keys(this.timers);
    keys.forEach(function (key) {
      return _this2.timers[key] && clearTimeout(key);
    });
  };

  BlurredLoader.prototype.render = function render() {
    var Loader = this.Loader;
    var _props = this.props,
        className = _props.className,
        alt = _props.alt,
        loaderUrl = _props.loaderUrl,
        realUrls = _props.realUrls;
    var _state = this.state,
        loadState = _state.loadState,
        realUrlIndex = _state.realUrlIndex;

    var loaded = loadState === LOAD_STATES.LOADED;

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(ImageResizer, {
        className: 'w-100 ' + (loaded ? 'db' : 'dn'),
        alt: alt,
        src: realUrls[realUrlIndex],
        minRatio: imageMinRatio
      }),
      !loaded && React.createElement(
        'div',
        { className: 'relative w-100 db' },
        React.createElement(Loader, null),
        React.createElement(ImageResizer, {
          alt: alt,
          src: loaderUrl,
          minRatio: imageMinRatio,
          className: 'w-100 blur-30 transition-opacity-1 db z-2 ' + (loadState === LOAD_STATES.LOADING ? 'o-100' : 'o-0') + ' ' + className
        }),
        React.createElement(ImageResizer, {
          alt: '',
          src: realUrls[realUrlIndex],
          minRatio: imageMinRatio,
          className: 'absolute z-1 w-100 center left-0 right-0 bottom-0 top-0 transition-opacity-1 db ' + (loadState === LOAD_STATES.LOADING ? 'o-0' : 'o-100')
        })
      )
    );
  };

  return BlurredLoader;
}(React.Component);

BlurredLoader.propTypes = process.env.NODE_ENV !== "production" ? {
  className: PropTypes.string,
  alt: PropTypes.string,
  loaderUrl: PropTypes.string.isRequired,
  realUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  thresholds: PropTypes.arrayOf(PropTypes.number),
  onload: PropTypes.func,
  bestUrlIndex: PropTypes.number,
  loaderType: PropTypes.string
} : {};

BlurredLoader.defaultProps = {
  thresholds: []
};

export default BlurredLoader;