import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Proposal from "../../client/src/pages/Proposal";
import TableOfContent from "../../client/src/pages/TableOfContent";
import HelloClient from "../../client/src/pages/HelloClient";
import Introduction from "../../client/src/pages/Introduction";
import WhyWorkWithUs from "../../client/src/pages/WhyWorkWithUs";
import ScopeOfWork from "../../client/src/pages/ScopeOfWork";
import WorkDetails from "../../client/src/pages/ScopeOfWorkDetails/WorkDetails";
import TimelineDelivery from "../../client/src/pages/ScopeOfWorkDetails/TimelineDelivery";
import ProposedInvestment from "../../client/src/pages/ScopeOfWorkDetails/ProposedInvestment";
import PaymentTerms from "../../client/src/pages/ScopeOfWorkDetails/PaymentTerms";
// import NextSteps from "../../client/src/pages/ScopeOfWorkDetails/NextSteps";

import Dashboard from "./components/Dashboard";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ShowAllpages() {
  const { id } = useParams(); // Get proposalId from URL
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pagesRef = useRef(null);

  const Script = () => {
    useEffect(() => {
      window.addEventListener("scroll", () => {
        console.log(`Horizontal Scroll Position: ${window.scrollX}`);
      });

      const container = document.querySelector(".horizontal-slide");
      const scrollLine = document.querySelector(".line-bar");
      const sections = document.querySelectorAll(".box");
      const [prevBtn, nextBtn] = document.querySelectorAll(".prev, .next");

      if (
        !container ||
        !scrollLine ||
        !prevBtn ||
        !nextBtn ||
        sections.length === 0
      )
        return;

      let currentIndex = 0;

      const scrollToIndex = (index) => {
        if (index < 0 || index >= sections.length) return;
        currentIndex = index;
        container.scrollTo({
          left: sections[index].offsetLeft,
          behavior: "smooth",
        });
        updateScrollLine();
      };

      const updateScrollLine = () => {
        scrollLine.style.width = `${
          (container.scrollLeft /
            (container.scrollWidth - container.clientWidth)) *
          100
        }%`;
      };

      const handleScroll = () => {
        let closestIndex = [...sections].reduce(
          (closest, section, index) =>
            Math.abs(container.scrollLeft - section.offsetLeft) <
            Math.abs(container.scrollLeft - sections[closest].offsetLeft)
              ? index
              : closest,
          0
        );
        console.log(currentIndex);
        currentIndex = closestIndex;
        updateScrollLine();
      };

      container.addEventListener("scroll", handleScroll);
      prevBtn.addEventListener("click", () => scrollToIndex(currentIndex - 1));
      nextBtn.addEventListener("click", () => scrollToIndex(currentIndex + 1));

      return () => {
        container.removeEventListener("scroll", handleScroll);
        prevBtn.removeEventListener("click", () =>
          scrollToIndex(currentIndex - 1)
        );
        nextBtn.removeEventListener("click", () =>
          scrollToIndex(currentIndex + 1)
        );
      };
    }, []);

    return null;
  };

  // const downloadPDF = async () => {
  //   const input = pagesRef.current;
  //   if (!input) return;

  //   // Convert 1366x768 px to mm
  //   const pageWidth = 1366 * 0.264583; // ≈ 361.5 mm
  //   const pageHeight = 768 * 0.264583; // ≈ 203 mm

  //   let quality = 0.5; // Start with medium quality
  //   let scale = 1.5; // Lower scale to reduce image size
  //   let pdf;
  //   let fileSizeKB = 0;

  //   do {
  //     pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]); // Landscape mode
  //     const options = {
  //       scale: scale, // Lower scale for smaller file
  //       useCORS: true,
  //     };

  //     const sections = input.children;
  //     for (let i = 0; i < sections.length; i++) {
  //       const canvas = await html2canvas(sections[i], options);
  //       const imgData = canvas.toDataURL("image/jpeg", quality); // Adjust image quality

  //       if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //       pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
  //     }

  //     // Convert to Blob and get file size in KB
  //     const pdfBlob = pdf.output("blob");
  //     fileSizeKB = (pdfBlob.size / 1024).toFixed(2);

  //     // console.log(`PDF Size: ${fileSizeKB} KB`);

  //     // Reduce quality if size exceeds 250 KB
  //     if (fileSizeKB > 250) {
  //       quality -= 0.1; // Reduce image quality
  //       scale -= 0.1; // Decrease scale slightly
  //     }
  //   } while (fileSizeKB > 250 && quality > 0.2); // Stop when size is acceptable or quality is too low

  //   pdf.save("proposal.pdf");
  // };

  // const downloadPDF = async () => {
  //   const input = pagesRef.current;
  //   if (!input) return;

  //   const pageWidth = 1920 * 0.264583; // ≈ 508 mm
  //   const pageHeight = 1080 * 0.264583; // ≈ 286 mm

  //   let quality = 0.5; // Lower image quality for compression
  //   let scale = 1; // Reduce scale to minimize file size
  //   let pdf;
  //   let fileSizeKB = 0;

  //   do {
  //     pdf = new jsPDF("l", "mm", [pageWidth, pageHeight], true); // Set to landscape mode

  //     const options = {
  //       scale: scale,
  //       useCORS: true,
  //       backgroundColor: "#FFFFFF", // Ensures white background for better compression
  //     };

  //     const sections = input.children;
  //     for (let i = 0; i < sections.length; i++) {
  //       const canvas = await html2canvas(sections[i], options);
  //       const imgData = canvas.toDataURL("image/jpeg", quality); // Lower quality for smaller size

  //       if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //       pdf.addImage(
  //         imgData,
  //         "JPEG",
  //         0,
  //         0,
  //         pageWidth,
  //         pageHeight,
  //         undefined,
  //         "FAST"
  //       );
  //     }

  //     // Convert to Blob and get file size
  //     const pdfBlob = pdf.output("blob");
  //     fileSizeKB = (pdfBlob.size / 1024).toFixed(2);

  //     // Reduce quality if size exceeds 15 KB
  //     if (fileSizeKB > 15) {
  //       quality -= 0.5; // Reduce image quality
  //       scale -= 0.05; // Decrease scale slightly
  //     }
  //   } while (fileSizeKB > 15 && quality > 0.5);

  //   pdf.save("proposal.pdf");
  // };

  const downloadPDF = async () => {
    const input = pagesRef.current;
    if (!input) return;

    const pageHeight = 1080 * 0.264583; // ≈ 286 mm (fixed height)
    let quality = 0.8; // Start with decent quality
    let scale = 1.5; // Balanced scale for clarity & compression
    let pdf;
    let fileSizeKB = 0;

    try {
      const firstSection = input.children[0];
      if (!firstSection) return;

      // Measure width dynamically based on first section
      const tempCanvas = await html2canvas(firstSection, { scale });
      const pageWidth = (tempCanvas.width * pageHeight) / tempCanvas.height; // Maintain aspect ratio

      pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);

      const options = {
        scale,
        useCORS: true,
        backgroundColor: "#FFFFFF",
        logging: false,
      };

      for (let i = 0; i < input.children.length; i++) {
        const canvas = await html2canvas(input.children[i], options);
        const imgData = canvas.toDataURL("image/jpeg", quality);

        if (i > 0) pdf.addPage([pageWidth, pageHeight]);
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          pageWidth,
          pageHeight,
          undefined,
          "FAST"
        );
      }

      // Compress & check size
      let pdfBlob = pdf.output("blob");
      fileSizeKB = (pdfBlob.size / 1024).toFixed(2);

      // Reduce quality & scale further if above 150KB
      while (fileSizeKB > 150 && quality > 0.4) {
        quality -= 0.1;
        scale -= 0.1;

        pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);
        for (let i = 0; i < input.children.length; i++) {
          const canvas = await html2canvas(input.children[i], { scale });
          const imgData = canvas.toDataURL("image/jpeg", quality);
          if (i > 0) pdf.addPage([pageWidth, pageHeight]);
          pdf.addImage(
            imgData,
            "JPEG",
            0,
            0,
            pageWidth,
            pageHeight,
            undefined,
            "FAST"
          );
        }

        pdfBlob = pdf.output("blob");
        fileSizeKB = (pdfBlob.size / 1024).toFixed(2);
      }

      // Final compressed download
      pdf.save("proposal.pdf");
    } catch (error) {
      console.error("Error generating compressed PDF:", error);
    }
  };

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/proposals/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch proposal");
        }
        const data = await response.json();
        setProposal(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  if (loading) return <p>Loading proposal...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!proposal) return <p>No proposal found.</p>;

  return (
    <>
      <Script />
      <button onClick={downloadPDF} className="download-btn absolute z-10">
        Download PDF
      </button>
      <div className="horizontal-slide" ref={pagesRef}>
        <Proposal proposal={proposal} />
        <TableOfContent proposal={proposal} />
        <HelloClient proposal={proposal} />
        <Introduction proposal={proposal} />
        <WhyWorkWithUs proposal={proposal} />
        <ScopeOfWork proposal={proposal} />
        <WorkDetails proposal={proposal} />
        <TimelineDelivery proposal={proposal} />
        <ProposedInvestment proposal={proposal} />
        <PaymentTerms proposal={proposal} />
        {/* <NextSteps proposal={proposal} /> */}
      </div>
      {/* <Dashboard downloadPDF={downloadPDF} /> */}
      <div className="slider">
        <div className="prev slider-text">
          <i className="bi bi-arrow-left"></i>
          <p>Previous</p>
        </div>
        <div className="line">
          <div className="line-bar"></div>
        </div>
        <div className="next slider-text">
          <p>Next</p>
          <i className="bi bi-arrow-right"></i>
        </div>
      </div>
    </>
  );
}

