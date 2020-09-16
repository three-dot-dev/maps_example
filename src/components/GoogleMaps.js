import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import GoogleMapReact from "google-map-react";
import { MapMarker } from "./MapMarker";

const FETCH_STATUS = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
};

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTc4ZTUyMGJlMTUzMDliNzA3ZDM4NSIsImVtYWlsIjoicm9ubnlAZW1haWwuY29tIiwicm9sZSI6Ik9QRVJBVE9SIiwiaWF0IjoxNTk5NTczOTM2LCJleHAiOjE2MDIxNjU5MzZ9.fRjydc68niDOy6r7BTnxjyivSpQlpWGCvbkKl5nH2X8";

const useListPengaduan = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.LOADING);

  const fetch = useCallback(async () => {
    setStatus(FETCH_STATUS.LOADING);
    axios
      .get("https://ancient-spire-87228.herokuapp.com/api/operator/pengaduan", {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        setData(res.data);
        setStatus(FETCH_STATUS.LOADED);
      })
      .catch(() => {
        setStatus(FETCH_STATUS.ERROR);
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    status,
    fetch,
  };
};

export function Maps() {
  const { data, status } = useListPengaduan();

  if (status === FETCH_STATUS.ERROR) {
    return <p>Error....</p>;
  }

  if (status === FETCH_STATUS.LOADING) {
    return <p>Loading...</p>;
  }

  if (status !== FETCH_STATUS.LOADED) {
    return <p>s</p>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) =>
          // eslint-disable-next-line no-undef
          new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.3,
            map,
            center: {
              lat: data[0].location.coordinates[1],
              lng: data[0].location.coordinates[0],
            },
            radius: 1300,
          })
        }
        bootstrapURLKeys={{
          key: "AIzaSyCXH_d-DbxpEVyfunY8g8f9pVhC6dEX8bA",
          libraries: ["visualization"],
        }}
        defaultCenter={{
          lat: -6.21159,
          lng: 106.846711,
        }}
        defaultZoom={11.7}
      >
        {data.map((p) => (
          <MapMarker
            key={p._id}
            lat={p.location.coordinates[1]}
            lng={p.location.coordinates[0]}
            id={p.keterangan}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
