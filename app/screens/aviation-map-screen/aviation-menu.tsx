import React from "react"

import { View, ViewStyle, TouchableOpacity } from "react-native"

import MenuIcon from "./icons/menu"
import SettingsIcon from "./icons/settings"
import RouteIcon from "./icons/route"
import LocationIcon from "./icons/location"

const MENU: ViewStyle = {
  width: 75,
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  left: 20,
  top: 60,
  borderWidth: 1,
  borderColor: "white",
  borderRadius: 10,
  backgroundColor: "white",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
}

const MENU_BUTTON: ViewStyle = {
  height: 75,
  width: 75,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

interface AviationMenuButtonProps {
  icon: React.ReactNode
  onPress: () => void
}

function AviationMenuButton(props: AviationMenuButtonProps) {
  return (
    <TouchableOpacity style={MENU_BUTTON} {...props}>
      {props.icon}
    </TouchableOpacity>
  )
}

interface AviationMenuProps {
  onLocationPress: () => void
  onRoutePlanningPress: () => void
  onOpenMenu: () => void
  onCloseMenu: () => void
  open: boolean
}

export function AviationMenu(props: AviationMenuProps) {
  return (
    <View style={MENU}>
      {props.open ? (
        <>
          <AviationMenuButton
            icon={<MenuIcon fill="black" />}
            onPress={() => props.onCloseMenu()}
          />
          <AviationMenuButton
            icon={<SettingsIcon fill="black" />}
            onPress={() => console.log("PRESS")}
          />
          <AviationMenuButton
            icon={<RouteIcon fill="black" />}
            onPress={() => props.onRoutePlanningPress()}
          />
          <AviationMenuButton
            icon={<LocationIcon fill="black" />}
            onPress={() => {
              props.onCloseMenu()
              props.onLocationPress()
            }}
          />
        </>
      ) : (
        <AviationMenuButton icon={<MenuIcon fill="black" />} onPress={() => props.onOpenMenu()} />
      )}
    </View>
  )
}
