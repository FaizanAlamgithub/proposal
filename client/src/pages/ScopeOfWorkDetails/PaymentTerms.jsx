import React, { useState, useEffect } from "react";

function PaymentTerms({ proposal }) {
  // const tableData = [
  //   {
  //     terms: "Branding & Logo Design (One-Time)",
  //     amount: "INR 1000/-",
  //   },
  //   {
  //     terms: "Branding & Logo Design (One-Time)",
  //     amount: "INR 1000/-",
  //   },
  //   {
  //     terms: "Branding & Logo Design (One-Time)",
  //     amount: "INR 1000/-",
  //   },
  //   {
  //     terms: "Branding & Logo Design (One-Time)",
  //     amount: "INR 1000/-",
  //   },
  //   {
  //     terms: "Branding & Logo Design (One-Time)",
  //     amount: "INR 1000/-",
  //   },
  //   {
  //     terms: "Branding & Logo Design (One-Time)",
  //     amount: "INR 1000/-",
  //   },
  // ];

  const payments = proposal?.payments || [];

  // Extracting the correct weeks and preparing table data
  const tableData = payments.map((t) => {
    return {
      terms: t.terms,
      amount: t.amount || "No Cost available",
    };
  });

  const [rowsPerPage, setRowsPerPage] = useState(4); // Default to 2 rows per page

  useEffect(() => {
    // Adjust rows per page based on screen height
    // const adjustRowsPerPage = () => {
    //   const screenHeight = window.innerHeight;

    //   if (screenHeight > 1000) {
    //     setRowsPerPage(4);
    //   } else if (screenHeight > 800) {
    //     setRowsPerPage(3);
    //   } else {
    //     setRowsPerPage(2);
    //   }
    // };

    const adjustRowsPerPage = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (screenHeight > 1000) {
        setRowsPerPage(5);
      } else if (
        (screenWidth === 1280 && screenHeight === 720) ||
        (screenWidth === 1366 && screenHeight === 768)
      ) {
        setRowsPerPage(4);
      } else if (
        screenWidth === 486 ||
        (screenWidth < 1200 && screenHeight < 700)
      ) {
        setRowsPerPage(3);
      } else {
        setRowsPerPage(4); // Default fallback
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
          className="box section-10"
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
          <div className="section-10-content">
            <div className="section-10-inner-text">
              <div className="section-10-text1">
                <p>Payment</p>
                <p>Terms</p>
              </div>

              <div className="section-10-table-container">
                <table className="w-full border-collapse">
                  <thead className="bg-white">
                    <tr>
                      <th>Terms</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td>{row.terms}</td>
                        <td>INR {row.amount}/-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default PaymentTerms;
