import React from "react";
import ServicesTemplate from "./layout/ServicesTemplate";
import TypeService from "./TypeService";

export default function Services(props) {
  return (
    <div>
      <ServicesTemplate />
      <br></br>
      <div className="data">
        <TypeService />
      </div>
    </div>
  );
}
