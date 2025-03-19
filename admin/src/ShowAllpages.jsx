import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import ThankYou from "../../client/src/pages/ThankYou";
import { ToastContainer, toast } from "react-toastify";
import Script from "../../client/src/Script";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ShowAllpages() {
  const { id } = useParams(); // Get proposalId from URL
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pagesRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();

  // const Script = () => {
  //   useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       console.log(`Horizontal Scroll Position: ${window.scrollX}`);
  //     });

  //     // const container = document.querySelector(".horizontal-slide");
  //     // const scrollLine = document.querySelector(".line-bar");
  //     // const sections = document.querySelectorAll(".box");
  //     // const [prevBtn, nextBtn] = document.querySelectorAll(".prev, .next");

  //     // if (
  //     //   !container ||
  //     //   !scrollLine ||
  //     //   !prevBtn ||
  //     //   !nextBtn ||
  //     //   sections.length === 0
  //     // )
  //     //   return;

  //     // let currentIndex = 0;

  //     // const scrollToIndex = (index) => {
  //     //   if (index < 0 || index >= sections.length) return;
  //     //   currentIndex = index;
  //     //   container.scrollTo({
  //     //     left: sections[index].offsetLeft,
  //     //     behavior: "smooth",
  //     //   });
  //     //   updateScrollLine();
  //     // };

  //     // const updateScrollLine = () => {
  //     //   scrollLine.style.width = `${
  //     //     (container.scrollLeft /
  //     //       (container.scrollWidth - container.clientWidth)) *
  //     //     100
  //     //   }%`;
  //     // };

  //     // const handleScroll = () => {
  //     //   let closestIndex = [...sections].reduce(
  //     //     (closest, section, index) =>
  //     //       Math.abs(container.scrollLeft - section.offsetLeft) <
  //     //       Math.abs(container.scrollLeft - sections[closest].offsetLeft)
  //     //         ? index
  //     //         : closest,
  //     //     0
  //     //   );
  //     //   console.log(currentIndex);
  //     //   currentIndex = closestIndex;
  //     //   updateScrollLine();
  //     // };

  //     // container.addEventListener("scroll", handleScroll);
  //     // prevBtn.addEventListener("click", () => scrollToIndex(currentIndex - 1));
  //     // nextBtn.addEventListener("click", () => scrollToIndex(currentIndex + 1));

  //     // return () => {
  //     //   container.removeEventListener("scroll", handleScroll);
  //     //   prevBtn.removeEventListener("click", () =>
  //     //     scrollToIndex(currentIndex - 1)
  //     //   );
  //     //   nextBtn.removeEventListener("click", () =>
  //     //     scrollToIndex(currentIndex + 1)
  //     //   );
  //     // };

  //     const container = document.querySelector(".horizontal-slide");
  //     const scrollLine = document.querySelector(".line-bar");
  //     const sections = document.querySelectorAll(".box");
  //     const [prevBtn, nextBtn] = document.querySelectorAll(".prev, .next");

  //     if (
  //       !container ||
  //       !scrollLine ||
  //       !prevBtn ||
  //       !nextBtn ||
  //       sections.length === 0
  //     )
  //       return;

  //     let currentIndex = 0;

  //     const scrollToIndex = (index) => {
  //       if (index < 0 || index >= sections.length) return;
  //       currentIndex = index;
  //       container.scrollTo({
  //         left: sections[index].offsetLeft,
  //         behavior: "smooth",
  //       });
  //       updateScrollLine();
  //     };

  //     const updateScrollLine = () => {
  //       scrollLine.style.width = `${
  //         (container.scrollLeft /
  //           (container.scrollWidth - container.clientWidth)) *
  //         100
  //       }%`;
  //     };

  //     const handleScroll = () => {
  //       let closestIndex = [...sections].reduce(
  //         (closest, section, index) =>
  //           Math.abs(container.scrollLeft - section.offsetLeft) <
  //           Math.abs(container.scrollLeft - sections[closest].offsetLeft)
  //             ? index
  //             : closest,
  //         0
  //       );
  //       console.log(currentIndex);
  //       currentIndex = closestIndex;
  //       updateScrollLine();
  //     };

  //     container.addEventListener("scroll", handleScroll);

  //     const handlePrevClick = () => scrollToIndex(currentIndex - 1);
  //     const handleNextClick = () => scrollToIndex(currentIndex + 1);

  //     prevBtn.addEventListener("click", handlePrevClick);
  //     nextBtn.addEventListener("click", handleNextClick);

  //     return () => {
  //       container.removeEventListener("scroll", handleScroll);
  //       prevBtn.removeEventListener("click", handlePrevClick);
  //       nextBtn.removeEventListener("click", handleNextClick);
  //     };
  //   }, []);

  //   return null;
  // };

  // const downloadPDF = async () => {
  //   const input = pagesRef.current;
  //   if (!input) return;

  //   const pageHeight = 1080 * 0.264583; // ≈ 286 mm (fixed height)
  //   let quality = 0.8; // Start with decent quality
  //   let scale = 1.5; // Balanced scale for clarity & compression
  //   let pdf;
  //   let fileSizeKB = 0;

  //   try {
  //     const firstSection = input.children[0];
  //     if (!firstSection) return;

  //     // Measure width dynamically based on first section
  //     const tempCanvas = await html2canvas(firstSection, { scale });
  //     const pageWidth = (tempCanvas.width * pageHeight) / tempCanvas.height; // Maintain aspect ratio

  //     pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);

  //     const options = {
  //       scale,
  //       useCORS: true,
  //       backgroundColor: "#FFFFFF",
  //       logging: false,
  //     };

  //     for (let i = 0; i < input.children.length; i++) {
  //       const canvas = await html2canvas(input.children[i], options);
  //       const imgData = canvas.toDataURL("image/jpeg", quality);

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

  //     // Compress & check size
  //     let pdfBlob = pdf.output("blob");
  //     fileSizeKB = (pdfBlob.size / 1024).toFixed(2);

  //     // Reduce quality & scale further if above 150KB
  //     while (fileSizeKB > 150 && quality > 0.4) {
  //       quality -= 0.1;
  //       scale -= 0.1;

  //       pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);
  //       for (let i = 0; i < input.children.length; i++) {
  //         const canvas = await html2canvas(input.children[i], { scale });
  //         const imgData = canvas.toDataURL("image/jpeg", quality);
  //         if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //         pdf.addImage(
  //           imgData,
  //           "JPEG",
  //           0,
  //           0,
  //           pageWidth,
  //           pageHeight,
  //           undefined,
  //           "FAST"
  //         );
  //       }

  //       pdfBlob = pdf.output("blob");
  //       fileSizeKB = (pdfBlob.size / 1024).toFixed(2);
  //     }

  //     // Final compressed download
  //     pdf.save("proposal.pdf");
  //   } catch (error) {
  //     console.error("Error generating compressed PDF:", error);
  //   }
  // };

  // const downloadPDF = async () => {
  //   const input = pagesRef.current;
  //   if (!input) return;

  //   setDownloading(true); // Show loading state
  //   toast.info("📥 Downloading PDF, please wait...");

  //   const pageHeight = 1080 * 0.264583; // ≈ 286 mm
  //   let quality = 1.0; // Highest quality
  //   let scale = 3.0; // Higher scale for ultra clarity
  //   let pdf;
  //   let fileSizeKB = 0;

  //   try {
  //     const firstSection = input.children[0];
  //     if (!firstSection) return;

  //     // Measure width dynamically
  //     const tempCanvas = await html2canvas(firstSection, {
  //       scale,
  //       useCORS: true,
  //     });
  //     const pageWidth = (tempCanvas.width * pageHeight) / tempCanvas.height;

  //     pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);

  //     const options = {
  //       scale,
  //       useCORS: true,
  //       backgroundColor: "#FFFFFF",
  //       logging: false,
  //       windowWidth: input.scrollWidth,
  //       windowHeight: input.scrollHeight,
  //     };

  //     for (let i = 0; i < input.children.length; i++) {
  //       const canvas = await html2canvas(input.children[i], options);
  //       const imgData = canvas.toDataURL("image/png", quality);

  //       if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //       pdf.addImage(
  //         imgData,
  //         "PNG",
  //         0,
  //         0,
  //         pageWidth,
  //         pageHeight,
  //         undefined,
  //         "FAST"
  //       );
  //     }

  //     // Check initial file size
  //     let pdfBlob = pdf.output("blob");
  //     fileSizeKB = (pdfBlob.size / 1024).toFixed(2);

  //     // Optimize file size if needed
  //     while (fileSizeKB > 1000 && scale > 1.0) {
  //       scale -= 0.5;

  //       pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);
  //       for (let i = 0; i < input.children.length; i++) {
  //         const canvas = await html2canvas(input.children[i], { scale });
  //         const imgData = canvas.toDataURL("image/png", quality);
  //         if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //         pdf.addImage(
  //           imgData,
  //           "PNG",
  //           0,
  //           0,
  //           pageWidth,
  //           pageHeight,
  //           undefined,
  //           "FAST"
  //         );
  //       }

  //       pdfBlob = pdf.output("blob");
  //       fileSizeKB = (pdfBlob.size / 1024).toFixed(2);
  //     }

  //     // Save PDF
  //     pdf.save("proposal_high_quality.pdf");

  //     toast.success("✅ PDF Downloaded Successfully!");
  //   } catch (error) {
  //     console.error("Error generating high-quality PDF:", error);
  //     toast.error("❌ Failed to generate PDF. Please try again.");
  //   } finally {
  //     setDownloading(false); // Hide loading state
  //   }
  // };

  // const downloadPDF = async () => {
  //   const input = pagesRef.current;
  //   if (!input) return;

  //   setDownloading(true); // Show loading state
  //   // toast.info("📥 Downloading PDF, please wait...");

  //   const pageHeight = 1080 * 0.264583; // ≈ 286 mm
  //   let quality = 1.0; // Highest quality
  //   let scale = 3.0; // Higher scale for ultra clarity
  //   let pdf;
  //   let fileSizeKB = 0;

  //   try {
  //     const firstSection = input.children[0];
  //     if (!firstSection) return;

  //     // Measure width dynamically
  //     const tempCanvas = await html2canvas(firstSection, {
  //       scale,
  //       useCORS: true,
  //     });
  //     const pageWidth = (tempCanvas.width * pageHeight) / tempCanvas.height;

  //     pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);

  //     const options = {
  //       scale,
  //       useCORS: true,
  //       backgroundColor: "#FFFFFF",
  //       logging: false,
  //       windowWidth: input.scrollWidth,
  //       windowHeight: input.scrollHeight,
  //     };

  //     for (let i = 0; i < input.children.length; i++) {
  //       const canvas = await html2canvas(input.children[i], options);
  //       const imgData = canvas.toDataURL("image/png", quality);

  //       if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //       pdf.addImage(
  //         imgData,
  //         "PNG",
  //         0,
  //         0,
  //         pageWidth,
  //         pageHeight,
  //         undefined,
  //         "FAST"
  //       );
  //     }

  //     // Check initial file size
  //     let pdfBlob = pdf.output("blob");
  //     fileSizeKB = (pdfBlob.size / 1024).toFixed(2);

  //     // Optimize file size if needed
  //     while (fileSizeKB > 1000 && scale > 1.0) {
  //       scale -= 0.5;

  //       pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);
  //       for (let i = 0; i < input.children.length; i++) {
  //         const canvas = await html2canvas(input.children[i], { scale });
  //         const imgData = canvas.toDataURL("image/png", quality);
  //         if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //         pdf.addImage(
  //           imgData,
  //           "PNG",
  //           0,
  //           0,
  //           pageWidth,
  //           pageHeight,
  //           undefined,
  //           "FAST"
  //         );
  //       }

  //       pdfBlob = pdf.output("blob");
  //       fileSizeKB = (pdfBlob.size / 1024).toFixed(2);
  //     }

  //     // Save PDF
  //     pdf.save("proposal_high_quality.pdf");

  //     toast.success("✅ PDF Downloaded Successfully!");
  //   } catch (error) {
  //     console.error("Error generating high-quality PDF:", error);
  //     toast.error("❌ Failed to generate PDF. Please try again.");
  //   } finally {
  //     setDownloading(false); // Hide loading state
  //   }
  // };

  // const downloadPDF = async () => {
  //   const input = pagesRef.current;
  //   if (!input) return;

  //   setDownloading(true); // Show loading state

  //   let quality = 1.0; // Highest quality
  //   let scale = 3.0; // Higher scale for better clarity
  //   let pdf;
  //   let fileSizeKB = 0;

  //   try {
  //     const firstSection = input.children[0];
  //     if (!firstSection) return;

  //     // Measure dimensions dynamically
  //     const tempCanvas = await html2canvas(firstSection, {
  //       scale,
  //       useCORS: true,
  //     });

  //     const pageWidth = tempCanvas.width * 0.264583; // Convert px to mm
  //     const pageHeight = tempCanvas.height * 0.264583; // Convert px to mm

  //     pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);

  //     const options = {
  //       scale,
  //       useCORS: true,
  //       backgroundColor: "#FFFFFF",
  //       logging: false,
  //       windowWidth: input.scrollWidth,
  //       windowHeight: input.scrollHeight,
  //     };

  //     for (let i = 0; i < input.children.length; i++) {
  //       const canvas = await html2canvas(input.children[i], options);
  //       const imgData = canvas.toDataURL("image/png", quality);

  //       if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //       pdf.addImage(
  //         imgData,
  //         "PNG",
  //         0,
  //         0,
  //         pageWidth,
  //         pageHeight,
  //         undefined,
  //         "FAST"
  //       );
  //     }

  //     // Check initial file size
  //     let pdfBlob = pdf.output("blob");
  //     fileSizeKB = (pdfBlob.size / 1024).toFixed(2);

  //     // Optimize file size if needed
  //     while (fileSizeKB > 1000 && scale > 1.0) {
  //       scale -= 0.5;

  //       pdf = new jsPDF("l", "mm", [pageWidth, pageHeight]);
  //       for (let i = 0; i < input.children.length; i++) {
  //         const canvas = await html2canvas(input.children[i], { scale });
  //         const imgData = canvas.toDataURL("image/png", quality);
  //         if (i > 0) pdf.addPage([pageWidth, pageHeight]);
  //         pdf.addImage(
  //           imgData,
  //           "PNG",
  //           0,
  //           0,
  //           pageWidth,
  //           pageHeight,
  //           undefined,
  //           "FAST"
  //         );
  //       }

  //       pdfBlob = pdf.output("blob");
  //       fileSizeKB = (pdfBlob.size / 1024).toFixed(2);
  //     }

  //     // Save PDF
  //     pdf.save("proposal_high_quality.pdf");

  //     toast.success("✅ PDF Downloaded Successfully!");
  //   } catch (error) {
  //     console.error("Error generating high-quality PDF:", error);
  //     toast.error("❌ Failed to generate PDF. Please try again.");
  //   } finally {
  //     setDownloading(false); // Hide loading state
  //   }
  // };

  const downloadPDF = async () => {
    const input = pagesRef.current;
    if (!input) return;

    setDownloading(true);

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

      const companyName = proposal.companyName || "Unknown"; // Handle missing company name
      const safeCompanyName = companyName.replace(/\s+/g, "_"); // Replace spaces with underscores

      const fileName = `proposal_${safeCompanyName}.pdf`;

      // Final compressed download
      pdf.save(fileName);

      toast.success("✅ PDF Downloaded Successfully!");
    } catch (error) {
      console.error("Error generating high-quality PDF:", error);
      toast.error("❌ Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false); // Hide loading state
    }
  };

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(
          `https://proposal-backend-1dom.onrender.com/api/proposals/${id}`
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
      {/* <Script /> */}
      {/* <button
        onClick={downloadPDF}
        disabled={downloading}
        className="download-btn absolute z-10"
      >
        {downloading ? "Downloading..." : "Download PDF"}
      </button> */}
      <button
        onClick={downloadPDF}
        disabled={downloading}
        className="download-btn absolute z-10 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {downloading ? (
          <>
            <i className="bi bi-cloud-download-fill animate-spin"></i>{" "}
            Downloading...
          </>
        ) : (
          "Download PDF"
        )}
      </button>
      <button
        onClick={() => navigate("/dashboard")}
        className="btn btn-close position-absolute top-0 end-0 m-3 absolute z-10"
        aria-label="Close"
      ></button>

      <ToastContainer position="top-right" autoClose={3000} />
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
        <ThankYou proposal={proposal} />
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
