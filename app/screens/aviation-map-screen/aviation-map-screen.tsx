import React from "react"
import Geolocation from "@react-native-community/geolocation"
import { DocumentDirectoryPath } from "react-native-fs"

import { View, ViewStyle } from "react-native"
import MapView, { Camera, LatLng, LocalTile, Marker, Polyline } from "react-native-maps"
import { color } from "../../theme"
import { Screen, Wallpaper } from "../../components"

import Airplane from "./airplane"
import { FlightDisplay } from "./flight-display"
import { AviationMenu } from "./aviation-menu"

const FLIGHT_DISPLAY: ViewStyle = {
  position: "absolute",
  width: "100%",
  bottom: 0,
  backgroundColor: "black",
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

enum RoutePlanningMode {
  NONE,
  ADD_POINT,
  DELETE_POINT,
}

type RoutePoint = LatLng
interface MapState {
  mode: MapMode
  menuOpen: boolean
  route: RoutePoint[]
  routePlanningMode: RoutePlanningMode
}

const initialState: MapState = {
  mode: MapMode.FREE_MOVEMENT,
  menuOpen: false,
  route: [],
  routePlanningMode: RoutePlanningMode.NONE,
}

interface AddPointAction {
  type: "add_route_point"
  point: RoutePoint
}

interface DeletePointAction {
  type: "delete_route_point"
  point: number
}

interface TouchMapAction {
  type: "touch_map"
}

interface GpsLockAction {
  type: "gps_lock"
}

interface RoutePlannerAction {
  type: "route_planner"
}

type MapAction =
  | AddPointAction
  | DeletePointAction
  | TouchMapAction
  | GpsLockAction
  | RoutePlannerAction

function mapReducer(state: MapState, action: MapAction) {
  switch (action.type) {
    case "touch_map": {
      if (state.mode === MapMode.GPS_LOCK) return { ...state, mode: MapMode.FREE_MOVEMENT }
      return state
    }
    case "gps_lock": {
      return {
        ...state,
        mode: MapMode.GPS_LOCK,
      }
    }
    case "route_planner": {
      if (state.mode === MapMode.ROUTE_PLANNING) {
        return {
          ...state,
          mode: MapMode.FREE_MOVEMENT,
          menuOpen: false,
        }
      }
      return {
        ...state,
        mode: MapMode.ROUTE_PLANNING,
      }
    }
    case "add_route_point": {
      return {
        ...state,
        route: [...state.route, action.point],
      }
    }
    case "delete_route_point": {
      const route = state.route.slice(action.point, 1)
      return {
        ...state,
        route,
      }
    }
  }
}

interface Geolocation {
  latitude: number
  longitude: number
  altitude: number
  heading: number
  speed: number
}

export function AviationMapScreen() {
  const [geolocation, setGeolocation] = React.useState<Geolocation>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
  })

  const mapRef = React.useRef()
  const [cameraHeading, setCameraHeading] = React.useState<number>(0)

  const [state, dispatch] = React.useReducer(mapReducer, initialState)

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

  const routeMarkers = state.route.map((point) => (
    <Marker key={`${point.latitude}-${point.longitude}`} coordinate={point} />
  ))

  return (
    <View style={ROOT}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor="transparent">
        <MapView
          style={MAP}
          initialRegion={{
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          ref={mapRef}
          camera={state.mode === MapMode.GPS_LOCK ? camera : null}
          onLongPress={(e) => {
            // if (state.routePlanningMode === RoutePlanningMode.ADD_POINT) {
            dispatch({ type: "add_route_point", point: e.nativeEvent.coordinate })
            console.log("ADD POINT")
            // }
          }}
          onTouchEnd={() => {
            updateCameraHeading()
          }}
          onTouchCancel={() => {
            updateCameraHeading()
          }}
          onTouchStart={() => {
            dispatch({ type: "touch_map" })
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
          <Polyline
            coordinates={state.route}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              "#7F0000",
              "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
              "#B24112",
              "#E5845C",
              "#238C23",
              "#7F0000",
            ]}
            strokeWidth={6}
          />
          {routeMarkers}
        </MapView>
        <FlightDisplay
          style={FLIGHT_DISPLAY}
          heading={geolocation.heading}
          altitude={geolocation.altitude}
          eta={123124}
          menu={
            <AviationMenu
              onSettingsPress={() => {
                console.log("SETTINGS")
              }}
              onLocationPress={() => dispatch({ type: "gps_lock" })}
              onRoutePlanningPress={() => {
                dispatch({ type: "route_planner" })
              }}
            />
          }
        />
      </Screen>
    </View>
  )
}
