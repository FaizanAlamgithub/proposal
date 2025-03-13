// // import React, { useState, useEffect } from "react";

// // function TimelineDelivery({ proposal }) {
// //   return (
// //     <>
// //       <div className="box section-8">
// //         <div className="header">
// //           <div className="header-text-1">
// //             <p>Proposal for</p>

// //             <p className="company-name">
// //               {proposal ? proposal.companyName : "Loading..."}
// //             </p>
// //           </div>
// //           <div className="header-text-2">
// //             <p>Powered by Humans, Fuelled by Creativity</p>
// //           </div>
// //         </div>
// //         <div className="section-8-content">
// //           <div className="section-8-inner-text">
// //             <div className="section-8-text1">
// //               <p>Timeline &</p>
// //               <p>Deliverables</p>
// //             </div>
// //             <p className="section-8-weeks">7 - 10 weeks</p>

// //             <div className="section-8-table-container">
// //               <table className="w-full border-collapse">
// //                 <thead className="bg-white">
// //                   <tr>
// //                     <th>Week</th>
// //                     <th>Task</th>
// //                     <th>Deliverables</th>
// //                   </tr>
// //                 </thead>
// //               </table>
// //               <div className="table-data">
// //                 <table className="w-full border-collapse">
// //                   <tbody>
// //                     <tr>
// //                       <td>Week 1-3</td>
// //                       <td>Market Research, Brand Naming & Tagline</td>
// //                       <td>
// //                         Competitor Analysis, Audience Personas, Brand
// //                         Positioning, Moodboard, Brand Name Exploration, Tagline
// //                         Development.
// //                       </td>
// //                     </tr>
// //                     <tr>
// //                       <td>Week 4-6</td>
// //                       <td>Visual Identity Development</td>
// //                       <td>
// //                         Logo Design (Primary, Secondary, Monochrome,
// //                         Responsive), Color Palette, Typography Selection,
// //                         Branding Elements, Digital Adaptations.
// //                       </td>
// //                     </tr>
// //                     <tr>
// //                       <td>Week 4-6</td>
// //                       <td>Visual Identity Development</td>
// //                       <td>
// //                         Logo Design (Primary, Secondary, Monochrome,
// //                         Responsive), Color Palette, Typography Selection,
// //                         Branding Elements, Digital Adaptations.
// //                       </td>
// //                     </tr>
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="bottom-text">
// //           <p>Jordie’s Creative Agency Pvt Ltd</p>
// //           <a href="https://www.jordiescreativeagency.com">
// //             www.jordiescreativeagency.com
// //           </a>
// //           <img src="../images/logo.svg" alt="" />
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default TimelineDelivery;

// // import React, { useState, useEffect } from "react";

// // function TimelineDelivery({ proposal }) {
// // const tableData = [
// //   {
// //     week: "Week 1-3",
// //     task: "Market Research, Brand Naming & Tagline",
// //     deliverables:
// //       "Competitor Analysis, Audience Personas, Brand Positioning, Moodboard, Brand Name Exploration, Tagline Development.",
// //   },
// //   {
// //     week: "Week 4-6",
// //     task: "Visual Identity Development",
// //     deliverables:
// //       "Logo Design (Primary, Secondary, Monochrome, Responsive), Color Palette, Typography Selection, Branding Elements, Digital Adaptations.",
// //   },
// //   {
// //     week: "Week 7-9",
// //     task: "Website Design & Development",
// //     deliverables:
// //       "Wireframing, UI/UX Design, Frontend Development, Backend Integration, Testing, Deployment.",
// //   },
// //   {
// //     week: "Week 10-12",
// //     task: "Marketing Strategy & Launch",
// //     deliverables:
// //       "Social Media Strategy, Digital Ads Setup, Content Creation, Performance Tracking.",
// //   },
// //   {
// //     week: "Week 13-15",
// //     task: "Ongoing Support & Optimization",
// //     deliverables:
// //       "Performance Analytics, User Feedback Integration, A/B Testing, Final Adjustments.",
// //   },
// // ];

// //   const [rowsPerPage, setRowsPerPage] = useState(2); // Default to 2 rows per page

// //   useEffect(() => {
// //     // Adjust rows per page based on screen height
// //     const adjustRowsPerPage = () => {
// //       const screenHeight = window.innerHeight;

// //       if (screenHeight > 1000) {
// //         setRowsPerPage(4);
// //       } else if (screenHeight > 800) {
// //         setRowsPerPage(3);
// //       } else {
// //         setRowsPerPage(2);
// //       }
// //     };

// //     adjustRowsPerPage(); // Run on mount
// //     window.addEventListener("resize", adjustRowsPerPage); // Adjust on window resize

// //     return () => window.removeEventListener("resize", adjustRowsPerPage);
// //   }, []);

