import React from 'react'
import image from './background.jpg'

export default function Background() {
  return (
    <div style={{ backgroundImage:`url(${image})`,
    position: 'absolute',
    top:0,
    left: 0,
    height: '1128px',
    width: "1440px",
    backgroundSize: 'cover', 
    zIndex: '-100'
  }}/>
  )
}
