import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminPanel() {

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Panel - Proposals</h2>
      <button className="btn btn-secondary mb-3">
      </button>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Company Name</th>
            <th>Client Name</th>
            <th>Expiry Date</th>
            <th>Proposal ID</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal._id}>
              <td>proposal.companyName</td>
              <td>{proposal.clientName}</td>
              <td>{new Date(proposal.expiryDate).toDateString()}</td>
              <td>{proposal._id}</td>
              <td>{adminView ? proposal.proposalPassword : "*****"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
