import React from "react";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

const DownloadProposal = ({ proposalId }) => {
  const { backendUrl } = useContext(AppContent);
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/proposals/download/${proposalId}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download proposal");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Proposal_${proposalId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button className="btn btn-success btn-sm" onClick={handleDownload}>
      Download PDF
    </button>
  );
};

export default DownloadProposal;