// //   // Splitting the table data into pages based on calculated rowsPerPage
// //   const chunkedData = [];
// //   for (let i = 0; i < tableData.length; i += rowsPerPage) {
// //     chunkedData.push(tableData.slice(i, i + rowsPerPage));
// //   }

// //   return (
// //     <>
// //       {chunkedData.map((pageData, index) => (
// //         <div
// //           className="box section-8"
// //           key={index}
// //           style={{ pageBreakAfter: "always", minHeight: "100vh" }}
// //         >
// //           <div className="header">
// //             <div className="header-text-1">
// //               <p>Proposal for</p>
// //               <p className="company-name">
// //                 {proposal ? proposal.companyName : "Loading..."}
// //               </p>
// //             </div>
// //             <div className="header-text-2">
// //               <p>Powered by Humans, Fuelled by Creativity</p>
// //             </div>
// //           </div>

// //           <div className="section-8-content">
// //             <div className="section-8-inner-text">
// //               <div className="section-8-text1">
// //                 <p>Timeline &</p>
// //                 <p>Deliverables</p>
// //               </div>
// //               <p className="section-8-weeks">7 - 10 weeks</p>

// //               <div className="section-8-table-container">
// //                 <table className="w-full border-collapse">
// // <thead className="bg-white">
// //   <tr>
// //     <th>Week</th>
// //     <th>Task</th>
// //     <th>Deliverables</th>
// //   </tr>
// // </thead>
// //                 </table>

// //                 <div className="table-data">
// //                   <table className="w-full border-collapse">
// //                     <tbody>
// //                       {pageData.map((row, rowIndex) => (
// //                         <tr key={rowIndex}>
// //                           <td>{row.week}</td>
// //                           <td>{row.task}</td>
// //                           <td>{row.deliverables}</td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bottom-text">
// //             <p>Jordie’s Creative Agency Pvt Ltd</p>
// //             <a href="https://www.jordiescreativeagency.com">
// //               www.jordiescreativeagency.com
// //             </a>
// //             <img src="../images/logo.svg" alt="" />
// //           </div>
// //         </div>
// //       ))}
// //     </>
// //   );
// // }

// // export default TimelineDelivery;

// // import React, { useState, useEffect } from "react";

// // function TimelineDelivery({ proposal }) {
// //   const tableData = [
// //     {
// //       week: "Week 1-3",
// //       task: "Market Research, Brand Naming & Tagline",
// //       deliverables:
// //         "Competitor Analysis, Audience Personas, Brand Positioning, Moodboard, Brand Name Exploration, Tagline Development.",
// //     },
// //     {
// //       week: "Week 4-6",
// //       task: "Visual Identity Development",
// //       deliverables:
// //         "Logo Design (Primary, Secondary, Monochrome, Responsive), Color Palette, Typography Selection, Branding Elements, Digital Adaptations.",
// //     },
// //     {
// //       week: "Week 7-9",
// //       task: "Website Design & Development",
// //       deliverables:
// //         "Wireframing, UI/UX Design, Frontend Development, Backend Integration, Testing, Deployment.",
// //     },
// //     {
// //       week: "Week 10-12",
// //       task: "Marketing Strategy & Launch",
// //       deliverables:
// //         "Social Media Strategy, Digital Ads Setup, Content Creation, Performance Tracking.",
// //     },
// //     {
// //       week: "Week 13-15",
// //       task: "Ongoing Support & Optimization",
// //       deliverables:
// //         "Performance Analytics, User Feedback Integration, A/B Testing, Final Adjustments.",
// //     },
// //   ];

// //   const [rowsPerPage, setRowsPerPage] = useState(2); // Default to 2 rows per page

// //   useEffect(() => {
// //     // Adjust rows per page based on screen height
// //     const adjustRowsPerPage = () => {
// //       const screenHeight = window.innerHeight;

// //       if (screenHeight > 1000) {
// //         setRowsPerPage(4);
// //       } else if (screenHeight > 800) {
// //         setRowsPerPage(3);
// //       } else {
// //         setRowsPerPage(2);
// //       }
// //     };

// //     adjustRowsPerPage(); // Run on mount
// //     window.addEventListener("resize", adjustRowsPerPage); // Adjust on window resize

// //     return () => window.removeEventListener("resize", adjustRowsPerPage);
// //   }, []);

// //   // Splitting the table data into pages based on calculated rowsPerPage
// //   const chunkedData = [];
// //   for (let i = 0; i < tableData.length; i += rowsPerPage) {
// //     chunkedData.push(tableData.slice(i, i + rowsPerPage));
// //   }

