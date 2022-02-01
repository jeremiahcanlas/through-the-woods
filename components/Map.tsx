import ReactMapGL from "react-map-gl";
import { useState, useEffect } from "react";

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jeremiahcanlas/ckz3e4kw4002214p35infkp6f"
      mapboxApiAccessToken={process.env.mapbox_token}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      {...viewport}
      width="100%"
      height="100%"
    ></ReactMapGL>
  );
};

export default Map;
