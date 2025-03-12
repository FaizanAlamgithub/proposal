// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Proposal({ proposal }) {
//   // const { id } = useParams();
//   // const [proposals, setProposals] = useState([]);
//   const navigate = useNavigate();

//   // Fetch data from backend
//   // useEffect(() => {
//   //   fetch(`http://localhost:5000/api/proposals/${id}`)
//   //     .then((response) => response.json())
//   //     .then((data) => setProposals(data))
//   //     .catch((error) => console.error("Error fetching proposals:", error));
//   // }, []);

//   // // Get the first proposal (or show a default object if empty)
//   // const proposal = proposals.length > 0 ? proposals[0] : null;

//   // Function to format date as "Month Day, Year"
//   const formatDate = (dateString) => {
//     if (!dateString) return "Loading...";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   useEffect(() => {
//     if (!proposal) {
//       navigate("/");
//     }
//   }, [proposal, navigate]);
//   return (
//     <>
//       <div className="box section-1">
//         <div className="logo">
//           <img src="./images/jca_logo.svg" alt="logo" />
//         </div>
//         {proposal ? (
//           <div className="hero-content">
//             <div className="midlle-text-container">
//               <div className="proposal-text">
//                 <p>Proposal</p>
//               </div>
//               <div className="propasal-hero">
//                 <p>
//                   A Strategic Approach to Building a Strong, Scalable, and
//                   Market-Leading Brand for
//                   <span className="company-name">
//                     {proposal ? proposal.companyName : "Loading..."}
//                   </span>
//                 </p>
//               </div>
//               <div className="proposal">
//                 <p>Prepared For:</p>
//                 <p className="client-name">
//                   {proposal ? proposal.clientName : "Loading..."}
//                 </p>
//               </div>
//             </div>
//             <div className="hero-text-bottom">
//               <div className="date-container">
//                 <div className="hero-text-div">
//                   <p className="issue-date">Issued On:</p>
//                   <p className="date">
//                     {proposal ? formatDate(proposal.date) : "Loading..."}
//                   </p>
//                 </div>
//                 <div className="hero-text-div">
//                   <p className="issue-date">Expires On:</p>
//                   <p className="date">February 11, 2025</p>
//                 </div>
//               </div>
//               <div className="hero-text-address">
//                 <p className="preparedBy">Prepared by:</p>
//                 <p className="jordie-text">Jordie’s Creative Agency Pvt Ltd</p>
//                 <p className="address">
//                   #198, CMH Road, 2nd Floor, Desk No. 170 Indiranagar,
//                   Bangalore, Karnataka, India 560038
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>No proposal data available.</p>
//         )}
//         <div className="section-1-bottom-text">
//           <p className="section-1-bottom-text-content">
//             Confidentiality Statement: This document contains confidential and
//             proprietary information belonging to Jordie’s Creative Agency. It is
//             intended solely for the recipient and may not be shared, copied, or
//             distributed without prior written consent. Any unauthorized use,
//             reproduction, or disclosure is strictly prohibited.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Proposal;

// import React, { useEffect } from "react";

// function Proposal({ proposal }) {
//   const formatDate = (dateString) => {
//     if (!dateString) return "Loading...";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <>
//       <div className="box section-1">
//         <div className="logo">
//           <img src="../images/jca_logo.svg" alt="logo" />
//         </div>
//         {proposal ? (
//           <div className="hero-content">
//             <div className="midlle-text-container">
//               <div className="proposal-text">
//                 <p>Proposal</p>
//               </div>
//               <div className="propasal-hero">
//                 <p>

//                   {proposal ? proposal.proposalDescription : "Loading..."}
//                   <span className="company-name">
//                     {proposal ? proposal.companyName : "Loading..."}
//                   </span>
//                 </p>
//               </div>
//               <div className="proposal">
//                 <p>Prepared For:</p>
//                 <p className="client-name">
//                   {proposal ? proposal.clientName : "Loading..."}
//                 </p>
//               </div>
//             </div>
//             <div className="hero-text-bottom">
//               <div className="date-container">
//                 <div className="hero-text-div">
//                   <p className="issue-date">Issued On:</p>
//                   <p className="date">
//                     {proposal ? formatDate(proposal.createdDate) : "Loading..."}
//                   </p>
//                 </div>
//                 <div className="hero-text-div">
//                   <p className="issue-date">Expires On:</p>
//                   <p className="date">
//                     {proposal ? formatDate(proposal.expiryDate) : "Loading..."}
//                   </p>
//                 </div>
//               </div>
//               <div className="hero-text-address">
//                 <p className="preparedBy">Prepared by:</p>
//                 <p className="jordie-text">Jordie’s Creative Agency Pvt Ltd</p>
//                 <p className="address">
//                   #198, CMH Road, 2nd Floor, Desk No. 170 Indiranagar,
//                   Bangalore, Karnataka, India 560038
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>No proposal data available.</p>
//         )}
//         <div className="section-1-bottom-text">
//           <p className="section-1-bottom-text-content">
//             Confidentiality Statement: This document contains confidential and
//             proprietary information belonging to Jordie’s Creative Agency. It is
//             intended solely for the recipient and may not be shared, copied, or
//             distributed without prior written consent. Any unauthorized use,
//             reproduction, or disclosure is strictly prohibited.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Proposal;

import React, { useEffect } from "react";

function Proposal({ proposal }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Loading...";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="box section-1">
      <div className="logo">
        <img src="../images/jca_logo.svg" alt="logo" />
      </div>
      {proposal ? (
        <div className="hero-content">
          <div className="midlle-text-container">
            <div className="proposal-text">
              <p>Proposal</p>
            </div>
            <div className="propasal-hero">
              <p>
                {proposal ? proposal.proposalDescription : "Loading..."}
                <span className="company-name">
                  {proposal ? proposal.companyName : "Loading..."}
                </span>
              </p>
            </div>
            <div className="proposal">
              <p>Prepared For:</p>
              <p className="client-name">
                {proposal ? proposal.clientName : "Loading..."}
              </p>
            </div>
          </div>
          <div className="hero-text-bottom">
            <div className="date-container">
              <div className="hero-text-div">
                <p className="issue-date">Issued On:</p>
                <p className="date">
                  {proposal ? formatDate(proposal.createdDate) : "Loading..."}
                </p>
              </div>
              <div className="hero-text-div">
                <p className="issue-date">Expires On:</p>
                <p className="date">
                  {proposal ? formatDate(proposal.expiryDate) : "Loading..."}
                </p>
              </div>
            </div>
            <div className="hero-text-address">
              <p className="preparedBy">Prepared by:</p>
              <p className="jordie-text">Jordie’s Creative Agency Pvt Ltd</p>
              <p className="address">
                #198, CMH Road, 2nd Floor, Desk No. 170 Indiranagar, Bangalore,
                Karnataka, India 560038
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>No proposal data available.</p>
      )}
      <div className="section-1-bottom-text">
        <p className="section-1-bottom-text-content">
          Confidentiality Statement: This document contains confidential and
          proprietary information belonging to Jordie’s Creative Agency. It is
          intended solely for the recipient and may not be shared, copied, or
          distributed without prior written consent. Any unauthorized use,
          reproduction, or disclosure is strictly prohibited.
        </p>
      </div>
    </section>
  );
}

export default Proposal;
