import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path d="M24 11h-2.051A10 10 0 0013 2.05V0h-2v2.05A10 10 0 002.051 11H0v2h2.051A10 10 0 0011 21.95V24h2v-2.05A10 10 0 0021.949 13H24v-2zm-11 8.931V16h-2v3.931A8.01 8.01 0 014.069 13H8v-2H4.069A8.01 8.01 0 0111 4.069V8h2V4.069A8.008 8.008 0 0119.931 11H16v2h3.931A8.01 8.01 0 0113 19.931zM14 12a2 2 0 11-4.001-.001A2 2 0 0114 12z" />
    </Svg>
  )
}

export default SvgComponent
