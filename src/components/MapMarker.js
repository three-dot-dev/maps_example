import React from "react";

import "./marker.css";

export function MapMarker({ id }) {
  return (
    <>
      <div className="pin bounce " />
      <div className="pulse" />
      <p>{id}</p>
    </>
  );
}
