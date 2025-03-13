// import React, { useEffect } from "react";
// import Proposal from "../../pages/Proposal";
// import TableOfContent from "../../pages/TableOfContent";
// import HelloClient from "../../pages/HelloClient";
// import Introduction from "../../pages/Introduction";
// import WhyWorkWithUs from "../../pages/WhyWorkWithUs";
// import ScopeOfWork from "../../pages/ScopeOfWork";
// import WorkDetails from "../../pages/ScopeOfWorkDetails/WorkDetails";
// import { useNavigate } from "react-router-dom";
// import TimelineDelivery from "../../pages/ScopeOfWorkDetails/TimelineDelivery";
// import ProposedInvestment from "../../pages/ScopeOfWorkDetails/ProposedInvestment";
// import PaymentTerms from "../../pages/ScopeOfWorkDetails/PaymentTerms";
// import NextSteps from "../../pages/ScopeOfWorkDetails/NextSteps";

// function AllPages({ proposal }) {
//   const navigate = useNavigate();

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

//   useEffect(() => {
//     if (!proposal) {
//       navigate("/client-login");
//       console.log(proposal);
//     } else {
//       console.log("Proposal Data:", proposal);
//     }
//   }, [proposal, navigate]);

//   return (
//     <>
//       <Script />
//       <div className="horizontal-slide">
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

// export default AllPages;

import React, { useEffect, useRef, useState } from "react";
import Proposal from "../../pages/Proposal";
import TableOfContent from "../../pages/TableOfContent";
import HelloClient from "../../pages/HelloClient";
import Introduction from "../../pages/Introduction";
import WhyWorkWithUs from "../../pages/WhyWorkWithUs";
import ScopeOfWork from "../../pages/ScopeOfWork";
import WorkDetails from "../../pages/ScopeOfWorkDetails/WorkDetails";
import { useNavigate } from "react-router-dom";
import TimelineDelivery from "../../pages/ScopeOfWorkDetails/TimelineDelivery";
import ProposedInvestment from "../../pages/ScopeOfWorkDetails/ProposedInvestment";
import PaymentTerms from "../../pages/ScopeOfWorkDetails/PaymentTerms";
import NextSteps from "../../pages/ScopeOfWorkDetails/NextSteps";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

