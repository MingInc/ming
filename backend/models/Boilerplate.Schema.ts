import { Schema, model, Document } from "mongoose";

// Define TypeScript interface for type safety
interface Boilerplate extends Document {
  id: string;
  title: string;
  titleDescription: string;
  description: string;
  category: string;
  githubUrl?: string;
  framework?: string;
  image: string;
}

/**
 * Mongoose schema for a boilerplate.
 * This schema defines the structure of a boilerplate document in the database,
 * which could be used to represent a project template or boilerplate repository.
 */
// Create Mongoose schema
const boilerplateSchema = new Schema<Boilerplate>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  titleDescription: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  githubUrl: { type: String, default: "" },
  framework: { type: String, default: "" },
  image: { type: String, required: true },
});

export const Boilerplate = model<Boilerplate>("Boilerplate", boilerplateSchema);
