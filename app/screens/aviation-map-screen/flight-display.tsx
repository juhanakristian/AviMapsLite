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

const MENUTOGGLE_TEXT: TextStyle = {
  color: "black",
  fontWeight: "600",
  fontSize: 18,
  textTransform: "uppercase",
}

function MenuToggle({ onToggle, toggled }) {
  return (
    <TouchableOpacity onPress={onToggle}>
      <Text style={MENUTOGGLE_TEXT}>{toggled ? "Close" : "Open"}</Text>
    </TouchableOpacity>
  )
}

interface FlightDisplayProps {
  style: ViewStyle
  heading: number
  altitude: number
  eta: number
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
      {menuOpen && (
        <DisplayRow>
          <AviationMenu
            onCloseMenu={() => {}}
            onOpenMenu={() => {}}
            onLocationPress={() => {}}
            onRoutePlanningPress={() => {}}
          />
        </DisplayRow>
      )}
    </View>
  )
}
