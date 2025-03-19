import React, { useState, useEffect } from "react";

function Introduction({ proposal }) {
  return (
    <>
      <div className="box section-4">
        <div className="header">
          <div className="header-text-1">
            <p>Proposal for</p>

            <p className="company-name">
              {proposal ? proposal.companyName : "Loading..."}
            </p>
          </div>
          <div className="header-text-2">
            {/* <p>Powered by Humans, Fuelled by Creativity</p> */}
            <img src="../images/logo.svg" alt="" />
          </div>
        </div>
        <div className="section-4-content">
          <div className="section-4-inner-text">
            <div className="section-4-text1">
              <p>Introduction</p>
            </div>
            <div className="section-4-text2">
              <p>
                At Jordie’s Creative Agency, you are not just hiring a service
                provider. You are gaining a dedicated team that is fully
                invested in your success. We embed ourselves into your vision,
                working side by side to create impactful digital experiences
                that drive real results.
                <br />
                <br />
                Unlike traditional agencies, we do not just execute tasks. We
                strategize, innovate, and optimize at every step. Whether it is
                branding, digital marketing, or web development, we bring a
                holistic approach that ensures everything aligns with your
                business objectives.
              </p>
              <br />
              <br />
              <span>
                Our mission is clear: to elevate your brand, expand your reach,
                and maximize your impact.
              </span>
            </div>
          </div>
        </div>
        {/* <div className="bottom-text">
          <p>Jordie’s Creative Agency Pvt Ltd</p>
          <a href="https://www.jordiescreativeagency.com">
            www.jordiescreativeagency.com
          </a>
          <img src="../images/logo.svg" alt="" />
        </div> */}
      </div>
    </>
  );
}

export default Introduction;
