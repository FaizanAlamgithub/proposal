// const mongoose = require("mongoose");

// const proposalSchema = new mongoose.Schema(
//   {
//     companyName: { type: String, required: true },
//     clientName: { type: String, required: true },
//     expiryDate: { type: Date, required: true },
//     description: { type: String, required: true },
//     clientId: { type: String, unique: true, required: true },
//     proposalPassword: { type: String, required: true },
//     createdDate: { type: Date, default: Date.now },
//     isAccepted: { type: Boolean, default: false }, // false = pending, true = accepted
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Proposal", proposalSchema);

// const mongoose = require("mongoose");

// const proposalSchema = new mongoose.Schema(
//   {
//     companyName: { type: String, required: true },
//     clientName: { type: String, required: true },
//     expiryDate: { type: Date, required: true },
//     proposalDescription: { type: String, required: true },
//     clientId: { type: String, unique: true, required: true },
//     proposalPassword: { type: String, required: true },
//     createdDate: { type: Date, default: Date.now },
//     isAccepted: { type: Boolean, default: false }, // false = pending, true = accepted
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Proposal", proposalSchema);

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
    timelineDeliverables: TimelineDeliverySchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", ProposalSchema);
