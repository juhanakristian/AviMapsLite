import React from "react"

import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"

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
  display: "flex",
  justifyContent: "center",
  backgroundColor: "black",
  alignItems: "center",
  flexGrow: 1,
  flexBasis: "30%",
}

const DISPLAY_ITEM_DESC_TEXT: TextStyle = {
  color: "white",
  textTransform: "uppercase",
  fontWeight: "600",
}

const DISPLAY_ITEM_VALUE_TEXT: TextStyle = {
  color: "white",
  fontWeight: "600",
  fontSize: 32,
}

interface DisplaItemProps {
  titleTx: string
  value: string
}
function DisplayItem(props: DisplaItemProps) {
  return (
    <View style={DISPLAY_ITEM}>
      <Text style={DISPLAY_ITEM_VALUE_TEXT}>{props.value}</Text>
      <Text style={DISPLAY_ITEM_DESC_TEXT} tx={props.titleTx} />
    </View>
  )
}

function secondsToHHMM(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const secondsLeft = seconds - hours * 3600
  const minutes = Math.floor(secondsLeft / 60)

  return `${hours}:${minutes}`
}

interface FlightDisplayProps {
  style: ViewStyle
  heading: number
  altitude: number
  eta: number
}

export const FlightDisplay = observer((props: FlightDisplayProps) => {
  const heading = `${props.heading}°`
  const altitude = `${props.altitude * 3.2808} ft`
  const eta = secondsToHHMM(props.eta)

  return (
    <View style={props.style}>
      <DisplayRow>
        <DisplayItem titleTx="mapScreen.heading" value={heading} />
        <DisplayItem titleTx="mapScreen.altitude" value={altitude} />
        <DisplayItem titleTx="mapScreen.eta" value={eta} />
      </DisplayRow>
    </View>
  )
})
