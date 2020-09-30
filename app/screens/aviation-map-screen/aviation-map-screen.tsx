import React from "react"
import Geolocation from "@react-native-community/geolocation"
import { DocumentDirectoryPath } from "react-native-fs"

import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MapView, { Camera, LocalTile, Marker } from "react-native-maps"
import { color, spacing } from "../../theme"
import { Screen, Header, Wallpaper, Button } from "../../components"

import Airplane from "./airplane"
import { FlightDisplay } from "./flight-display"

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

const FLIGHT_DISPLAY: ViewStyle = {
  position: "absolute",
  height: 100,
  width: "100%",
  bottom: 0,
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

interface Geolocation {
  latitude: number
  longitude: number
  altitude: number
  heading: number
  speed: number
}

export const AviationMapScreen = observer(function AviationMapScreen() {
  const navigation = useNavigation()

  const [geolocation, setGeolocation] = React.useState<Geolocation>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
  })

  const mapRef = React.useRef()
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
      setGeolocation(position.coords)
      updateCameraHeading()
    })

    return () => Geolocation.clearWatch(watchId)
  }, [])

  const latlng = {
    latitude: geolocation.latitude,
    longitude: geolocation.longitude,
  }

  const camera: Camera = {
    center: {
      ...latlng,
    },
    altitude: 10000,
    pitch: 0,
    zoom: 10,
    heading: geolocation.heading,
  }

  return (
    <View style={ROOT}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor="transparent">
        <MapView
          style={MAP}
          initialRegion={{
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
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
          <Marker coordinate={latlng} flat anchor={{ x: 0.5, y: 0.5 }}>
            <View
              style={{
                transform: [{ rotate: `${geolocation.heading - cameraHeading}deg` }],
              }}
            >
              <Airplane fill="black" />
            </View>
          </Marker>
        </MapView>
        <FlightDisplay
          style={FLIGHT_DISPLAY}
          heading={geolocation.heading}
          altitude={geolocation.altitude}
          eta={123124}
        />
      </Screen>
    </View>
  )
})
