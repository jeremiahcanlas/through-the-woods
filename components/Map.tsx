import ReactMapGL, { Source, Layer, Popup } from "react-map-gl";
import { Box, Flex, Text, Stack, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { getCenter } from "geolib";

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

  const estimatedTime =
    selectedTrail.trailLength && JSON.parse(selectedTrail.trailLength);

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
          >
            <Popup
              latitude={selectedTrail.lat}
              longitude={selectedTrail.long}
              tipSize={0}
              offsetTop={-10}
              closeOnClick={false}
              closeButton={false}
            >
              <Flex className={styles.popupContent} p="0" height={"12vh"}>
                {selectedTrail.thumbnail && (
                  <Image
                    height={"100%"}
                    width={"100%"}
                    alt="thumbnail"
                    src={selectedTrail.thumbnail}
                  />
                )}

                <Stack margin={"0.5em"} mx="1em" spacing="0.2em">
                  <Text as={"h1"}>{selectedTrail.title}</Text>
                  <Divider
                    backgroundColor={"#40916c"}
                    orientation="horizontal"
                    my="1em"
                  />
                  <Text>Length: {selectedTrail.distance}km</Text>
                  <Text>Elevation: {selectedTrail.elevation}m</Text>
                  <Text>
                    Est {estimatedTime.days >= 1 && `${estimatedTime.days}d`}
                    {estimatedTime.hours >= 1 && `${estimatedTime.hours}h`}
                    {estimatedTime.minutes >= 1 && `${estimatedTime.minutes}m`}
                  </Text>
                </Stack>
              </Flex>
            </Popup>
          </Box>
        </Link>
      )}
    </ReactMapGL>
  );
};

export default Map;