function AllPages({ proposal }) {
  const navigate = useNavigate();
  const pagesRef = useRef(null);

  const Script = () => {
    useEffect(() => {
      window.addEventListener("scroll", () => {
        console.log(`Horizontal Scroll Position: ${window.scrollX}`);
      });

      // const container = document.querySelector(".horizontal-slide");
      // const scrollLine = document.querySelector(".line-bar");
      // const sections = document.querySelectorAll(".box");
      // const [prevBtn, nextBtn] = document.querySelectorAll(".prev, .next");

      // if (
      //   !container ||
      //   !scrollLine ||
      //   !prevBtn ||
      //   !nextBtn ||
      //   sections.length === 0
      // )
      //   return;

      // let currentIndex = 0;

      // const scrollToIndex = (index) => {
      //   if (index < 0 || index >= sections.length) return;
      //   currentIndex = index;
      //   container.scrollTo({
      //     left: sections[index].offsetLeft,
      //     behavior: "smooth",
      //   });
      //   updateScrollLine();
      // };

      // const updateScrollLine = () => {
      //   scrollLine.style.width = `${
      //     (container.scrollLeft /
      //       (container.scrollWidth - container.clientWidth)) *
      //     100
      //   }%`;
      // };

      // const handleScroll = () => {
      //   let closestIndex = [...sections].reduce(
      //     (closest, section, index) =>
      //       Math.abs(container.scrollLeft - section.offsetLeft) <
      //       Math.abs(container.scrollLeft - sections[closest].offsetLeft)
      //         ? index
      //         : closest,
      //     0
      //   );
      //   console.log(currentIndex);
      //   currentIndex = closestIndex;
      //   updateScrollLine();
      // };

      // container.addEventListener("scroll", handleScroll);

      // const handlePrevClick = () => scrollToIndex(currentIndex - 1);
      // const handleNextClick = () => scrollToIndex(currentIndex + 1);

      // prevBtn.addEventListener("click", handlePrevClick);
      // nextBtn.addEventListener("click", handleNextClick);

      // return () => {
      //   container.removeEventListener("scroll", handleScroll);
      //   prevBtn.removeEventListener("click", handlePrevClick);
      //   nextBtn.removeEventListener("click", handleNextClick);
      // };

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

      const scrollAmount = container.clientWidth; // Scroll one full section width
      let currentIndex = 0;

      const updateScrollLine = () => {
        const progress =
          (container.scrollLeft /
            (container.scrollWidth - container.clientWidth)) *
          100;
        scrollLine.style.width = `${progress}%`;
      };

      const scrollLeft = () => {
        if (currentIndex <= 0) return; // Prevent overscrolling
        currentIndex--;
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      };

      const scrollRight = () => {
        if (currentIndex >= sections.length - 1) return; // Prevent overscrolling
        currentIndex++;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      };

      container.addEventListener("scroll", updateScrollLine);
      prevBtn.addEventListener("click", scrollLeft);
      nextBtn.addEventListener("click", scrollRight);

      // Initial update
      updateScrollLine();

      return () => {
        container.removeEventListener("scroll", updateScrollLine);
        prevBtn.removeEventListener("click", scrollLeft);
        nextBtn.removeEventListener("click", scrollRight);
      };
    }, []);

    return null;
  };

  useEffect(() => {
    if (!proposal) {
      navigate("/client-login");
      console.log(proposal);
    } else {
      console.log("Proposal Data:", proposal);
    }
  }, [proposal, navigate]);

  // const downloadPDF = async () => {
  //   const input = pagesRef.current;
  //   if (!input) return;

  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const scale = 2; // Higher scale for better quality
  //   const options = {
  //     scale: scale,
  //     useCORS: true, // Ensure cross-origin images load correctly
  //   };

  //   // Convert each page to an image and add it to the PDF
  //   const sections = input.children;
  //   for (let i = 0; i < sections.length; i++) {
  //     const canvas = await html2canvas(sections[i], options);
  //     const imgData = canvas.toDataURL("image/png");
  //     const imgWidth = 210; // A4 width in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     if (i > 0) pdf.addPage();
  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //   }

  //   pdf.save("proposal.pdf");
  // };

  return (
    <>
      <Script />
      {/* <button onClick={downloadPDF} className="download-btn">
        Download PDF
      </button> */}
      <div className="horizontal-slide px-3" ref={pagesRef}>
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
        <NextSteps proposal={proposal} />
      </div>
      {/* <div className="slider">
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
      </div> */}
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

export default AllPages;

// import React, { useEffect, useRef } from "react";
// import Proposal from "../../pages/Proposal";
// import TableOfContent from "../../pages/TableOfContent";
// import HelloClient from "../../pages/HelloClient";
// import Introduction from "../../pages/Introduction";
// import WhyWorkWithUs from "../../pages/WhyWorkWithUs";
// import ScopeOfWork from "../../pages/ScopeOfWork";
// import WorkDetails from "../../pages/ScopeOfWorkDetails/WorkDetails";
// import { useNavigate } from "react-router-dom";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

// function AllPages({ proposal }) {
//   const navigate = useNavigate();
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

//   useEffect(() => {
//     if (!proposal) {
//       navigate("/");
//       console.log(proposal);
//     } else {
//       console.log("Proposal Data:", proposal);
//     }
//   }, [proposal, navigate]);

//   const handleDownloadPDF = async () => {
//     const input = pagesRef.current;
//     if (!input) {
//       console.error("Pages reference is missing!");
//       return;
//     }

//     const canvas = await html2canvas(input, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4"); // Portrait mode, A4 size
//     const imgWidth = 210; // A4 width in mm
//     const pageHeight = 297; // A4 height in mm
//     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale the height to maintain aspect ratio

//     let heightLeft = imgHeight;
//     let position = 0;

//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }

//     pdf.save("proposal.pdf"); // Downloads the PDF file
//   };

//   return (
//     <>
//       <Script />
//       <div ref={pagesRef} className="horizontal-slide">
//         <Proposal proposal={proposal} />
//         <TableOfContent proposal={proposal} />
//         <HelloClient proposal={proposal} />
//         <Introduction proposal={proposal} />
//         <WhyWorkWithUs proposal={proposal} />
//         <ScopeOfWork proposal={proposal} />
//         <WorkDetails proposal={proposal} />
//       </div>
//       {/* Download Button */}
//       <button className="btn btn-primary mt-3" onClick={handleDownloadPDF}>
//         Download PDF
//       </button>
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

// export default AllPages;
