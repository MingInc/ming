import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for type safety
interface Boilerplate extends Document {
  id: string;
  title: string;
  description: string;
  category: string;
  githubUrl?: string;
  framework?: string;
  image: string;
}

// Create Mongoose schema
const boilerplateSchema = new Schema<Boilerplate>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  githubUrl: { type: String, default: "" },
  framework: { type: String, default: "" },
  image: { type: String, required: true },
});

export const Boilerplate = model<Boilerplate>('Boilerplate', boilerplateSchema);
