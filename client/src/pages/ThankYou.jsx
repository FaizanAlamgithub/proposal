import React, { useState, useEffect } from "react";

function ThankYou({ proposal }) {
  return (
    <>
      <div className="box section-12">
        {/* <div className="header">
          <div className="header-text-1">
            <p>Proposal for</p>
            <p className="company-name">
              {proposal ? proposal.companyName : "Loading..."}
            </p>
          </div>
          <div className="header-text-2">
            <p>Powered by Humans, Fuelled by Creativity</p>
          </div>
        </div> */}
        <div className="section-12-content">
          <div className="thankyou-logo">
            <img src="../images/logo2.svg" alt="" />
          </div>
          <div className="thankyou-container">
            <div className="explore">
              <p className="scanner">Scan to Explore More</p>
              <img src="../images/thankyou.svg" alt="" />
              <p className="phone-no">Ph: +91 8069578407</p>
              <a
                className="jca-link"
                href="https://www.jordiescreativeagency.com"
              >
                www.jordiescreativeagency.com
              </a>
              <p className="jca-address">
                #198, CMH Road, 2nd Floor, Indiranagar, Bangalore, Karnataka,
                India 560038
              </p>
            </div>
            <div className="thankyou">
              <p>Thank You</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThankYou;