// //   return (
// //     <>
// //       {chunkedData.map((pageData, index) => (
// //         <div
// //           className="box section-8"
// //           key={index}
// //           style={{ pageBreakAfter: "always", minHeight: "100vh" }}
// //         >
// //           <div className="header">
// //             <div className="header-text-1">
// //               <p>Proposal for</p>
// //               <p className="company-name">
// //                 {proposal ? proposal.companyName : "Loading..."}
// //               </p>
// //             </div>
// //             <div className="header-text-2">
// //               <p>Powered by Humans, Fuelled by Creativity</p>
// //             </div>
// //           </div>

// //           <div className="section-8-content">
// //             <div className="section-8-inner-text">
// //               <div className="section-8-text1">
// //                 <p>Timeline &</p>
// //                 <p>Deliverables</p>
// //               </div>
// //               <p className="section-8-weeks">7 - 10 weeks</p>
// //               <div className="section-8-table-container">
// //                 <table className="w-full border-collapse">
// //                   <thead className="bg-white">
// //                     <tr>
// //                       <th>Week</th>
// //                       <th>Task</th>
// //                       <th>Deliverables</th>
// //                     </tr>
// //                   </thead>
// //                 </table>
// //                 <div className="table-data">
// //                   <table className="w-full border-collapse">
// //                     <tbody>
// //                       {pageData.map((row, rowIndex) => (
// //                         <tr key={rowIndex}>
// //                           <td>{row.week}</td>
// //                           <td>{row.task}</td>
// //                           <td>{row.deliverables}</td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bottom-text">
// //             <p>Jordie’s Creative Agency Pvt Ltd</p>
// //             <a href="https://www.jordiescreativeagency.com">
// //               www.jordiescreativeagency.com
// //             </a>
// //             <img src="../images/logo.svg" alt="" />
// //           </div>
// //         </div>
// //       ))}
// //     </>
// //   );
// // }

// // export default TimelineDelivery;

// import React, { useState, useEffect } from "react";

// function TimelineDelivery({ proposal }) {
//   // const tableData =
//   //   proposal?.timelineDeliverables?.week?.map((week) => ({
//   //     week1: week?.week1 || "N/A",
//   //     week2: week?.week2 || "N/A",
//   //     task: proposal?.timelineDeliverables?.task || "No task available",
//   //     deliverables:
//   //       proposal?.timelineDeliverables?.deliverables ||
//   //       "No deliverables available",
//   //   })) || [];
//   const tableData = proposal?.timelineDeliverables
//     ? [
//         {
//           week: `Week ${Math.min(
//             ...proposal.timelineDeliverables.week
//               .map((w) => w.week1 || w.week2)
//               .filter(Boolean)
//           )} - ${Math.max(
//             ...proposal.timelineDeliverables.week
//               .map((w) => w.week1 || w.week2)
//               .filter(Boolean)
//           )}`,
//           task: proposal.timelineDeliverables.task || "No task available",
//           deliverables:
//             proposal.timelineDeliverables.deliverables ||
//             "No deliverables available",
//         },
//       ]
//     : [];

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
//           className="box section-8"
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

//           <div className="section-8-content">
//             <div className="section-8-inner-text">
//               <div className="section-8-text1">
//                 <p>Timeline &</p>
//                 <p>Deliverables</p>
//               </div>
//               <p className="section-8-weeks">7 - 10 weeks</p>
//               <div className="section-8-table-container">
//                 <table className="w-full border-collapse">
//                   <thead className="bg-white">
//                     <tr>
//                       <th>Week</th>
//                       <th>Task</th>
//                       <th>Deliverables</th>
//                     </tr>
//                   </thead>
//                 </table>
//                 <div className="table-data">
//                   <table className="w-full border-collapse">
//                     <tbody>
//                       {pageData.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           {/* <td>{`Week ${row.week1} - ${row.week2}`}</td> */}
//                           <td>{row.week}</td>
//                           <td>{row.task}</td>
//                           <td>{row.deliverables}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
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

// export default TimelineDelivery;

// import React, { useState, useEffect } from "react";

// function TimelineDelivery({ proposal }) {
//   if (!proposal) return <p>Loading proposal...</p>;

//   const timelineDeliverables = proposal.timelineDeliverables || [];

//   const tableData = timelineDeliverables.map((t) => {
//     const weekData = t?.week?.[0] || {}; // Ensure weekData is an object
//     const minWeek = weekData?.week1 || "N/A";
//     const maxWeek = weekData?.week2 || "N/A";

//     return {
//       week: `Week ${minWeek} - ${maxWeek}`,
//       task: t.task || "No task available",
//       deliverables: t.deliverables || "No deliverables available",
//     };
//   });

//   const [rowsPerPage, setRowsPerPage] = useState(2);

//   useEffect(() => {
//     const adjustRowsPerPage = () => {
//       const screenHeight = window.innerHeight;
//       setRowsPerPage(screenHeight > 1000 ? 4 : screenHeight > 800 ? 3 : 2);
//     };

