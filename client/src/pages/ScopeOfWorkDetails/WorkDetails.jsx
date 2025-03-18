// import React, { useState, useEffect } from "react";

// function ScopeOfWork({ proposal }) {
//   const tableData = [
//     {
//       title: "Branding & Logo Design",
//       description:
//         "To position Neo Dental Clinic as a preferred choice through data-driven strategies, fostering patient trust, enhancing visibility, and optimizing conversions for sustainable growth.",
//     },
//     {
//       title: "Branding & Logo Design",
//       description:
//         "To position Neo Dental Clinic as a preferred choice through data-driven strategies, fostering patient trust, enhancing visibility, and optimizing conversions for sustainable growth.",
//     },
//     {
//       title: "Branding & Logo Design",
//       description:
//         "To position Neo Dental Clinic as a preferred choice through data-driven strategies, fostering patient trust, enhancing visibility, and optimizing conversions for sustainable growth.",
//     },
//   ];
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
//           className="box section-7"
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
//           <div className="section-7-content">
//             <div className="section-7-inner-text">
//               <div className="section-7-text1">
//                 <p>Scope Of</p>
//                 <p>Work</p>
//                 <div className="section-7-below-text">
//                   <p>
//                     Branding, Web Design & Digital Marketing – Transforming
//                     Visions into Success
//                   </p>
//                 </div>
//               </div>
//               {pageData.map((row, rowIndex) => (
//                 <div className="section-7-text2" key={rowIndex}>
//                   <p>{row.title}</p>
//                   <p className="section-7-objective-content">
//                     {row.description}
//                   </p>
//                 </div>
//               ))}
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

// export default ScopeOfWork;

// import React, { useState, useEffect } from "react";

// function ScopeOfWork({ proposal }) {
//   const tableData = [
//     {
//       title: "Branding & Logo Design",
//       description:
//         "To position Neo Dental Clinic as a preferred choice through data-driven strategies, fostering patient trust, enhancing visibility, and optimizing conversions for sustainable growth.",
//     },
//     {
//       title: "Web Development",
//       description:
//         "Designing a seamless, fast, and user-friendly website to provide an intuitive experience for visitors.",
//     },
//     {
//       title: "Digital Marketing",
//       description:
//         "Implementing SEO, PPC, and social media strategies to maximize reach and conversion rates.",
//     },
//     {
//       title: "Content Strategy",
//       description:
//         "Developing compelling, engaging, and informative content to establish brand authority.",
//     },
//   ];

//   const [rowsPerPage, setRowsPerPage] = useState(2); // Default to 2

//   useEffect(() => {
//     const adjustRowsPerPage = () => {
//       const screenWidth = window.innerWidth; // Use width for better control

//       if (screenWidth >= 1440) {
//         setRowsPerPage(4); // Large screens (1440px and above)
//       } else {
//         setRowsPerPage(2); // Default for small laptops and below
//       }
//     };

//     adjustRowsPerPage();
//     window.addEventListener("resize", adjustRowsPerPage);

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
//         <div className="box section-7" key={index}>
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
//           <div className="section-7-content">
//             <div className="section-7-inner-text">
//               <div className="section-7-text1">
//                 <p>Scope Of</p>
//                 <p>Work</p>
//                 <div className="section-7-below-text">
//                   <p>
//                     {/* Branding, Web Design & Digital Marketing – Transforming
//                     Visions into Success */}
//                     {proposal ? proposal.scopeOfWork.title : "Loading..."}
//                   </p>
//                 </div>
//               </div>

