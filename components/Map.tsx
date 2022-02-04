import ReactMapGL, { Source, Layer } from "react-map-gl";
import { useState, useEffect } from "react";
import { getCenter } from "geolib";
import { Result } from "antd";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "../layer";

const Map = ({ trails, geojson }) => {
  const coordinates = trails.map((trail) => ({
    longitude: trail.geojson.coordinates[0],
    latitude: trail.geojson.coordinates[1],
  }));

  // console.log(geojson);

  // const geojsonData = trails.map((trail) => ({
  //   type: "FeatureCollection",
  //   features: [{ type: "Feature", properties: {}, geometry: trail.geojson }],
  // }));

  //finds the center coordinates of all trails
  const center = getCenter(coordinates);

  // console.log(geojsonData);

  const [viewport, setViewport] = useState({
    latitude: center && center.latitude,
    longitude: center && center.longitude,
    zoom: 6,
  });

  // const [selectedTrail, setSelectedTrail]: any = useState({});

  // console.log(selectedTrail);

  // const layerStyle = {
  //   id: "point",
  //   type: "circle",
  //   paint: {
  //     "circle-radius": 10,
  //     "circle-color": "#007cbf",
  //   },
  // };

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jeremiahcanlas/ckz3e4kw4002214p35infkp6f"
      mapboxApiAccessToken={process.env.mapbox_token}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      {...viewport}
      width="100%"
      height="100%"
    >
      <Source
        id="trails"
        type="geojson"
        data={geojson}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>

      {/* {coordinates.map((point) => (
        <div key={point.longitude}>
          <Marker
            longitude={point.longitude}
            latitude={point.latitude}
            offsetTop={-18}
            offsetLeft={-7 / 2}
          >
            <p
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault()
                setSelectedTrail(point);
              }}
            >
              📍
            </p>
          </Marker>

          {selectedTrail.latitude === point.latitude && (
            <Popup
              onClose={() => setSelectedTrail({})}
              latitude={point.latitude}
              longitude={point.longitude}
            >
              <p style={{ color: "black" }}>{point.latitude}</p>
            </Popup>
          )}
        </div>
      ))} */}
    </ReactMapGL>
  );
};

export default Map;
