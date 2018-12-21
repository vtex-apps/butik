var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
var youtubeApiKey = null;

// TODO: Youtube Component disabled until settings update and backend update to support video
// Author: @samuraiexx

var Youtube = (_temp = _class = function (_Component) {
  _inherits(Youtube, _Component);

  function Youtube(props) {
    _classCallCheck(this, Youtube);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.state = { iframe: {} };

    var _this$props = _this.props,
        loop = _this$props.loop,
        autoplay = _this$props.autoplay,
        title = _this$props.title,
        url = _this$props.url;

    var params = 'autoplay=' + autoplay + '&loop=' + loop + '&title=' + title + '&enablejsapi=1&iv_load_policy=3&modestbranding=1';
    var videoId = Youtube.extractVideoID(url);
    var getUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + youtubeApiKey;

    _this.iframeRef = React.createRef();

    fetch(getUrl).then(function (responseonse) {
      return responseonse.json();
    }).then(function (response) {
      if (response.items.length === 0) return;
      response = response.items[0].snippet;

      var _response = response,
          title = _response.title;
      var _response$thumbnails$ = response.thumbnails.default,
          width = _response$thumbnails$.width,
          height = _response$thumbnails$.height;

      var thumbUrl = response.thumbnails.default.url;
      props.setThumb && props.setThumb(thumbUrl, title);

      var src = 'https://www.youtube.com/embed/' + videoId + '?' + params;

      _this.setState({
        iframe: {
          divStyle: { padding: 100 * height / width + '% 0 0 0' },
          src: src
        }
      });
    });
    return _this;
  }

  Youtube.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.iframeRef.current.onload = function () {
      return _this2.frameReady = true;
    };
  };

  Youtube.prototype.render = function render() {
    var iframe = this.state.iframe;
    var _props = this.props,
        className = _props.className,
        id = _props.id;


    this.props.playing ? this.executeCommand('playVideo')() : this.executeCommand('pauseVideo')();

    return React.createElement(
      'div',
      { style: iframe.divStyle, className: 'relative ' + className },
      React.createElement('iframe', {
        ref: this.iframeRef,
        title: id,
        className: 'absolute top-0 left-0 w-100 h-100',
        src: iframe.src,
        frameBorder: '0',
        allowFullScreen: true,
        allow: 'autoplay'
      })
    );
  };

  return Youtube;
}(Component), _class.getThumbUrl = function (url) {
  return new Promise(function (resolve) {
    var videoId = Youtube.extractVideoID(url);
    var getUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=' + youtubeApiKey;
    fetch(getUrl).then(function (responseonse) {
      return responseonse.json();
    }).then(function (response) {
      if (response.items.length === 0) return;
      response = response.items[0].snippet;

      resolve(response.thumbnails.default.url);
    });
  });
}, _class.extractVideoID = function (url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  if (match && match[7].length === 11) return match[7];
  return null;
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.executeCommand = function (command) {
    return function () {
      if (!_this3.frameReady) return;

      var youtubeCommand = JSON.stringify({ event: 'command', func: command });
      _this3.iframeRef.current.contentWindow.postMessage(youtubeCommand, 'https://www.youtube.com');
    };
  };
}, _temp);


Youtube.propTypes = process.env.NODE_ENV !== "production" ? {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired, // Unique ID for iframe title
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  showTitle: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  playing: PropTypes.bool,
  title: PropTypes.string
} : {};

Youtube.defaultProps = {
  loop: true,
  autoplay: false,
  width: null,
  height: null,
  title: false,
  className: ''
};

export default Youtube;