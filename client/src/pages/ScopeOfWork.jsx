import React, { useState, useEffect } from "react";

function ScopeOfWork({ proposal }) {
  return (
    <>
      <div className="box section-6">
        <div className="header">
          <div className="header-text">
            <p>
              Proposal for
              <span className="company-name">
                {proposal ? proposal.companyName : "Loading..."}
              </span>
            </p>
          </div>
          <div className="header-text-2">
            {/* <p>Powered by Humans, Fuelled by Creativity</p> */}
            <img src="../images/logo.svg" alt="" />
          </div>
        </div>
        <div className="section-6-content">
          <div className="section-6-inner-text">
            <div className="section-6-text1">
              <p>Scope Of</p>
              <p>Work</p>
            </div>
            <div className="section-6-text2">
              <p>{proposal ? proposal.scopeOfWork.title : "Loading..."}</p>
              <div className="objective-container">
                <p>Objective</p>
                <p className="objective-content">
                  {proposal ? proposal.scopeOfWork.objective : "Loading..."}
                </p>
              </div>
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

export default ScopeOfWork;
