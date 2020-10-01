import React from "react"

import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import Airplane from "./airplane"

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
  return <TouchableOpacity style={MENU_BUTTON}>{props.icon}</TouchableOpacity>
}

interface AviationMenuProps {}

export const AviationMenu = observer((props: AviationMenuProps) => {
  return (
    <View style={MENU}>
      <AviationMenuButton
        icon={<Airplane fill="lightgrey" />}
        onPress={() => console.log("PRESS")}
      />
      <AviationMenuButton
        icon={<Airplane fill="lightgrey" />}
        onPress={() => console.log("PRESS")}
      />
      <AviationMenuButton
        icon={<Airplane fill="lightgrey" />}
        onPress={() => console.log("PRESS")}
      />
    </View>
  )
})
