import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Vimeo extends Component {
  static getThumbUrl = (url, thumbWidth) =>
    new Promise((resolve, reject) => {
      const getUrl = `https://vimeo.com/api/oembed.json?url=${url}`
      fetch(getUrl)
        .then(response => {
          return response.json()
        })
        .then(response => {
          resolve(Vimeo.thumbUrlFromResp(response, thumbWidth))
        })
        .catch(() => reject())
    })

  static thumbUrlFromResp(response, thumbWidth) {
    const { height, width } = response
    const thumb = response.thumbnail_url_with_play_button

    thumbWidth = thumbWidth || response.thumbnail_width
    const thumbHeight = Math.ceil((thumbWidth * height) / width)

    return thumb.replace(
      /_[0123456789]*x[0123456789]*./,
      `_${thumbWidth}x${thumbHeight}.`
    )
  }

  constructor(props) {
    super(props)

    this.state = { iframe: {} }

    const { loop, autoplay, width, height, showTitle, url } = this.props
    const params = `autoplay=${autoplay}&loop=${loop}&title=${showTitle}&width=${width}&height=${height}`
    const getUrl = `https://vimeo.com/api/oembed.json?url=${url}&${params}`

    this.iframeRef = React.createRef()

    fetch(getUrl)
      .then(response => {
        return response.json()
      })
      .then(response => {
        const { height, width, html, title } = response

        const thumbUrl = Vimeo.thumbUrlFromResp(response, props.thumbWidth)
        props.setThumb && props.setThumb(thumbUrl, title)

        const src = html.match(/src= *" *([^"]*) *"/)[1] // Get url from response

        this.setState({
          iframe: {
            divStyle: { padding: `${(100 * height) / width}% 0 0 0` },
            src: src,
          },
        })
      })
  }

  componentDidMount() {
    this.iframeRef.current.onload = () => (this.frameReady = true)
  }

  executeCommand = command => () => {
    if (!this.frameReady) return

    const vimeoCommand = JSON.stringify({ method: command })
    this.iframeRef.current.contentWindow.postMessage(
      vimeoCommand,
      'https://player.vimeo.com'
    )
  }

  render() {
    const { iframe } = this.state
    const { className, id } = this.props

    this.props.playing
      ? this.executeCommand('play')()
      : this.executeCommand('pause')()

    return (
      <div style={iframe.divStyle} className={`relative ${className}`}>
        <iframe
          ref={this.iframeRef}
          title={id}
          className="absolute top-0 left-0 w-100 h-100"
          src={iframe.src}
          frameBorder="0"
          allowFullScreen
          allow="autoplay"
        />
      </div>
    )
  }
}

Vimeo.propTypes = {
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
}

Vimeo.defaultProps = {
  loop: true,
  autoplay: false,
  width: null,
  height: null,
  showTitle: false,
  className: '',
}

export default Vimeo
