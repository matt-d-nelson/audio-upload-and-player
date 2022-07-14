import { Typography } from "@material-ui/core";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useCallback, useRef } from "react";
import libraries from "./Libraries";

// map container
// define with props in future / move into Map func
const mapContainerStyle = {
  width: "400px",
  height: "300px",
};
// lat lng where map is centered
const center = {
  // latitude and longitude
  lat: 45.56477,
  lng: -94.317886,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function Map() {
  // load the g map
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // useRef for map to avoid rerenders
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // ensure map is loaded without error before returning
  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map";

  return (
    <div>
      <Typography>🍁</Typography>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
      ></GoogleMap>
    </div>
  );
}

export default Map;
