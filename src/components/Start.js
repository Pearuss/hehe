/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Start.css";

function Start() {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/login")} className="absolute right-[40px] top-[30px] z-50 px-6 py-3 bg-[#5e30d9] opacity-60 rounded-md text-[#ff846e] font-[500] text-xl tracking-wider ">Login Now</button>
      <div class="landscape">
        <div class="mountain"></div>
        <div class="mountain mountain-2"></div>
        <div class="mountain mountain-3"></div>
        <div class="sun-container sun-container-1"></div>
        <div class="sun-container">
          <div class="sun"></div>
        </div>
        <div class="cloud"></div>
        <div class="cloud cloud-1"></div>
        <div class="sun-container sun-container-reflection">
          <div class="sun"></div>
        </div>
        <div class="light"></div>
        <div class="light light-1"></div>
        <div class="light light-2"></div>
        <div class="light light-3"></div>
        <div class="light light-4"></div>
        <div class="light light-5"></div>
        <div class="light light-6"></div>
        <div class="light light-7"></div>
        <div class="water"></div>
        <div class="splash"></div>
        <div class="splash delay-1"></div>
        <div class="splash delay-2"></div>
        <div class="splash splash-4 delay-2"></div>
        <div class="splash splash-4 delay-3"></div>
        <div class="splash splash-4 delay-4"></div>
        <div class="splash splash-stone delay-3"></div>
        <div class="splash splash-stone splash-4"></div>
        <div class="splash splash-stone splash-5"></div>
        <div class="lotus lotus-1"></div>
        <div class="lotus lotus-2"></div>
        <div class="lotus lotus-3"></div>
        <div class="trash-container"></div>
        <div class="front">
          <div class="stone"></div>
          <div class="grass"></div>
          <div class="grass grass-1"></div>
          <div class="grass grass-2"></div>
          <div class="reed"></div>
          <div class="reed reed-1"></div>
        </div>
      </div>
      <div class="logo"></div>
      <h1 class="money"></h1>
    </>
  );
}

export default Start;
