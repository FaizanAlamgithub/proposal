import React, { useState, useEffect } from "react";

function WhyWorkWithUs({ proposal }) {
  return (
    <>
      <div className="box section-5">
        <div className="header">
          <div className="header-text-1">
            <p>Proposal for</p>

            <p className="company-name">
              {proposal ? proposal.companyName : "Loading..."}
            </p>
          </div>
          <div className="header-text-2">
            <p>Powered by Humans, Fuelled by Creativity</p>
          </div>
        </div>
        <div className="section-5-content">
          <div className="section-5-inner-text">
            <div className="section-5-text1">
              <p>Why Work</p>
              <p>With Us?</p>
            </div>
            <div className="section-5-text2">
              <ul>
                <li>
                  <span>A Strategic Extension of Your Team:</span>
                  <br />
                  We collaborate, innovate, and problem-solve as if we were an
                  in-house team.
                </li>
                <li>
                  <span>Results Driven Creativity:</span>
                  <br />
                  Every design, campaign, and strategy is built to drive
                  measurable growth.
                </li>
                <li>
                  <span>Industry Expertise:</span>
                  <br />
                  We have worked with businesses across various industries,
                  delivering impactful tailored solutions.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom-text">
          <p>Jordie’s Creative Agency Pvt Ltd</p>
          <a href="https://www.jordiescreativeagency.com">
            www.jordiescreativeagency.com
          </a>
          <img src="../images/logo.svg" alt="" />
        </div>
      </div>
    </>
  );
}

export default WhyWorkWithUs;
