import React from "react"
import Geolocation from "@react-native-community/geolocation"
import { DocumentDirectoryPath } from "react-native-fs"

import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import MapView, { Camera, LocalTile, Marker } from "react-native-maps"
import { color } from "../../theme"
import { Screen, Wallpaper } from "../../components"

import Airplane from "./airplane"
import { FlightDisplay } from "./flight-display"
import { AviationMenu } from "./aviation-menu"

const FLIGHT_DISPLAY: ViewStyle = {
  position: "absolute",
  height: 100,
  width: "100%",
  bottom: 0,
}

const ROUTE_PLANNING_INDICATOR: ViewStyle = {
  position: "absolute",
  bottom: 0,
  top: 40,
  left: 0,
  right: 0,
  marginBottom: 100,
  backgroundColor: "transparent",
  borderColor: "lightgreen",
  borderWidth: 10,
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

enum MapMode {
  GPS_LOCK,
  FREE_MOVEMENT,
  ROUTE_PLANNING,
}

interface Geolocation {
  latitude: number
  longitude: number
  altitude: number
  heading: number
  speed: number
}

export const AviationMapScreen = observer(function AviationMapScreen() {
  const [geolocation, setGeolocation] = React.useState<Geolocation>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
  })

  const mapRef = React.useRef()
  const [cameraHeading, setCameraHeading] = React.useState<number>(0)

  const [menuOpen, setMenuOpen] = React.useState(false)
  const [mode, setMode] = React.useState(MapMode.FREE_MOVEMENT)

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
          camera={mode === MapMode.GPS_LOCK ? camera : null}
          onTouchEnd={() => {
            updateCameraHeading()
          }}
          onTouchCancel={() => {
            updateCameraHeading()
          }}
          onTouchStart={() => {
            if (mode === MapMode.GPS_LOCK) setMode(MapMode.FREE_MOVEMENT)

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
      <AviationMenu
        open={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenMenu={() => setMenuOpen(true)}
        onLocationPress={() => setMode(MapMode.GPS_LOCK)}
        onRoutePlanningPress={() => {
          if (mode === MapMode.ROUTE_PLANNING) {
            setMode(MapMode.FREE_MOVEMENT)
            setMenuOpen(false)
          } else {
            setMode(MapMode.ROUTE_PLANNING)
          }
        }}
      />
      {mode === MapMode.ROUTE_PLANNING && (
        <View pointerEvents="none" style={ROUTE_PLANNING_INDICATOR}></View>
      )}
    </View>
  )
})
