import React from "react"
import Geolocation from "@react-native-community/geolocation"
import { DocumentDirectoryPath } from "react-native-fs"

import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MapView, { Camera, LatLng, LocalTile, Marker } from "react-native-maps"
import { color, spacing } from "../../theme"
import { Screen, Header, Wallpaper, Button } from "../../components"

import Airplane from "./airplane"

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
    const map = mapRef.current
    // @ts-ignore: Object is possibly 'null'.
    map.getCamera().then((info: Camera) => {
      setCameraHeading(info.heading)
    })
  }

  React.useEffect(() => {
    const watchId = Geolocation.watchPosition((position) => {
      setCurrentPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })

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
            updateCameraHeading()
          }}
        >
          <LocalTile
            pathTemplate={`${DocumentDirectoryPath}/openflightmaps/{z}/{x}/{y}.png`}
            tileSize={256}
          />
          <Marker coordinate={currentPosition} flat anchor={{ x: 0.5, y: 0.5 }}>
            <View style={{ transform: [{ rotate: `${currentHeading - cameraHeading}deg` }] }}>
              <Airplane fill="black" />
            </View>
          </Marker>
        </MapView>
      </Screen>
    </View>
  )
})
