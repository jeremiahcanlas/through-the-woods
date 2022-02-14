export const clusterLayer: any = {
  id: "clusters",
  type: "circle",
  source: "trails",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#40916c",
      100,
      "#40916c",
      750,
      "#40916c",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: any = {
  id: "cluster-count",
  type: "symbol",
  source: "trails",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    // "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    // "text-size": 12,
  },
};

export const unclusteredPointLayer: any = {
  id: "unclustered-point",
  type: "circle",
  source: "trails",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#40916c",
    "circle-radius": 6,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};
