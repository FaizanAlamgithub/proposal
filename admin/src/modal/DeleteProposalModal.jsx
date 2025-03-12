// import React from "react";

// const DeleteProposalModal = ({ show, handleClose, handleDelete }) => {
//   return (
//     <div
//       className={`modal fade ${
//         show ? "show d-flex align-items-center justify-content-center" : ""
//       }`}
//       tabIndex="-1"
//       style={{
//         backgroundColor: "rgba(0, 0, 0, 0.6)",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         display: show ? "flex" : "none",
//         zIndex: 1050,
//       }}
//     >
//       <div className="modal-dialog" style={{ maxWidth: "400px" }}>
//         <div className="modal-content shadow-lg rounded-4 border-0">
//           <div className="modal-header border-0 p-4">
//             <h5 className="modal-title fw-bold text-danger">Confirm Delete</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={handleClose}
//               style={{ outline: "none" }}
//             ></button>
//           </div>
//           <div className="modal-body text-center px-4">
//             <p className="fs-5 text-muted">
//               Are you sure you want to delete this proposal?
//             </p>
//           </div>
//           <div className="modal-footer border-0 d-flex justify-content-center gap-3 pb-4">
//             <button
//               type="button"
//               className="btn btn-light px-4 py-2 rounded-pill shadow-sm"
//               onClick={handleClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className="btn btn-danger px-4 py-2 rounded-pill shadow-sm"
//               onClick={handleDelete}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteProposalModal;

import React from "react";

const DeleteProposalModal = ({ show, handleClose, handleDelete }) => {
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
      onClick={handleClose} // Close modal when clicking outside the dialog
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "400px" }}
        role="document"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="modal-content shadow-lg rounded border-0">
          <div className="modal-header border-0 p-4">
            <h5 className="modal-title fw-bold text-danger">Confirm Delete</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center px-4">
            <p className="fs-5 text-muted">
              Are you sure you want to delete this proposal?
            </p>
          </div>
          <div className="modal-footer border-0 d-flex justify-content-center gap-3 pb-4">
            <button
              type="button"
              className="btn btn-light px-4 py-2 rounded shadow-sm"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger px-4 py-2 rounded shadow-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProposalModal;
