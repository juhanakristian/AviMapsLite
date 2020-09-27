import React from "react"

import { observer } from "mobx-react-lite"
import { Image, ImageSourcePropType, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../components"

const MENU_ROW: ViewStyle = {}

interface MenuRowProps {
  left?: React.ReactNode
  right?: React.ReactNode
}

function MenuRow(props: MenuRowProps) {
  return (
    <View style={MENU_ROW}>
      {props.left}
      {props.right}
    </View>
  )
}

const MENU_BUTTON: ViewStyle = {}

interface MenuButtonProps {
  titleTx: string
  icon: ImageSourcePropType
}
function MenuButton(props: MenuButtonProps) {
  return (
    <View style={MENU_BUTTON}>
      <Image source={props.icon} />
      <Text tx={props.titleTx} />
    </View>
  )
}

export const FlightMenu = observer(() => {
  return (
    <View>
      <MenuRow left={<MenuButton titleTx="mapScreen.follow" icon={require("./airplane")} />} />
    </View>
  )
})
