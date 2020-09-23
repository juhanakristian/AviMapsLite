import React from "react"
import Geolocation from "@react-native-community/geolocation"

import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MapView, { Camera, Coordinate, LatLng, LocalTile, Marker } from "react-native-maps"
import { color, spacing } from "../../theme"
import { Screen, Header, Wallpaper } from "../../components"

import Airplane from "./airplane"

import { DocumentDirectoryPath } from "react-native-fs"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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

  const [currentPosition, setCurrentPosition] = React.useState<LatLng>({
    latitude: 64.0797048,
    longitude: 24.5472132,
  })

  const [currentHeading, setCurrentHeading] = React.useState<number>(0)

  React.useEffect(() => {
    const watchId = Geolocation.watchPosition((position) => {
      setCurrentPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })

      console.log(`Heading ${position.coords.heading}`)
      setCurrentHeading(position.coords.heading)
    })

    return () => Geolocation.clearWatch(watchId)
  }, [])

  const camera: Camera = {
    center: {
      ...currentPosition,
    },
    pitch: 0,
    heading: 0,
    altitude: 10000,
    zoom: 15,
  }

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
          camera={camera}
          rotateEnabled={false}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          <Marker coordinate={currentPosition} flat={false} rotation={currentHeading}>
            <View style={{ transform: [{ rotate: `${currentHeading}deg` }] }}>
              <Airplane fill="black" />
            </View>
          </Marker>
        </MapView>
      </Screen>
    </View>
  )
})
