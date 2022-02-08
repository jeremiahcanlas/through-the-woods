import ReactMapGL, { Source, Layer, Marker, Popup } from "react-map-gl";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Stack,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getCenter } from "geolib";
import { Result } from "antd";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "../layer";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Map.module.scss";

const Map = ({ trails, geojson }) => {
  const coordinates = trails.map((trail) => ({
    longitude: trail.geojson.coordinates[0],
    latitude: trail.geojson.coordinates[1],
  }));

  //finds the center coordinates of all trails
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center && center.latitude,
    longitude: center && center.longitude,
    zoom: 6,
  });

  const [selectedTrail, setSelectedTrail]: any = useState({});

  // console.log(selectedTrail);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jeremiahcanlas/ckz3e4kw4002214p35infkp6f"
      mapboxApiAccessToken={process.env.mapbox_token}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
      onMouseEnter={(e) =>
        e.features.length > 0 &&
        e.features[0].properties.title &&
        setSelectedTrail(e.features[0].properties)
      }
      onClick={(e) =>
        e.features.length > 0 &&
        e.features[0].properties.title &&
        setSelectedTrail(e.features[0].properties)
      }
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

      {selectedTrail.lat && (
        <Link passHref href={`/trails/${selectedTrail.id}`}>
          <Box
            className={styles.popup}
            cursor={"pointer"}
            onMouseLeave={() => setSelectedTrail({})}
            // width={["120px", "150px", "200px"]}
          >
            <Popup
              latitude={selectedTrail.lat}
              longitude={selectedTrail.long}
              tipSize={0}
              offsetTop={-5}
              className={styles.popup}
              closeOnClick={false}
              closeButton={false}
            >
              <Flex className={styles.popupContent} p="0">
                <Image
                  height={"100%"}
                  width={"100%"}
                  alt="thumbnail"
                  src={selectedTrail.thumbnail}
                />

                <VStack margin={"0.5em"} textAlign={["left", "left", "center"]}>
                  <Text as={"h1"}>{selectedTrail.title}</Text>
                  <HStack>
                    <Text>2.4 km</Text>
                    <Text>531 m</Text>
                  </HStack>
                  <Text>est. 2.4 hours</Text>
                </VStack>
              </Flex>
            </Popup>
          </Box>
        </Link>
      )}
    </ReactMapGL>
  );
};

export default Map;
