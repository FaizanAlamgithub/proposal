import React, { useState, useEffect, useContext } from "react";
import DeleteProposalModal from "../modal/DeleteProposalModal";
import { ToastContainer, toast } from "react-toastify";
import { Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

function Archived({ downloadPDF }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const { backendUrl } = useContext(AppContent);

  const navigate = useNavigate();

  useEffect(() => {
    fetchArchivedProposals();
  }, []);

  // Fetch Archived Proposals
  const fetchArchivedProposals = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/proposals/archived`);
      if (!response.ok) throw new Error("Failed to fetch archived proposals");

      const data = await response.json();
      setProposals(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching archived proposals:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Unarchive Proposal Function
  // const unarchiveProposal = async (proposalId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/proposals/unarchive/${proposalId}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     if (!response.ok) throw new Error("Failed to unarchive proposal");

  //     // Remove unarchived proposal from the list
  //     setProposals((prevProposals) =>
  //       prevProposals.filter((p) => p._id !== proposalId)
  //     );
  //   } catch (error) {
  //     console.error("Error unarchiving proposal:", error);
  //     setError(error.message);
  //   }
  // };

  // Handle copy action
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Open Delete Modal
  const openDeleteModal = (id) => {
    setSelectedProposalId(id);
    setShowDeleteModal(true);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setSelectedProposalId(null);
    setShowDeleteModal(false);
  };

  // Delete proposal
  const handleDelete = async () => {
    if (!selectedProposalId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${backendUrl}/api/proposals/delete/${selectedProposalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete proposal");

      toast.success("Proposal deleted successfully");
      setProposals((prev) => prev.filter((p) => p._id !== selectedProposalId));
      closeDeleteModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Archived Proposals</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : proposals.length === 0 ? (
        <div className="absolute top-[40%] left-[40%]">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full">
            <p className="text-lg font-semibold text-gray-600">
              No archived proposals found.
            </p>
          </div>
        </div>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Company Name</th>
              <th>Client Name</th>
              <th>Created Date</th>
              <th>Expiry Date</th>
              <th>Client ID</th>
              <th>Access Proposal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {proposals.length > 0 ? (
              proposals.map((proposal) => (
                <tr key={proposal._id}>
                  <td>{proposal.companyName}</td>
                  <td>{proposal.clientName}</td>
                  <td>
                    {proposal.createdAt
                      ? new Date(proposal.createdAt).toDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {proposal.expiryDate
                      ? new Date(proposal.expiryDate).toDateString()
                      : "N/A"}
                  </td>
                  <td>{proposal._id}</td>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <p style={{ cursor: "pointer", color: "blue", margin: 0 }}>
                      {proposal.proposalPassword}
                    </p>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <Copy
                        size={18}
                        style={{ cursor: "pointer", color: "gray" }}
                        onClick={() =>
                          handleCopy(proposal.proposalPassword, proposal._id)
                        }
                      />
                      {copiedId === proposal._id && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "25px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "black",
                            color: "white",
                            padding: "5px 8px",
                            fontSize: "12px",
                            borderRadius: "5px",
                            whiteSpace: "nowrap",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                            opacity: 1,
                            transition: "opacity 0.3s ease-in-out",
                          }}
                        >
                          Copied!
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/edit-proposal/${proposal._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => openDeleteModal(proposal._id)}
                    >
                      Delete
                    </button>
                    {/* <button
                      onClick={() => unarchiveProposal(proposal._id)}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Unarchive
                    </button> */}
                    <button
                      onClick={() => downloadPDF(proposal._id)}
                      className="btn btn-success btn-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No proposals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <ToastContainer />
      <DeleteProposalModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>

    // DEMO Archive
    // <div className="container">
    //   <h2>Archived Proposals</h2>
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : error ? (
    //     <p>Error: {error}</p>
    //   ) : proposals.length === 0 ? (
    //     <p>No archived proposals found.</p>
    //   ) : (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>Company Name</th>
    //           <th>Client Name</th>
    //           <th>Expiry Date</th>
    //           <th>Description</th>
    //           <th>Cost</th>
    //           <th>Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {proposals.map((proposal) => (
    //           <tr key={proposal._id}>
    //             <td>{proposal.companyName}</td>
    //             <td>{proposal.clientName}</td>
    //             <td>{new Date(proposal.expiryDate).toLocaleDateString()}</td>
    //             <td>{proposal.proposalDescription}</td>
    //             <td>${proposal.proposedCost}</td>
    //             <td>
    //               <button onClick={() => handleUnarchive(proposal._id)}>
    //                 Unarchive
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
  );
}

export default Archived;
