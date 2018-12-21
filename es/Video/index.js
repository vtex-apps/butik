function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Vimeo from './Vimeo';

var Video = function (_Component) {
  _inherits(Video, _Component);

  function Video() {
    _classCallCheck(this, Video);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Video.getThumbUrl = function getThumbUrl(url, thumbWidth) {
    if (url.search('vimeo') !== -1) {
      return Vimeo.getThumbUrl(url, thumbWidth);
    }
  };

  Video.prototype.render = function render() {
    var url = this.props.url;


    if (url.search('vimeo') !== -1) {
      return React.createElement(Vimeo, this.props);
    }
  };

  return Video;
}(Component);

Video.propsTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  play: PropTypes.bool
};

export default Video;