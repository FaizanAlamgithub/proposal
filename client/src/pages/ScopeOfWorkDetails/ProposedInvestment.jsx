// import React from "react";

// function ProposedInvestment({ proposal }) {
//   return (
//     <>
//       <div className="box section-9">
//         <div className="header">
//           <div className="header-text-1">
//             <p>Proposal for</p>

//             <p className="company-name">
//               {proposal ? proposal.companyName : "Loading..."}
//             </p>
//           </div>
//           <div className="header-text-2">
//             <p>Powered by Humans, Fuelled by Creativity</p>
//           </div>
//         </div>
//         <div className="section-9-content">
//           <div className="section-9-inner-text">
//             <div className="section-9-text1">
//               <p>Proposed</p>
//               <p>Investment</p>
//             </div>
//             <p className="section-9-inr">INR 2700/-*</p>
//             <div className="section-9-table-container">
//               <table className="w-full border-collapse">
//                 <thead className="bg-white">
//                   <tr>
//                     <th>Service</th>
//                     <th>Description</th>
//                     <th>Cost </th>
//                   </tr>
//                 </thead>
//               </table>
//               <div className="h-[40vh] overflow-y-auto scrollbar-hide">
//                 <table className="w-full border-collapse">
//                   <tbody>
//                     <tr>
//                       <td>Branding & Logo Design (One-Time)</td>
//                       <td>
//                         Development of brand identity, primary logo, color
//                         palette, and typography.
//                       </td>
//                       <td>INR 1000/-</td>
//                     </tr>
//                     <tr>
//                       <td>Website Content (One-Time)</td>
//                       <td>
//                         Strategizing, writing, and organizing website content
//                       </td>
//                       <td>INR 1000/-</td>
//                     </tr>
//                     <tr>
//                       <td>
//                         Single Page Website Design & Development (One-Time)
//                       </td>
//                       <td>
//                         UI/UX design, website structure, and front-end
//                         development.
//                       </td>
//                       <td>INR 1000/-</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <p className="bottom-text-inr">
//             *All Prices are in <span>INR</span>
//           </p>
//         </div>
//         <div className="bottom-text">
//           <p>Jordie’s Creative Agency Pvt Ltd</p>
//           <a href="https://www.jordiescreativeagency.com">
//             www.jordiescreativeagency.com
//           </a>
//           <img src="../images/logo.svg" alt="" />
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProposedInvestment;

// import React, { useState, useEffect } from "react";

// function ProposedInvestment({ proposal }) {
// const tableData = [
//   {
//     service: "Branding & Logo Design (One-Time)",
//     description:
//       "Development of brand identity, primary logo, color palette, and typography.",
//     cost: "INR 1000/-",
//   },
//   {
//     service: "Website Content (One-Time)",
//     description: "Strategizing, writing, and organizing website content.",
//     cost: "INR 1000/-",
//   },
//   {
//     service: "Single Page Website Design & Development (One-Time)",
//     description:
//       "UI/UX design, website structure, and front-end development.",
//     cost: "INR 1000/-",
//   },
//   {
//     service: "SEO Optimization (Monthly)",
//     description: "Improving search engine rankings and online visibility.",
//     cost: "INR 500/- per month",
//   },
//   {
//     service: "Social Media Management (Monthly)",
//     description: "Content creation, scheduling, and engagement handling.",
//     cost: "INR 800/- per month",
//   },
// ];

//   const [rowsPerPage, setRowsPerPage] = useState(2); // Default to 2 rows per page

//   useEffect(() => {
//     // Adjust rows per page based on screen height
//     const adjustRowsPerPage = () => {
//       const screenHeight = window.innerHeight;

//       if (screenHeight > 1000) {
//         setRowsPerPage(4);
//       } else if (screenHeight > 800) {
//         setRowsPerPage(3);
//       } else {
//         setRowsPerPage(2);
//       }
//     };

//     adjustRowsPerPage(); // Run on mount
//     window.addEventListener("resize", adjustRowsPerPage); // Adjust on window resize

//     return () => window.removeEventListener("resize", adjustRowsPerPage);
//   }, []);

