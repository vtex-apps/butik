var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import Loader from './Loader.js';
import { path } from 'ramda';
import BlurredLoader from '../BlurredLoader';
import Video from '../Video';
import CaretLeft from '@vtex/styleguide/lib/icon/CaretLeft';
import CaretRight from '@vtex/styleguide/lib/icon/CaretRight';

import './global.css';

var Swiper = window.navigator ? require('react-id-swiper').default : null;

var initialState = {
  Swiper: null,
  loaded: [],
  thumbSwiper: null,
  gallerySwiper: null,
  thumbUrl: [],
  alt: [],
  thumbsLoaded: false,
  activeIndex: 0
};

var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this2 = _possibleConstructorReturn(this, _Component.call(this, props));

    _this2.debouncedRebuildOnUpdate = debounce(function () {
      _this2.state.thumbSwiper && _this2.state.thumbSwiper.update();
    }, 500);

    _this2.getThumb = function (thumbUrl) {
      if (!window.navigator) return; // Image object doesn't exist when it's being rendered in the server side

      var image = new Image();
      image.onload = function () {
        _this2.thumbLoadCount++;
        if (_this2.thumbLoadCount === _this2.props.slides.length) {
          _this2.setState({ thumbsLoaded: true });
        }
      };
      image.src = thumbUrl;
    };

    _this2.linkThumb = function () {
      var _this = _this2;
      return function () {
        this.visibleSlidesIndexes || (this.visibleSlidesIndexes = []); // Swiper bug fix
        _this.rebuildGalleryOnUpdate = true;
        _this.setState({ thumbSwiper: this });
      };
    };

    _this2.linkGallery = function () {
      var _this = _this2;
      return function () {
        _this.setState({ gallerySwiper: this });
      };
    };

    _this2.onSlideChange = function () {
      var _this = _this2;
      return function () {
        var activeIndex = this.activeIndex;

        _this.setState({ activeIndex: activeIndex });
      };
    };

    _this2.setVideoThumb = function (i) {
      return function (url, title) {
        var thumbUrl = _extends({}, _this2.state.thumbUrl);
        var alt = _extends({}, _this2.state.alt);

        thumbUrl[i] = url;
        alt[i] = title;

        _this2.setState({ thumbUrl: thumbUrl, alt: alt });
      };
    };

    _this2.onImageLoad = function (i) {
      return function () {
        var loaded = _extends({}, _this2.state.loaded);
        loaded[i] = true;
        _this2.setState({ loaded: loaded });
      };
    };

    _this2.renderSlide = function (slide, i) {
      var loaded = _this2.state.loaded;


      switch (slide.type) {
        case 'image':
          return React.createElement(
            'div',
            {
              className: loaded[i] ? 'swiper-zoom-container' : 'overflow-hidden' },
            React.createElement(BlurredLoader, {
              loaderType: 'SPINNER',
              loaderUrl: slide.thumbUrl,
              realUrls: slide.urls,
              bestUrlIndex: slide.bestUrlIndex,
              alt: slide.alt,
              onload: _this2.onImageLoad(i)
            })
          );
        case 'video':
          return React.createElement(Video, {
            url: slide.src,
            setThumb: _this2.setVideoThumb(i),
            playing: i === _this2.state.activeIndex,
            id: i
          });
        default:
          return null;
      }
    };

    _this2.CaretPrev = props.CaretPrev || CaretLeft;
    _this2.CaretNext = props.CaretNext || CaretRight;
    _this2.state = initialState;
    _this2.setInitialVariablesState();
    return _this2;
  }

  Carousel.prototype.setInitialVariablesState = function setInitialVariablesState() {
    var _this3 = this;

    var slides = this.props.slides;

    this.isVideo = [];
    this.rebuildGalleryOnUpdate = false;
    this.thumbLoadCount = 0;

    slides && slides.forEach(function (slide, i) {
      if (slide.type === 'video') {
        _this3.isVideo[i] = true;
        Video.getThumbUrl(slide.src, slide.thumbWidth).then(_this3.getThumb);
      } else _this3.getThumb(slide.thumbUrl);
    });
  };

  Carousel.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.debouncedRebuildOnUpdate);
  };

  Carousel.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedRebuildOnUpdate);
  };

  Carousel.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _state = this.state,
        gallerySwiper = _state.gallerySwiper,
        loaded = _state.loaded,
        activeIndex = _state.activeIndex;
    var isVideo = this.isVideo;


    if (prevProps.slides !== this.props.slides) {
      this.setInitialVariablesState();
      this.setState(initialState);
      return;
    }

    var paginationElement = path(['pagination', 'el'], gallerySwiper);
    if (paginationElement) paginationElement.hidden = isVideo[activeIndex];

    var gallerySwiperZoom = path(['zoom'], gallerySwiper);

    if (gallerySwiperZoom) {
      loaded[activeIndex] ? gallerySwiperZoom.enable() : gallerySwiperZoom.disable();
    }
  };

  Carousel.prototype.render = function render() {
    var _this4 = this;

    var _state2 = this.state,
        thumbSwiper = _state2.thumbSwiper,
        thumbsLoaded = _state2.thumbsLoaded;
    var rebuildGalleryOnUpdate = this.rebuildGalleryOnUpdate;
    var slides = this.props.slides;


    if (!thumbsLoaded || Swiper == null) {
      return React.createElement(Loader, { slidesAmount: slides ? slides.length : 0 });
    }

    var caretClassName = 'pv7 absolute top-50 translate--50y z-2 pointer c-action-primary';
    var galleryParams = {
      containerClass: 'swiper-container',
      pagination: slides.length > 1 ? {
        el: '.swiper-pagination',
        clickable: true,
        bulletActiveClass: 'c-action-primary swiper-pagination-bullet-active'
      } : {},
      navigation: slides.length > 1 ? {
        prevEl: '.swiper-caret-prev',
        nextEl: '.swiper-caret-next',
        disabledClass: 'c-disabled cursor-default'
      } : {},
      thumbs: {
        swiper: thumbSwiper
      },
      zoom: {
        maxRatio: 2
      },
      rebuildOnUpdate: rebuildGalleryOnUpdate,
      resistanceRatio: slides.length > 1 ? 0.85 : 0,
      renderNextButton: function renderNextButton() {
        return React.createElement(
          'span',
          { className: 'swiper-caret-next pl7 right-1 ' + caretClassName },
          React.createElement(_this4.CaretNext, null)
        );
      },
      renderPrevButton: function renderPrevButton() {
        return React.createElement(
          'span',
          { className: 'swiper-caret-prev pr7 left-1 ' + caretClassName },
          React.createElement(_this4.CaretPrev, null)
        );
      },
      on: {
        init: this.linkGallery(),
        slideChange: this.onSlideChange()
      }
    };
    this.rebuildGalleryOnUpdate = false;

    var thumbnailParams = {
      observer: true,
      containerClass: 'swiper-container h-100',
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      freeMode: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      touchRatio: 0.4,
      mousewheel: true,
      preloadImages: true,
      on: {
        init: this.linkThumb()
      },
      shouldSwiperUpdate: true
    };

    return React.createElement(
      'div',
      { className: 'relative overflow-hidden' },
      React.createElement(
        'div',
        {
          className: 'w-20 gallery-thumbs bottom-0 top-0 left-0 absolute pr5 dn\n          ' + (slides.length > 1 ? 'db-ns' : '') },
        React.createElement(
          Swiper,
          thumbnailParams,
          slides.map(function (slide, i) {
            return React.createElement(
              'div',
              { key: i, className: 'swiper-slide w-100 h-auto mb5' },
              React.createElement('img', {
                className: 'w-100 h-auto db',
                alt: slide.alt ? _this4.state.alt[i] : '',
                src: slide.thumbUrl || _this4.state.thumbUrl[i]
              }),
              React.createElement('div', { className: 'absolute absolute--fill b--solid b--muted-2 bw1 thumb-border' })
            );
          })
        )
      ),
      React.createElement(
        'div',
        {
          className: 'w-100 ' + (slides.length > 1 ? 'w-80-ns ml-20-ns' : '') + ' border-box gallery-cursor' },
        React.createElement(
          Swiper,
          galleryParams,
          slides.map(function (slide, i) {
            return React.createElement(
              'div',
              { key: i, className: 'swiper-slide center-all' },
              _this4.renderSlide(slide, i)
            );
          })
        )
      )
    );
  };

  return Carousel;
}(Component);

Carousel.propTypes = process.env.NODE_ENV !== "production" ? {
  CaretPrev: PropTypes.node,
  CaretNext: PropTypes.node,
  slides: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
    type: PropTypes.string,
    /** Props for type == 'image' */
    urls: PropTypes.arrayOf(PropTypes.string),
    alt: PropTypes.string,
    thumbUrl: PropTypes.string,
    bestUrlIndex: PropTypes.number
  }), PropTypes.shape({
    type: PropTypes.string,
    /** Props for type 'video' */
    src: PropTypes.string,
    thumbWidth: PropTypes.number
  })]))
} : {};

export default Carousel;