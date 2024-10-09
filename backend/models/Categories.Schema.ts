import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for type safety
interface Categories extends Document {
  category: string;
}

// Create Mongoose schema
const categoriesSchema = new Schema<Categories>({
  category: String
});

export const Categories = model<Categories>('Categories', categoriesSchema);
