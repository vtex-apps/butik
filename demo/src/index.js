import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import SKUSelector from '../../react/components/SKUSelector'

import Carousel from '../../react/components/Carousel'
import './tachyons.css'
import { IntlProvider } from 'react-intl'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = { k: 0, askToSelectVariations: false }
  }

  change = () =>
    setTimeout(() => {
      console.log('Changing carousel images...')
      this.setState({ k: this.state.k + 1 })
      this.change()
    }, 100000)

  componentDidMount() {
    this.change()
  }

  handleSelectionChange = event => {
    console.log(event)
    this.setState(event)
  }

  render() {
    const { askToSelectVariations } = this.state
    /**
    const slides = []
    const ids = [
      [1072, 1070, 1065, 1063, 1062, 1061, 1060, 1059, 1057, 1056],
      [1016, 1018, 1019, 1014, 1009, 1008, 1006, 1005, 1004, 1003],
      [996, 964, 962, 961, 957, 955, 964, 923, 922, 918],
    ]
    console.log(this.state.k)

    for (let i = 0; i < 10; i++) {
      const id = ids[this.state.k % 3][i]
      slides.push({
        type: 'image',
        urls: [`https://picsum.photos/2000/3540?image=${id}`],
        thumbUrl: `https://picsum.photos/100/177?image=${id}`,
        alt: 'This is an alt text',
        bestUrlIndex: 0,
      })
    }

    slides.push({
      type: 'video',
      react: 'https://vimeo.com/113502896',
      thumbWidth: 200,
    })
     */
    const skus = []
    for (let i = 1; i <= 500; i++) {
      const options = { sku: i, available: Math.floor(Math.random() * 2) > 0 }
      for (let j = 1; j <= 5; j++)
        options[`var${j}`] = `${Math.floor(Math.random() * 4)}`
      skus.push(options)
    }

    const skuSelectorProps = {
      variations: [
        {
          name: 'var1',
          hasThumbs: true,
        },
        {
          name: 'var2',
        },
        {
          name: 'var3',
          hasThumbs: true,
        },
        {
          name: 'var4',
        },
        {
          name: 'var5',
        },
      ],
      skus,
    }

    return (
      <IntlProvider locale="en">
        <Fragment>
          <h1>butik Demo</h1>
          {/**
        <div className="ml7-ns mw7">
          <Carousel slides={slides} />
        </div>
         */}
          <SKUSelector
            {...skuSelectorProps}
            askToSelectVariations={askToSelectVariations}
            onChange={this.handleSelectionChange}
          />
        </Fragment>
      </IntlProvider>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
