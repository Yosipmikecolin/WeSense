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

/** ---------------------------------------------------------------- */

const AwardeeRecepcionSchema = new mongoose.Schema(
  {
    caseNumber: String,
    receptionDate: Date,
    documentType: String,
    documentContent: String,
  },
  { timestamps: true }
);

export const AwardeeRecepcion =
  mongoose.models.AwardeeRecepcion ||
  mongoose.model("AwardeeRecepcion", AwardeeRecepcionSchema);

/** ----------------------------------------------------------- */

const AwardeeInstalacionSchema = new mongoose.Schema(
  {
    deviceStatus: String,
    installationLocation: String,
    deviceType: String,
    serialNumber: String,
    installationDate: Date,
  },
  { timestamps: true }
);

export const AwardeeInstalacion =
  mongoose.models.AwardeeInstalacion ||
  mongoose.model("AwardeeInstalacion", AwardeeInstalacionSchema);

/** ------------------------------------------------------------ */

const AwardeeResolucionSchema = new mongoose.Schema(
  {
    resolutionNumber: String,
    issuanceDate: Date,
    resolutionType: String,
    resolutionContent: String,
    implementationStatus: String,
  },
  { timestamps: true }
);

export const AwardeeResolucion =
  mongoose.models.AwardeeResolucion ||
  mongoose.model("AwardeeResolucion", AwardeeResolucionSchema);

/** ---------------------------------------------------------- */

const AwardeeAlarmasSchema = new mongoose.Schema(
  {
    alarmId: String,
    alarmDateTime: Date,
    alarmType: String,
    alarmDescription: String,
    actionTaken: String,
    resolutionStatus: String,
  },
  { timestamps: true }
);

export const AwardeeAlarmas =
  mongoose.models.AwardeeAlarmas ||
  mongoose.model("AwardeeAlarmas", AwardeeAlarmasSchema);

/** ------------------------------------------------------------ */

const AwardeeSoporteSchema = new mongoose.Schema(
  {
    ticket: String,
    opening_date: Date,
    type_error: String,
    description_error: String,
    taken_action: String,
    state: String,
  },
  { timestamps: true }
);

export const AwardeeSoporte =
  mongoose.models.AwardeeSoporte ||
  mongoose.model("AwardeeSoporte", AwardeeSoporteSchema);

/** ------------------------------------------------------------- */

const AwardeeDesactivacionSchema = new mongoose.Schema(
  {
    id_device: String,
    desactivation_date: Date,
    cause_desactivation: String,
    state: String,
    observations: String,
  },
  { timestamps: true }
);

export const AwardeeDesactivacion =
  mongoose.models.AwardeeDesactivacion ||
  mongoose.model("AwardeeDesactivacion", AwardeeDesactivacionSchema);
