import React, { useState, useEffect } from "react";

function TableOfContent({ proposal }) {
  return (
    <>
      <div className="box section-2">
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
        <div className="section-2-content">
          <div className="section-2-inner-text">
            <div className="section-2-text1">
              <p>Table Of Content</p>
            </div>
            <div className="section-2-text2">
              <ul>
                <li>Introduction</li>
                <li>Scope Of Work</li>
                <li>Timeline & Deliverables</li>
                <li>Proposed Investment</li>
                <li>Payment Terms</li>
                <li>Next Steps</li>
              </ul>
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

export default TableOfContent;