//   // Splitting the table data into pages based on calculated rowsPerPage
//   const chunkedData = [];
//   for (let i = 0; i < tableData.length; i += rowsPerPage) {
//     chunkedData.push(tableData.slice(i, i + rowsPerPage));
//   }
//   return (
//     <>
//       {chunkedData.map((pageData, index) => (
//         <div
//           className="box section-9"
//           key={index}
//           style={{ pageBreakAfter: "always", minHeight: "100vh" }}
//         >
//           <div className="header">
//             <div className="header-text-1">
//               <p>Proposal for</p>
//               <p className="company-name">
//                 {proposal ? proposal.companyName : "Loading..."}
//               </p>
//             </div>
//             <div className="header-text-2">
//               <p>Powered by Humans, Fuelled by Creativity</p>
//             </div>
//           </div>

//           <div className="section-9-content">
//             <div className="section-9-inner-text">
//               <div className="section-9-text1">
//                 <p>Proposed</p>
//                 <p>Investment</p>
//               </div>
//               <p className="section-9-inr">INR 2700/-*</p>
//               <div className="section-9-table-container">
//                 <table className="w-full border-collapse">
// <thead className="bg-white">
//   <tr>
//     <th>Service</th>
//     <th>Description</th>
//     <th>Cost</th>
//   </tr>
// </thead>
//                 </table>
//                 <div className="h-[40vh] overflow-y-auto scrollbar-hide">
//                   <table className="w-full border-collapse">
//                     <tbody>
//                       {pageData.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           <td>{row.service}</td>
//                           <td>{row.description}</td>
//                           <td>{row.cost}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//             <p className="bottom-text-inr">
//               *All Prices are in <span>INR</span>
//             </p>
//           </div>

//           <div className="bottom-text">
//             <p>Jordie’s Creative Agency Pvt Ltd</p>
//             <a href="https://www.jordiescreativeagency.com">
//               www.jordiescreativeagency.com
//             </a>
//             <img src="../images/logo.svg" alt="" />
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export default ProposedInvestment;

import React, { useState, useEffect } from "react";

function ProposedInvestment({ proposal }) {
  const tableData = [
    {
      service: "Branding & Logo Design (One-Time)",
      description:
        "Development of brand identity, primary logo, color palette, and typography.",
      cost: "INR 1000/-",
    },
    {
      service: "Website Content (One-Time)",
      description: "Strategizing, writing, and organizing website content.",
      cost: "INR 1000/-",
    },
    {
      service: "Single Page Website Design & Development (One-Time)",
      description:
        "UI/UX design, website structure, and front-end development.",
      cost: "INR 1000/-",
    },
    {
      service: "SEO Optimization (Monthly)",
      description: "Improving search engine rankings and online visibility.",
      cost: "INR 500/- per month",
    },
    {
      service: "Social Media Management (Monthly)",
      description: "Content creation, scheduling, and engagement handling.",
      cost: "INR 800/- per month",
    },
  ];

  const [rowsPerPage, setRowsPerPage] = useState(2); // Default to 2 rows per page

  useEffect(() => {
    // Adjust rows per page based on screen height
    const adjustRowsPerPage = () => {
      const screenHeight = window.innerHeight;

      if (screenHeight > 1000) {
        setRowsPerPage(4);
      } else if (screenHeight > 800) {
        setRowsPerPage(3);
      } else {
        setRowsPerPage(2);
      }
    };

    adjustRowsPerPage(); // Run on mount
    window.addEventListener("resize", adjustRowsPerPage); // Adjust on window resize

    return () => window.removeEventListener("resize", adjustRowsPerPage);
  }, []);

  // Splitting the table data into pages based on calculated rowsPerPage
  const chunkedData = [];
  for (let i = 0; i < tableData.length; i += rowsPerPage) {
    chunkedData.push(tableData.slice(i, i + rowsPerPage));
  }

  return (
    <>
      {chunkedData.map((pageData, index) => (
        <div
          className="box section-9"
          key={index}
          style={{ pageBreakAfter: "always", minHeight: "100vh" }}
        >
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

          <div className="section-9-content">
            <div className="section-9-inner-text">
              <div className="section-8-text1">
                <p>Proposed</p>
                <p>Investment</p>
              </div>
              <p className="section-9-inr">INR 2700/-*</p>
              <div className="section-9-table-container">
                <table className="w-full border-collapse">
                  <thead className="bg-white">
                    <tr>
                      <th>Service</th>
                      <th>Description</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                </table>
                <div className="table-data">
                  <table className="w-full border-collapse">
                    <tbody>
                      {pageData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>{row.service}</td>
                          <td>{row.description}</td>
                          <td>{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="all-prices-text">
                  *All Prices are in <span>INR</span>
                </p>
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
      ))}
    </>
  );
}

export default ProposedInvestment;
