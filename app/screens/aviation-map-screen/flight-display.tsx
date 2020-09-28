import React from "react"

import { observer } from "mobx-react-lite"
import { Image, ImageSourcePropType, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"

import Airplane from "./airplane"

const DISPLAY_ROW: ViewStyle = {
  height: 100,
  width: "100%",
  display: "flex",
  flexDirection: "row",
}

interface DisplayRowProps {
  children?: React.ReactNode | React.ReactNode[]
}

function DisplayRow(props: DisplayRowProps) {
  return <View style={DISPLAY_ROW}>{props.children}</View>
}

const DISPLAY_ITEM: ViewStyle = {
  height: "100%",
  justifyContent: "center",
  backgroundColor: "black",
  alignItems: "center",
  flexGrow: 1,
}

const DISPLAY_ITEM_TEXT: TextStyle = {
  color: "white",
  textTransform: "uppercase",
  fontWeight: "600",
  marginTop: 10,
}

interface DisplaItemProps {
  titleTx: string
  icon: ImageSourcePropType
}
function DisplayItem(props: DisplaItemProps) {
  return (
    <View style={DISPLAY_ITEM}>
      {/* <Image source={props.icon} /> */}
      <Airplane fill="white" />
      <Text style={DISPLAY_ITEM_TEXT} tx={props.titleTx} />
    </View>
  )
}

interface FlightDisplayProps {
  style: ViewStyle
}

export const FlightDisplay = observer((props: FlightDisplayProps) => {
  return (
    <View style={props.style}>
      <DisplayRow>
        <DisplayItem titleTx="mapScreen.heading" icon={require("./airplane")} />
        <DisplayItem titleTx="mapScreen.altitude" icon={require("./airplane")} />
        <DisplayItem titleTx="mapScreen.eta" icon={require("./airplane")} />
      </DisplayRow>
    </View>
  )
})
