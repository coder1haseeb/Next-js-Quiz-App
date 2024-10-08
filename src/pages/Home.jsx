// Create a home page which have a background image from assets folder in tailwind css
// and a button which will redirect to the /about page.

import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/banner-bg.png";
import Navbar from "../Components/Navbar";
import Login from "../Components/Login";

const Home = () => {
  return (
    <div
      className="bg-cover w-full bg-center !h-[100vh]"
      style={{
        backgroundImage: `url(${bg})`,
        height: "100vh",
      }}
    >
      <Navbar />

      <Login />
    </div>
  );
};

export default Home;
