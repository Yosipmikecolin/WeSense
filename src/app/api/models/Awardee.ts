import mongoose from "mongoose";

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
