import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function NextSteps({ proposal }) {
  const [isAccepted, setIsAccepted] = useState(proposal?.isAccepted || false);

  // const handleAcceptProposal = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token") || "";
  //     const response = await fetch(
  //       `http://localhost:5000/api/proposals/accept/${id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           Authorization: token,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to accept proposal");
  //     }

  //     setIsAccepted(true); // Update state locally
  //     toast.success("Proposal accepted successfully");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  return (
    <div className="box section-11">
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
      <div className="section-11-content">
        <div className="section-11-inner-text">
          <div className="section-11-text1">
            <p>Next</p>
            <p>Steps</p>
            <div className="section-11-below-text">
              <p>
                Send us your acceptance by simply clicking the
                <span>"Accept Proposal"</span> button below. Once accepted, we
                will proceed with the contract and initial invoice.
              </p>

              {/* {isAccepted ? (
                <button
                  className="section-11-below-text-btn bg-white text-gray-500"
                  disabled
                >
                  Accepted
                </button>
              ) : (
                <button
                  onClick={() => handleAcceptProposal(proposal?._id)}
                  className="section-11-below-text-btn bg-[#7f5cff] text-white"
                  disabled={!proposal}
                >
                  Accept Proposal
                </button>
              )} */}
              <button className="section-11-below-text-btn bg-[#7f5cff] text-white">
                Accept Proposal
              </button>
            </div>
          </div>
          <div className="section-11-text2">
            <p>Step 1: Proposal Approval & Initial Formalities</p>
            <p className="section-11-objective-content">
              Upon approval of the proposal, we will proceed with the contract
              and initial invoice for formal agreement. Once the contract is
              signed and the payment is received, we will initiate the project.
            </p>
            <p>Step 2: Kickoff & Strategic Planning</p>
            <p className="section-11-objective-content">
              A kickoff meeting will be scheduled to align on project goals,
              target audience, expectations, and key deliverables. We will
              conduct research, define the strategy, and develop a structured
              execution plan.
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-text">
        <p>Jordie’s Creative Agency Pvt Ltd</p>
        <a href="https://www.jordiescreativeagency.com">
          www.jordiescreativeagency.com
        </a>
        <img src="../images/logo.svg" alt="Company Logo" />
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default NextSteps;
