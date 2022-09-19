import {
    ComposableMap,
    Geographies,
    Geography,
    Annotation,
    ZoomableGroup
  } from "react-simple-maps";

 export const MapChart = () => {
    return (
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-10.0, -52.0, 0],
          center: [-5, -3],
          scale: 1100
        }}
      >
        <Geographies
          geography="/features.json"
          fill="#000724"
          stroke="#FFFFFF"
          strokeWidth={0.5}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        <Annotation
          subject={[21.1655, 42.6629]}
          dx={-20}
          dy={-30}
          connectorProps={{
            stroke: "#FFFFFF",
            strokeWidth: 2.5,
            strokeLinecap: "round"
          }}
        >
          <text x="-1" textAnchor="end" alignmentBaseline="middle" fill='#FFFFFF'>
            {"Pristina"}
          </text>
        </Annotation>
      </ComposableMap>
    );
  };
  