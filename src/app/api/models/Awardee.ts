import mongoose from "mongoose";

const AwardeeProcessSchema = new mongoose.Schema(
  {
    date: String,
    type_law: String,
    rit: String,
    ruc: String,
    run: String,
    document: String,
    date_limit: String,
    type_resolution: String,
    status: { type: String, default: "Sin estado" },
    denied_note: String,
    approved_note: String,
    resolution: {},
  },
  { timestamps: true }
);

export const AwardeeProcess =
  mongoose.models.AwardeeProcess ||
  mongoose.model("AwardeeProcess", AwardeeProcessSchema);
/** ------------------------------------------------------------------ */
const AwardeeSchema = new mongoose.Schema(
  {
    type: String,
    date: Date,
    note: String,
    user: String,
  },
  { timestamps: true }
);

export const Awardee =
  mongoose.models.Awardee || mongoose.model("Awardee", AwardeeSchema);

/** ---------------------------------------------------------------- */
