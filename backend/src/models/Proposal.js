const mongoose = require("mongoose");

const ScopeOfWorkSchema = new mongoose.Schema({
  title: { type: String },
  objective: { type: String },
  services: [{ type: String }],
  description: [{ type: String }],
});

const TimelineDeliverySchema = new mongoose.Schema({
  week: [
    {
      week1: { type: Number },
      week2: { type: Number },
    },
  ],
  task: { type: String },
  deliverables: { type: String },
});

const ProposedSchema = new mongoose.Schema({
  services: { type: String },
  description: { type: String },
  cost: { type: Number },
});

const ProposalSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    clientName: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    proposalDescription: { type: String, required: true },
    clientId: { type: String, required: true },
    proposalPassword: { type: String, required: true },
    isAccepted: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    scopeOfWork: ScopeOfWorkSchema, // Embed ScopeOfWork inside Proposal
    timelineDeliverables: [TimelineDeliverySchema],
    timelineWeeks: {
      startWeek: { type: Number, required: true }, // Example: 1
      endWeek: { type: Number, required: true }, // Example: 7
    },
    proposedInvestment: [ProposedSchema],
    proposedCost: { type: Number },
    payments: [
      {
        terms: { type: String },
        amount: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", ProposalSchema);
