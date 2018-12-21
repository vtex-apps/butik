function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

var ImageResizer = function (_React$Component) {
  _inherits(ImageResizer, _React$Component);

  function ImageResizer(props) {
    _classCallCheck(this, ImageResizer);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.drawImage = function () {
      var src = _this.props.src;


      if (!src) return;

      var image = new Image();

      image.onload = function () {
        var minRatio = _this.props.minRatio;


        if (!_this.canvas || !_this.canvas.current) {
          return;
        }

        var canvas = _this.canvas.current;

        var width = image.width >= image.height * minRatio ? image.width : image.height * minRatio;

        var height = image.height;

        var canvasContext = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        canvasContext.drawImage(image, (width - image.width) / 2, 0);
      };
      image.src = src;
    };

    _this.canvas = React.createRef();
    return _this;
  }

  ImageResizer.prototype.componentDidMount = function componentDidMount() {
    this.drawImage();
  };

  ImageResizer.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.drawImage();
    }
  };

  ImageResizer.prototype.render = function render() {
    var _props = this.props,
        alt = _props.alt,
        className = _props.className;

    return React.createElement('canvas', { ref: this.canvas, alt: alt, className: className });
  };

  return ImageResizer;
}(React.Component);

ImageResizer.propTypes = process.env.NODE_ENV !== "production" ? {
  src: PropTypes.string,
  alt: PropTypes.string,
  minRatio: PropTypes.number,
  className: PropTypes.string
} : {};

export default ImageResizer;