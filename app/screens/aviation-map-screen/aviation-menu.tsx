import React from "react"

import { View, ViewStyle, TouchableOpacity, Pressable } from "react-native"

import SettingsIcon from "./icons/settings"
import RouteIcon from "./icons/route"
import LocationIcon from "./icons/location"

const MENU_BUTTON: ViewStyle = {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  backgroundColor: "black",
  alignItems: "center",
  flexGrow: 1,
  flexBasis: "30%",
}

interface AviationMenuButtonProps {
  icon: React.ReactNode
  onPress: () => void
}

function AviationMenuButton(props: AviationMenuButtonProps) {
  return (
    <Pressable style={MENU_BUTTON} {...props}>
      {props.icon}
    </Pressable>
  )
}

interface AviationMenuProps {
  onLocationPress: () => void
  onRoutePlanningPress: () => void
  onOpenMenu: () => void
  onCloseMenu: () => void
}

export function AviationMenu(props: AviationMenuProps) {
  return (
    <>
      <AviationMenuButton
        icon={<SettingsIcon fill="white" />}
        onPress={() => console.log("PRESS")}
      />
      <AviationMenuButton
        icon={<RouteIcon fill="white" />}
        onPress={() => props.onRoutePlanningPress()}
      />
      <AviationMenuButton
        icon={<LocationIcon fill="white" />}
        onPress={() => {
          props.onCloseMenu()
          props.onLocationPress()
        }}
      />
    </>
  )
}
