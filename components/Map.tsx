import ReactMapGL, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";
import { getCenter } from "geolib";

const Map = ({ trails }) => {
  const coordinates = trails.map((trail) => ({
    longitude: trail.geojson.coordinates[0],
    latitude: trail.geojson.coordinates[1],
  }));

  //finds the center coordinates of all trails
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center && center.latitude,
    longitude: center && center.longitude,
    zoom: 3,
  });

  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jeremiahcanlas/ckz3e4kw4002214p35infkp6f"
      mapboxApiAccessToken={process.env.mapbox_token}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      {...viewport}
      width="100%"
      height="100%"
    >
      {coordinates.map((point) => (
        <div key={point.longitude}>
          <Marker
            longitude={point.longitude}
            latitude={point.latitude}
            offsetTop={-18}
            offsetLeft={-7 / 2}
          >
            <p>📍</p>
          </Marker>
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
