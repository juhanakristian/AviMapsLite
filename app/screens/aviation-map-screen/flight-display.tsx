import React from "react"

import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../components"
import { AviationMenu } from "./aviation-menu"

const DISPLAY_ROW: ViewStyle = {
  height: 100,
  width: "100%",
  display: "flex",
  flexDirection: "row",
}

const DIVIDER_CONTAINER: ViewStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
}

const DIVIDER: ViewStyle = {
  height: 2,
  width: "90%",
  backgroundColor: "#282828",
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

const MENUTOGGLE: ViewStyle = {
  marginTop: -20,
}

const MENUTOGGLE_TEXT: TextStyle = {
  color: "black",
  fontWeight: "600",
  fontSize: 18,
  textTransform: "uppercase",
}

function MenuToggle({ onToggle, toggled }) {
  return (
    <TouchableOpacity style={MENUTOGGLE} onPress={onToggle}>
      <Text style={MENUTOGGLE_TEXT}>{toggled ? "Close" : "Open"}</Text>
    </TouchableOpacity>
  )
}

function Divider() {
  return (
    <View style={DIVIDER_CONTAINER}>
      <View style={DIVIDER} />
    </View>
  )
}

interface FlightDisplayProps {
  style: ViewStyle
  heading: number
  altitude: number
  eta: number
  menu: React.ReactNode
}

export function FlightDisplay(props: FlightDisplayProps) {
  const heading = `${props.heading}°`
  const altitude = `${props.altitude * 3.2808} ft`
  const eta = secondsToHHMM(props.eta)

  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <View style={props.style}>
      <MenuToggle onToggle={() => setMenuOpen(!menuOpen)} toggled={menuOpen} />
      <DisplayRow>
        <DisplayItem titleTx="mapScreen.heading" value={heading} />
        <DisplayItem titleTx="mapScreen.altitude" value={altitude} />
        <DisplayItem titleTx="mapScreen.eta" value={eta} />
      </DisplayRow>
      <Divider />
      {menuOpen && <DisplayRow>{props.menu}</DisplayRow>}
    </View>
  )
}
