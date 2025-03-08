const express = require("express");
const {
  createProposal,
  getProposals,
  getProposalById,
  updateProposal,
  deleteProposal,
  clientLogin,
  acceptProposal,
} = require("../controllers/proposalController");

const router = express.Router();

router.post("/proposals/create", createProposal); // Create a proposal
router.get("/proposals", getProposals); // Get all proposals
router.get("/proposals/:id", getProposalById); // Get a proposal by ID
router.put("/proposals/edit/:id", updateProposal); // Update a proposal
router.delete("/proposals/delete/:id", deleteProposal); // Delete a proposal
router.post("/proposals/login", clientLogin); // Client login using proposal password
router.put("/proposals/accept/:id", acceptProposal);

router.get("/download/:id", async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const doc = new PDFDocument();
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Proposal_${proposal._id}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);
    doc.fontSize(20).text("Proposal Details", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Proposal ID: ${proposal._id}`);
    doc.text(`Company Name: ${proposal.companyName}`);
    doc.text(`Client Name: ${proposal.clientName}`);
    doc.text(`Created At: ${new Date(proposal.createdAt).toDateString()}`);
    doc.text(`Expiry Date: ${new Date(proposal.expiryDate).toDateString()}`);

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Error generating PDF" });
  }
});

module.exports = router;
