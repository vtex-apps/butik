import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Vimeo from './Vimeo'

class Video extends Component {
  static getThumbUrl(url, thumbWidth) {
    if (url.search('vimeo') !== -1) {
      return Vimeo.getThumbUrl(url, thumbWidth)
    }
  }

  render() {
    const { url } = this.props

    if (url.search('vimeo') !== -1) {
      return <Vimeo {...this.props} />
    }
  }
}

Video.propTypes = {
  /** Video url */
  url: PropTypes.string.isRequired,
  /** Unique id for iFrame */
  id: PropTypes.number.isRequired,
  /** Function that receives the video thumbnail URL as prop */
  setThumb: PropTypes.func,
  /** Desired width for the thumbnail retrieved by the function above */
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  /** Dynamic prop that pauses and plays the video */
  play: PropTypes.bool,
}

export default Video
