import React from "react"

import { observer } from "mobx-react-lite"
import { Image, ImageSourcePropType, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"

const DISPLAY_ROW: ViewStyle = {}

interface DisplayRowProps {
  left?: React.ReactNode
  right?: React.ReactNode
}

function DisplayRow(props: DisplayRowProps) {
  return (
    <View style={DISPLAY_ROW}>
      {props.left}
      {props.right}
    </View>
  )
}

const DISPLAY_ITEM: ViewStyle = {
  backgroundColor: "black",
  display: "flex",
  justifyContent: "center",
}

const DISPLAY_ITEM_TEXT: TextStyle = {
  color: "white",
  textTransform: "uppercase",
  fontWeight: "600",
}

interface DisplaItemProps {
  titleTx: string
  icon: ImageSourcePropType
}
function DisplayItem(props: DisplaItemProps) {
  return (
    <View style={DISPLAY_ITEM}>
      <Image source={props.icon} />
      <Text style={DISPLAY_ITEM_TEXT} tx={props.titleTx} />
    </View>
  )
}

export const FlightMenu = observer(() => {
  return (
    <View>
      <DisplayRow left={<DisplayItem titleTx="mapScreen.follow" icon={require("./airplane")} />} />
    </View>
  )
})
