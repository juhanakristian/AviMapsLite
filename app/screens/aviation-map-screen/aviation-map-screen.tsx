import React from "react"
import Geolocation from "@react-native-community/geolocation"

import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, Image, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MapView, { Camera, Coordinate, LatLng, LocalTile, Marker } from "react-native-maps"
import { color, spacing } from "../../theme"
import { Screen, Header, Wallpaper, Button, Text } from "../../components"

import Airplane from "./airplane"

const AirplaneImage = require("./airplane.png")

const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}
const BOLD: TextStyle = { fontWeight: "bold" }
const FOLLOW: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}

const FOLLOW_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

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
  const [follow, setFollow] = React.useState(false)

  function updateCameraHeading() {
    console.log("updateCameraHeading")
    const map = mapRef.current
    // @ts-ignore: Object is possibly 'null'.
    map.getCamera().then((info) => {
      setCameraHeading(info.heading)
    })
  }

  React.useEffect(() => {
    const watchId = Geolocation.watchPosition((position) => {
      setCurrentPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })

      console.log(`Heading ${position.coords.heading}`)
      setCurrentHeading(position.coords.heading)
      updateCameraHeading()
    })

    return () => Geolocation.clearWatch(watchId)
  }, [])

  const camera: Camera = {
    center: {
      ...currentPosition,
    },
    altitude: 10000,
    pitch: 0,
    zoom: 10,
    heading: currentHeading,
  }

  function handlePressFollow() {
    console.log("FOLLOW")
    setFollow(!follow)
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
        <Button
          style={FOLLOW}
          textStyle={FOLLOW_TEXT}
          tx="mapScreen.follow"
          onPress={handlePressFollow}
        />
        <MapView
          style={MAP}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          ref={mapRef}
          camera={follow ? camera : null}
          onTouchEnd={() => {
            updateCameraHeading()
          }}
          onTouchCancel={() => {
            updateCameraHeading()
          }}
          onTouchStart={() => {
            setFollow(false)
            updateCameraHeading()
          }}
          onTouchMove={() => {
            const map = mapRef.current
            // @ts-ignore: Object is possibly 'null'.
            map.getCamera().then((info) => {
              setCameraHeading(info.heading)
            })
          }}
        >
          <Marker coordinate={currentPosition} flat anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges>
            {/* <View> */}
            <View style={{ transform: [{ rotate: `${currentHeading - cameraHeading}deg` }] }}>
              <Airplane fill="black" />
            </View>
            {/* <Animated.Image
              source={AirplaneImage}
              style={{ width: 50, height: 50, transform: [{ rotate: `${currentHeading}deg` }] }}
            ></Animated.Image> */}
          </Marker>
        </MapView>
      </Screen>
    </View>
  )
})
