import ReactMapGL, { Source, Layer, Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import { getCenter } from "geolib";
import { Result } from "antd";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "../layer";
import Link from "next/link";
import styles from "../styles/Map.module.scss";

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

  const [selectedTrail, setSelectedTrail]: any = useState({});

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
      interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
      onClick={(e) =>
        e.features.length > 0 &&
        e.features[0].properties.title &&
        setSelectedTrail(e.features[0].properties)
      }
      {...viewport}
      width="100%"
      height="100%"
    >
      {/* {coordinates.map((point) => (
        <div key={point.longitude}>
          <Marker
            longitude={point.longitude}
            latitude={point.latitude}
            offsetTop={-14}
            offsetLeft={-7 / 2}
            style={{ width: "3px" }}
          >
            <p
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setSelectedTrail(point);
              }}
            >
              x
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

      {selectedTrail.lat && (
        <Popup
          onClose={() => setSelectedTrail({})}
          latitude={selectedTrail.lat}
          longitude={selectedTrail.long}
          className={styles.popup}
          tipSize={0}
          offsetTop={-5}
        >
          <Link passHref href={`/trails/${selectedTrail.id}`}>
            <h1
              style={{ color: "black", cursor: "pointer", fontWeight: "700" }}
            >
              {selectedTrail.title}
            </h1>
          </Link>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
