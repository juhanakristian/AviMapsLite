import React from "react"

import { observer } from "mobx-react-lite"
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
}

export const AviationMenu = observer((props: AviationMenuProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <View style={MENU}>
      {open ? (
        <>
          <AviationMenuButton icon={<MenuIcon fill="black" />} onPress={() => setOpen(false)} />
          <AviationMenuButton
            icon={<SettingsIcon fill="black" />}
            onPress={() => console.log("PRESS")}
          />
          <AviationMenuButton
            icon={<RouteIcon fill="black" />}
            onPress={() => console.log("PRESS")}
          />
          <AviationMenuButton
            icon={<LocationIcon fill="black" />}
            onPress={() => {
              setOpen(false)
              props.onLocationPress()
            }}
          />
        </>
      ) : (
        <AviationMenuButton icon={<MenuIcon fill="black" />} onPress={() => setOpen(true)} />
      )}
    </View>
  )
})
