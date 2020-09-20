import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MapView, { LocalTile } from "react-native-maps"
import { color, spacing } from "../../theme"
import { Screen, Header, Text, Wallpaper } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  flex: 1,
}

const MAP: ViewStyle = {
  width: "100%",
  height: "100%",
}

const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

export const AviationMapScreen = observer(function AviationMapScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={ROOT}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor="transparent">
        <Header
          headerTx="mapScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <MapView
          style={MAP}
          region={{
            latitude: 64.0797048,
            longitude: 24.5472132,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <LocalTile pathTemplate="./openflightmaps/{z}/{x}/{y}.png" tileSize={256} />
        </MapView>
      </Screen>
    </View>
  )
})