export default ShowAllpages;

// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import Proposal from "../../client/src/pages/Proposal";
// import TableOfContent from "../../client/src/pages/TableOfContent";
// import HelloClient from "../../client/src/pages/HelloClient";
// import Introduction from "../../client/src/pages/Introduction";
// import WhyWorkWithUs from "../../client/src/pages/WhyWorkWithUs";
// import ScopeOfWork from "../../client/src/pages/ScopeOfWork";
// import WorkDetails from "../../client/src/pages/ScopeOfWorkDetails/WorkDetails";
// import TimelineDelivery from "../../client/src/pages/ScopeOfWorkDetails/TimelineDelivery";
// import ProposedInvestment from "../../client/src/pages/ScopeOfWorkDetails/ProposedInvestment";
// import PaymentTerms from "../../client/src/pages/ScopeOfWorkDetails/PaymentTerms";
// import NextSteps from "../../client/src/pages/ScopeOfWorkDetails/NextSteps";

// import Dashboard from "./components/Dashboard";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// function ShowAllpages() {
//   const { id } = useParams(); // Get proposalId from URL
//   const [proposal, setProposal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const pagesRef = useRef(null);

//   const Script = () => {
//     useEffect(() => {
//       window.addEventListener("scroll", () => {
//         console.log(`Horizontal Scroll Position: ${window.scrollX}`);
//       });