//               <div className="section-7-branding-text">
//                 {/* {pageData.map((row, rowIndex) => (
//                   <div className="section-7-text2" key={rowIndex}>
//                     <p>{row.title}</p>
//                     <p className="section-7-objective-content">
//                       {row.description}
//                     </p>
//                   </div>
//                 ))} */}
//                 {/* {proposal.scopeOfWork.services.map((service, index) => (
//                   <div className="section-7-text2" key={index}>
//                     <p>{service}</p>
//                     <p className="section-7-objective-content">
//                       {proposal.scopeOfWork.description[index] ||
//                         "No description available"}
//                     </p>
//                   </div>
//                 ))} */}
//                 {proposal.scopeOfWork.services.length > 0 &&
//                 proposal.scopeOfWork.description.length > 0 ? (
//                   proposal.scopeOfWork.services.map((service, index) => (
//                     <div className="section-7-text2" key={index}>
//                       <p>{service}</p>
//                       <p className="section-7-objective-content">
//                         {proposal.scopeOfWork.description[index] ||
//                           "No description available"}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No services or descriptions available.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="bottom-text">
//             <p>Jordie’s Creative Agency Pvt Ltd</p>
//             <a href="https://www.jordiescreativeagency.com">
//               www.jordiescreativeagency.com
//             </a>
//             <img src="../images/logo.svg" alt="Company Logo" />
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export default ScopeOfWork;

import React, { useState, useEffect } from "react";

function ScopeOfWork({ proposal }) {
  const [rowsPerPage, setRowsPerPage] = useState(); // Default to 2

  useEffect(() => {
    const adjustRowsPerPage = () => {
      const screenWidth = window.innerWidth; // Use width for better control

      if (screenWidth >= 1440) {
        setRowsPerPage(4); // Large screens (1440px and above)
      } else {
        setRowsPerPage(3); // Default for small laptops and below
      }
    };

    // const adjustRowsPerPage = () => {
    //   const screenWidth = window.innerWidth;
    //   const screenHeight = window.innerHeight;

    //   if (screenWidth === 1920 && screenHeight === 1080) {
    //     setRowsPerPage(4);
    //   } else if (screenWidth === 1280 && screenHeight === 720) {
    //     setRowsPerPage(2);
    //   } else if (screenWidth === 486) {
    //     setRowsPerPage(2);
    //   } else if (screenWidth < 1200 && screenHeight < 700) {
    //     setRowsPerPage(3);
    //   }
    // };

    // const adjustRowsPerPage = () => {
    //   const screenWidth = window.innerWidth;
    //   const screenHeight = window.innerHeight;

    //   if (screenHeight > 1000) {
    //     setRowsPerPage(4);
    //   } else if (screenWidth === 1366 && screenHeight === 768) {
    //     setRowsPerPage(3);
    //   } else if (screenWidth === 353 && screenHeight === 745) {
    //     setRowsPerPage(3);
    //   } else if (screenWidth < 1200 && screenHeight < 700) {
    //     setRowsPerPage(3);
    //   } else {
    //     setRowsPerPage(3); // Default fallback
    //   }
    // };

    adjustRowsPerPage();
    window.addEventListener("resize", adjustRowsPerPage);

    return () => window.removeEventListener("resize", adjustRowsPerPage);
  }, []);

  // Ensure proposal and scopeOfWork exist before processing
  if (!proposal || !proposal.scopeOfWork) {
    return <p>Loading...</p>;
  }

  const { services, description, title } = proposal.scopeOfWork;

  // Handle cases where services or descriptions are missing
  if (!services || services.length === 0 || !description) {
    return <p>No services or descriptions available.</p>;
  }

  // Splitting the data into pages based on rowsPerPage
  const chunkedData = [];
  for (let i = 0; i < services.length; i += rowsPerPage) {
    chunkedData.push(services.slice(i, i + rowsPerPage));
  }

  return (
    <>
      {chunkedData.map((pageData, index) => (
        <div className="box section-7" key={index}>
          <div className="header">
            <div className="header-text-1">
              <p>Proposal for</p>
              <p className="company-name">
                {proposal.companyName || "Loading..."}
              </p>
            </div>
            <div className="header-text-2">
              <p>Powered by Humans, Fuelled by Creativity</p>
            </div>
          </div>
          <div className="section-7-content">
            <div className="section-7-inner-text">
              <div className="section-7-text1">
                <p>Scope Of</p>
                <p>Work</p>
                <div className="section-7-below-text">
                  <p>{title || "Loading..."}</p>
                </div>
              </div>

              <div className="section-7-branding-text">
                {pageData.map((service, rowIndex) => (
                  <div className="section-7-text2" key={rowIndex}>
                    <p>{service}</p>
                    <p className="section-7-objective-content">
                      {description[rowIndex] || "No description available"}
                    </p>
                  </div>
                ))}
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

export default ScopeOfWork;
