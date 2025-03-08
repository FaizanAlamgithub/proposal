import React, { useState, useEffect } from "react";

function ScopeOfWork({ proposal }) {
  return (
    <>
      <div className="box section-6">
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
        <div className="section-6-content">
          <div className="section-6-inner-text">
            <div className="section-6-text1">
              <p>Scope Of</p>
              <p>Work</p>
            </div>
            <div className="section-6-text2">
              <p>
                {/* Branding, Web Design & Digital Marketing – Transforming Visions
                into Success */}
                {proposal ? proposal.scopeOfWork.title : "Loading..."}
              </p>
              <div className="objective-container">
                <p>Objective</p>
                <p className="objective-content">
                  {/* To establish a strong and cohesive brand identity with a
                  strategic foundation, visually compelling assets, and a
                  well-defined messaging framework that enhances brand
                  recognition and market positioning. */}
                  {proposal ? proposal.scopeOfWork.objective : "Loading..."}
                </p>
              </div>
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

export default ScopeOfWork;
