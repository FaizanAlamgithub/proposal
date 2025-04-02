import React, { useState, useEffect } from "react";

function HelloClient({ proposal }) {
  return (
    <>
      <div className="box section-3">
        <div className="header">
          <div className="header-text">
            <p className="text-center">
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
        <div className="section-3-content">
          <div className="section-3-inner-text">
            <div className="section-3-text1">
              <p>
                Hello
                <span className="client-name">
                  {proposal ? proposal.clientName : "Loading..."},
                </span>
              </p>
            </div>
            <div className="section-3-text2">
              <p>
                Thank you for considering Jordie’s Creative Agency as your
                digital partner. We understand that choosing the right team is a
                crucial decision, and we are thrilled to present this proposal
                to you. Our mission is simple: to transform your vision into
                reality with a dedicated team that seamlessly integrates with
                your business.
                <br />
                <br />
                Inside, you'll find a clear, strategic plan outlining how we
                will achieve your goals - powered by creativity, expertise, and
                data-driven insights. We look forward to collaborating with you
                and making your brand the trendsetter, outshining the
                competition with style and innovation.
              </p>
              <br />
              <br />
              <div className="best-regards">
                <p className="best-regards-text">Best Regards,</p>
                <p>Team JCA</p>
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

export default HelloClient;
