var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var Vimeo = (_temp = _class = function (_Component) {
  _inherits(Vimeo, _Component);

  Vimeo.thumbUrlFromResp = function thumbUrlFromResp(response, thumbWidth) {
    var height = response.height,
        width = response.width;

    var thumb = response.thumbnail_url_with_play_button;

    thumbWidth = thumbWidth || response.thumbnail_width;
    var thumbHeight = Math.ceil(thumbWidth * height / width);

    return thumb.replace(/_[0123456789]*x[0123456789]*./, '_' + thumbWidth + 'x' + thumbHeight + '.');
  };

  function Vimeo(props) {
    _classCallCheck(this, Vimeo);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.state = { iframe: {} };

    var _this$props = _this.props,
        loop = _this$props.loop,
        autoplay = _this$props.autoplay,
        width = _this$props.width,
        height = _this$props.height,
        showTitle = _this$props.showTitle,
        url = _this$props.url;

    var params = 'autoplay=' + autoplay + '&loop=' + loop + '&title=' + showTitle + '&width=' + width + '&height=' + height;
    var getUrl = 'https://vimeo.com/api/oembed.json?url=' + url + '&' + params;

    _this.iframeRef = React.createRef();

    fetch(getUrl).then(function (response) {
      return response.json();
    }).then(function (response) {
      var height = response.height,
          width = response.width,
          html = response.html,
          title = response.title;


      var thumbUrl = Vimeo.thumbUrlFromResp(response, props.thumbWidth);
      props.setThumb && props.setThumb(thumbUrl, title);

      var src = html.match(/src= *" *([^"]*) *"/)[1]; // Get url from response

      _this.setState({
        iframe: {
          divStyle: { padding: 100 * height / width + '% 0 0 0' },
          src: src
        }
      });
    });
    return _this;
  }

  Vimeo.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.iframeRef.current.onload = function () {
      return _this2.frameReady = true;
    };
  };

  Vimeo.prototype.render = function render() {
    var iframe = this.state.iframe;
    var _props = this.props,
        className = _props.className,
        id = _props.id;


    this.props.playing ? this.executeCommand('play')() : this.executeCommand('pause')();

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

  return Vimeo;
}(Component), _class.getThumbUrl = function (url, thumbWidth) {
  return new Promise(function (resolve) {
    var getUrl = 'https://vimeo.com/api/oembed.json?url=' + url;
    fetch(getUrl).then(function (response) {
      return response.json();
    }).then(function (response) {
      resolve(Vimeo.thumbUrlFromResp(response, thumbWidth));
    });
  });
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.executeCommand = function (command) {
    return function () {
      if (!_this3.frameReady) return;

      var vimeoCommand = JSON.stringify({ method: command });
      _this3.iframeRef.current.contentWindow.postMessage(vimeoCommand, 'https://player.vimeo.com');
    };
  };
}, _temp);


Vimeo.propTypes = process.env.NODE_ENV !== "production" ? {
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
  playing: PropTypes.bool
} : {};

Vimeo.defaultProps = {
  loop: true,
  autoplay: false,
  width: null,
  height: null,
  showTitle: false,
  className: ''
};

export default Vimeo;