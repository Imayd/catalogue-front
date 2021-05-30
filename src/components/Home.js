import React from "react";
import NavBar from "./layout/NavBar";
import SideBar from "./layout/SideBar";

function Home(props) {
  return (
    <>
      <div className="croireEnVousHome">
        <NavBar />
        <SideBar />
        <div className="logoHome">
          {" "}
          <img
            src="/img/logoHomePage.png"
            alt="logoHome"
            className="logoHome"
          ></img>
        </div>
        <div>
          <img
            src="/img/croireEnVous.gif"
            className="croireEnVous"
            alt="croireEnVous"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
