import React from "react"

import { ViewStyle, Pressable } from "react-native"

const MENU_BUTTON: ViewStyle = {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  backgroundColor: "black",
  alignItems: "center",
  flexGrow: 1,
  flexBasis: "30%",
}

interface MenuButtonProps {
  icon: React.ReactNode
  onPress: () => void
}

export function MenuButton(props: MenuButtonProps) {
  return (
    <Pressable style={MENU_BUTTON} {...props}>
      {props.icon}
    </Pressable>
  )
}
