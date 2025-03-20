import React from "react";

const ExpiredProposalModal = ({ show, handleClose }) => {
  return (
    <div
      className={`modal ${show ? "show d-block" : "fade"}`}
      tabIndex="-1"
      role="dialog"
      aria-hidden={!show}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: show ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
      }}
      onClick={handleClose} // Close modal when clicking outside
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "400px" }}
        role="document"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="modal-content shadow-lg bg-white rounded border-0">
          <div className="modal-header border-0 p-4">
            <h5 className="modal-title fw-bold text-danger">
              Proposal Expired
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center px-4">
            <p className="fs-5 text-muted">
              This proposal has expired. Please contact your manager for further
              assistance.
            </p>
          </div>
          <div className="modal-footer border-0 d-flex justify-content-center pb-4">
            <button
              type="button"
              className="btn btn-dark px-4 py-2 rounded bg-black text-white shadow-sm"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiredProposalModal;