//     adjustRowsPerPage();
//     window.addEventListener("resize", adjustRowsPerPage);
//     return () => window.removeEventListener("resize", adjustRowsPerPage);
//   }, []);

//   const chunkedData = [];
//   for (let i = 0; i < tableData.length; i += rowsPerPage) {
//     chunkedData.push(tableData.slice(i, i + rowsPerPage));
//   }

//   return (
//     <>
//       {chunkedData.map((pageData, index) => (
//         <div
//           className="box section-8"
//           key={index}
//           style={{ pageBreakAfter: "always", minHeight: "100vh" }}
//         >
//           <div className="header">
//             <div className="header-text-1">
//               <p>Proposal for</p>
//               <p className="company-name">
//                 {proposal?.companyName || "Loading..."}
//               </p>
//             </div>
//             <div className="header-text-2">
//               <p>Powered by Humans, Fuelled by Creativity</p>
//             </div>
//           </div>

//           <div className="section-8-content">
//             <div className="section-8-inner-text">
//               <div className="section-8-text1">
//                 <p>Timeline &</p>
//                 <p>Deliverables</p>
//               </div>
//               <p className="section-8-weeks">
//                 {proposal?.timelineWeeks?.startWeek || 1} -{" "}
//                 {proposal?.timelineWeeks?.endWeek || 7} weeks
//               </p>

//               <div className="section-8-table-container">
//                 <table className="w-full border-collapse">
//                   <thead className="bg-white">
//                     <tr>
//                       <th>Week</th>
//                       <th>Task</th>
//                       <th>Deliverables</th>
//                     </tr>
//                   </thead>
//                 </table>
//                 <div className="table-data">
//                   <table className="w-full border-collapse">
//                     <tbody>
//                       {pageData.map((row, rowIndex) => (
//                         <tr key={rowIndex}>
//                           <td>{row.week}</td>
//                           <td>{row.task}</td>
//                           <td>{row.deliverables}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bottom-text">
//             <p>Jordie’s Creative Agency Pvt Ltd</p>
//             <a href="https://www.jordiescreativeagency.com">
//               www.jordiescreativeagency.com
//             </a>
//             <img src="/images/logo.svg" alt="Company Logo" />
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export default TimelineDelivery;

import React, { useState, useEffect } from "react";

function TimelineDelivery({ proposal }) {
  // Ensure timelineDeliverables exists and is an array
  const timelineDeliverables = proposal?.timelineDeliverables || [];

  // Extracting the correct weeks and preparing table data
  const tableData = timelineDeliverables.map((t) => {
    const weekData = t.week?.[0] || {}; // Safely access the first element in week array
    const minWeek = weekData.week1 || "N/A"; // Default to "N/A" if missing
    const maxWeek = weekData.week2 || "N/A";

    return {
      week: `Week ${minWeek} - ${maxWeek}`,
      task: t.task || "No task available",
      deliverables: t.deliverables || "No deliverables available",
    };
  });

  const [rowsPerPage, setRowsPerPage] = useState(2); // Default to 2 rows per page

  useEffect(() => {
    const adjustRowsPerPage = () => {
      const screenHeight = window.innerHeight;
      setRowsPerPage(screenHeight > 1000 ? 4 : screenHeight > 800 ? 3 : 2);
    };

    adjustRowsPerPage();
    window.addEventListener("resize", adjustRowsPerPage);
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
          className="box section-8"
          key={index}
          style={{ pageBreakAfter: "always", minHeight: "100vh" }}
        >
          <div className="header">
            <div className="header-text-1">
              <p>Proposal for</p>
              <p className="company-name">
                {proposal?.companyName || "Loading..."}
              </p>
            </div>
            <div className="header-text-2">
              <p>Powered by Humans, Fuelled by Creativity</p>
            </div>
          </div>

          <div className="section-8-content">
            <div className="section-8-inner-text">
              <div className="section-8-text1">
                <p>Timeline &</p>
                <p>Deliverables</p>
              </div>
              <p className="section-8-weeks">
                {proposal.timelineWeeks.startWeek || 1} -{" "}
                {proposal.timelineWeeks.endWeek || 7} weeks
              </p>

              <div className="section-8-table-container">
                <table className="w-full border-collapse">
                  <thead className="bg-white">
                    <tr>
                      <th>Week</th>
                      <th>Task</th>
                      <th>Deliverables</th>
                    </tr>
                  </thead>
                </table>
                <div className="table-data">
                  <table className="w-full border-collapse">
                    <tbody>
                      {pageData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>{row.week}</td>
                          <td>{row.task}</td>
                          <td>{row.deliverables}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
        </div>
      ))}
    </>
  );
}

export default TimelineDelivery;
