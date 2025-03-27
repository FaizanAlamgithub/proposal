import React from "react";

const DeleteAdminAccount = ({ show, handleClose, handleDelete }) => {
  const onConfirmDelete = () => {
    handleDelete(show); // Pass the admin ID stored in show to handleDelete
    handleClose(); // Close the modal after initiating deletion
  };

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
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "400px" }}
        role="document"
        onClick={(e) => e.stopPropagation()}
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
              Are you sure you want to delete this admin account?
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
              onClick={onConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdminAccount;
