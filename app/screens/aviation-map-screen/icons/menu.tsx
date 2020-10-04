import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <Path d="M24 6H0V2h24v4zm0 4H0v4h24v-4zm0 8H0v4h24v-4z" />
    </Svg>
  )
}

export default SvgComponent
