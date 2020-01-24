import React, { Component } from 'react'

import styled from 'styled-components'

import off from './faces/dog-off.jpg'
import listening from './faces/dog-listening.jpg'
import waiting from './faces/dog-waiting.jpg'
import thinking from './faces/dog-thinking.jpg'
import speaking from './faces/dog-speaking.jpg'

import { Animate } from 'react-move'
import { easeExpOut, easeCubicOut } from 'd3-ease'

const images = {
  off,
  listening,
  waiting,
  thinking,
  speaking
}

class Face extends Component {
  state = {
    loadedImages: images,
    loading: false,
    offsetX: false,
    offsetY: false,
  }

  move = (start, end) => {

  }

  render() {
    return (
      <>
        <Animate
          start={() => ({
            x: 0,
            y: 0,
          })}
          update={() => ({
            x: [this.props.offsetX ? 50 : 0],
            y: [this.props.offsetY ? 20 : 0],
            timing: { duration: 1300, ease: this.props.offset ? easeExpOut : easeCubicOut },
          })}
        >
          {(state) => {
            const { x, y } = state

            return (
              <BgImage
                src={this.state.loadedImages[this.props.status]}
                alt={'img'}
                // offset={this.props.offset}
                offsetX={x}
                offsetY={y}
              />
            )
          }}
        </Animate>
      </>
    )
  }

  componentWillMount = () => {
    Object.entries(images).forEach(([key, image]) => {
      const img = new Image()
      img.src = image

      img.onload = () => {
        console.log(image + ' loaded')
      }
    })
  }

  componentWillUnmount = () => {

  }
}



const BgImage = styled(({ className, alt, src, offsetX, offsetY, ...props }) => (
  <div className={className} style={{ left: `${offsetX}%`, bottom: `${offsetY}%` }}>
    <img  src={src} alt={alt} height = "100%" width = "100%" {...props} />
  </div>
))`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  background-color: black;
`

export default Face