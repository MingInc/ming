import * as mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userUid: { type: String },
    projectUid: { type: String },
    projectName: { type: String },
    githubUrl: { type: String },
    projectFramework: { type: String },
    rootDirectory: { type: String },
    buildCommand: { type: String },
    outputDirectory: { type: String },
    installCommand: { type: String },
    envVariables: { type: String },
    projectDeploymentData: {
      projectDeploymentLog: { type: Array },
      buildStatus: { type: String },
      buildUrl: { type: String },
      buildTime: { type: String },
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    methods: {
      getBuildData() {
        return this.projectDeploymentData;
      },
    },
  }
);

export type Project = mongoose.InferSchemaType<typeof projectSchema>;
export const Project = mongoose.model("Project", projectSchema);
