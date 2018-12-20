import React, { Component } from 'react'
import { render } from 'react-dom'
import SKUSelector from '../../src/SKUSelector'

import Example from '../../src'
import Carousel from '../../src/Carousel'
import './tachyons.css'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = { k: 0 }
  }

  change = () =>
    setTimeout(() => {
      console.log('changing...')
      this.setState({ k: this.state.k + 1 })
      this.change()
    }, 100000)

  componentDidMount() {
    this.change()
  }
  render() {
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
      src: 'https://vimeo.com/113502896',
      thumbWidth: 200,
    })
     */
    const skus = []
    for (let i = 1; i <= 50; i++) {
      const options = { skuId: i }
      for (let j = 1; j <= 5; j++)
        options[`var${j}`] = `${Math.floor(Math.random() * 4)}`
      skus.push(options)
    }

    const skuSelectorProps = {
      variations: [
        {
          name: 'var1',
          thumbSrc:
            'https://storecomponents.vteximg.com.br/arquivos/ids/155472/Frame-3.jpg?v=636793763985400000',
        },
        {
          name: 'var2',
          thumbSrc: null,
        },
        {
          name: 'var3',
          thumbSrc:
            'https://storecomponents.vteximg.com.br/arquivos/ids/155472/Frame-3.jpg?v=636793763985400000',
        },
        {
          name: 'var4',
          thumbSrc: null,
        },
        {
          name: 'var5',
          thumbSrc: null,
        },
      ],
      skus,
    }

    return (
      <div>
        <h1>butik Demo</h1>
        <Example />
        {/**
        <div className="ml7-ns mw7">
          <Carousel slides={slides} />
        </div>
         */}
        <SKUSelector {...skuSelectorProps} />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