//       const container = document.querySelector(".horizontal-slide");
//       const scrollLine = document.querySelector(".line-bar");
//       const sections = document.querySelectorAll(".box");
//       const [prevBtn, nextBtn] = document.querySelectorAll(".prev, .next");

//       if (
//         !container ||
//         !scrollLine ||
//         !prevBtn ||
//         !nextBtn ||
//         sections.length === 0
//       )
//         return;

//       let currentIndex = 0;

//       const scrollToIndex = (index) => {
//         if (index < 0 || index >= sections.length) return;
//         currentIndex = index;
//         container.scrollTo({
//           left: sections[index].offsetLeft,
//           behavior: "smooth",
//         });
//         updateScrollLine();
//       };

//       const updateScrollLine = () => {
//         scrollLine.style.width = `${
//           (container.scrollLeft /
//             (container.scrollWidth - container.clientWidth)) *
//           100
//         }%`;
//       };

//       const handleScroll = () => {
//         let closestIndex = [...sections].reduce(
//           (closest, section, index) =>
//             Math.abs(container.scrollLeft - section.offsetLeft) <
//             Math.abs(container.scrollLeft - sections[closest].offsetLeft)
//               ? index
//               : closest,
//           0
//         );
//         console.log(currentIndex);
//         currentIndex = closestIndex;
//         updateScrollLine();
//       };

