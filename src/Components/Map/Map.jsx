import { Typography } from "@material-ui/core";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { Data, GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { useCallback, useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
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

function Map(props) {
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

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  });

  const setMarkerLocation = (event) => {
    console.log(props.markers);
    props.setMarkers([{ lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  // ensure map is loaded without error before returning
  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map";

  return (
    <div>
      <Typography>🍁</Typography>
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={setMarkerLocation}
      >
        {props.markers.map((marker) => (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            key={marker.lat}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

function Search({ panTo }) {
  // deconstructed object returned from usePlacesAutocoplete
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 45.56477, lng: () => -94.317886 },
      radius: 200 * 1000,
    },
  });

  const panToAddress = async (address) => {
    setValue(address, false);
    clearSuggestions();
    console.log("address");
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      console.log(lat, lng);
    } catch (err) {
      console.log(err);
      alert("error panning to location");
    }
  };

  const setAutocompleteVal = (event) => {
    setValue(event.target.value);
    console.log(data);
  };

  return (
    <div style={{ zIndex: 10 }}>
      <Combobox onSelect={panToAddress}>
        <ComboboxInput
          value={value}
          onChange={setAutocompleteVal}
          disabled={!ready}
          placeholder="search address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Map;
