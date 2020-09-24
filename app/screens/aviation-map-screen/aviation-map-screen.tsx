import React from "react"
import Geolocation from "@react-native-community/geolocation"

import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, Image, Animated } from "react-native"
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

  const mapRef = React.useRef()
  const [currentHeading, setCurrentHeading] = React.useState<number>(0)
  const [cameraHeading, setCameraHeading] = React.useState<number>(0)

  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0)

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

  console.log(`User heading ${currentHeading} camera heading ${cameraHeading}`)
  console.log(`${currentHeading + cameraHeading}`)

  const markerHeading = cameraHeading + currentHeading
  const adjustedMarkerHeading = markerHeading > 360 ? markerHeading - 360 : markerHeading
  console.log(adjustedMarkerHeading)

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
          // camera={camera}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          ref={mapRef}
          onRegionChange={async () => {
            // @ts-ignore: Object is possibly 'null'.
            mapRef.current.getCamera().then((info) => {
              setCameraHeading(info.heading)
            })
          }}
        >
          <Marker coordinate={currentPosition} flat={true} rotation={currentHeading}>
            {/* <Animated.Image source="https://maxcdn.icons8.com/Share/icon/Transport/airplane_takeoff1600.png"></Animated.Image> */}
            <View style={{ transform: [{ rotate: `${adjustedMarkerHeading}deg` }] }}>
              <Airplane fill="black" />
            </View>
          </Marker>
        </MapView>
      </Screen>
    </View>
  )
})