//       container.addEventListener("scroll", handleScroll);
//       prevBtn.addEventListener("click", () => scrollToIndex(currentIndex - 1));
//       nextBtn.addEventListener("click", () => scrollToIndex(currentIndex + 1));

//       return () => {
//         container.removeEventListener("scroll", handleScroll);
//         prevBtn.removeEventListener("click", () =>
//           scrollToIndex(currentIndex - 1)
//         );
//         nextBtn.removeEventListener("click", () =>
//           scrollToIndex(currentIndex + 1)
//         );
//       };
//     }, []);

//     return null;
//   };

//   const downloadPDF = async (id) => {
//     if (!id) return;

//     try {
//       // Fetch proposal data based on ID
//       const response = await fetch(`http://localhost:5000/api/proposals/${id}`);
//       if (!response.ok) throw new Error("Failed to fetch proposal data");

//       const proposal = await response.json();

//       if (!proposal) {
//         console.error("No proposal data found.");
//         return;
//       }

//       const input = pagesRef.current;
//       if (!input) return;

//       const pdf = new jsPDF("l", "mm", "a4"); // Standard A4 landscape format
//       const options = { scale: 2, useCORS: true };

//       const sections = input.children;
//       for (let i = 0; i < sections.length; i++) {
//         const canvas = await html2canvas(sections[i], options);
//         const imgData = canvas.toDataURL("image/jpeg", 0.8);

//         if (i > 0) pdf.addPage();
//         pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
//       }

//       pdf.save(`${proposal.companyName}_Proposal.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchProposal = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/proposals/${id}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch proposal");
//         }
//         const data = await response.json();
//         setProposal(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProposal();
//   }, [id]);

//   if (loading) return <p>Loading proposal...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!proposal) return <p>No proposal found.</p>;

//   return (
//     <>
//       <Script />
//       <button onClick={downloadPDF} className="download-btn">
//         Download PDF
//       </button>
//       <div className="horizontal-slide" ref={pagesRef}>
//         <Proposal proposal={proposal} />
//         <TableOfContent proposal={proposal} />
//         <HelloClient proposal={proposal} />
//         <Introduction proposal={proposal} />
//         <WhyWorkWithUs proposal={proposal} />
//         <ScopeOfWork proposal={proposal} />
//         <WorkDetails proposal={proposal} />
//         <TimelineDelivery proposal={proposal} />
//         <ProposedInvestment proposal={proposal} />
//         <PaymentTerms proposal={proposal} />
//         <NextSteps proposal={proposal} />
//       </div>
//       <Dashboard downloadPDF={downloadPDF} />
//       <div className="slider">
//         <div className="prev slider-text">
//           <i className="bi bi-arrow-left"></i>
//           <p>Previous</p>
//         </div>
//         <div className="line">
//           <div className="line-bar"></div>
//         </div>
//         <div className="next slider-text">
//           <p>Next</p>
//           <i className="bi bi-arrow-right"></i>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ShowAllpages;
