import React from "react";
import hero from "../assets/hero.png"

const Hero = ({ title }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Healthcare Management System is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            ZeeCare, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
        </div>
        <div className="banner">
          <img src={hero} alt="hero" className="animated-image" />
          <span>
            <img src={hero} alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
