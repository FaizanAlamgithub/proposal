import React from "react";

function Pdf({ onDownloadPDF }) {
  return (
    <div>
      <h3>PDF Section</h3>
      <button className="btn btn-primary mt-3" onClick={onDownloadPDF}>
        Download PDF
      </button>
    </div>
  );
}

export default Pdf;
