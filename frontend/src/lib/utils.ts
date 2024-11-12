import CryptoJS from "crypto-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SECRET_KEY = "your-secret-key"; // Use a secure key in a real application

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData.toString(), SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  if (!decryptedData) {
    throw new Error("Decryption failed. Invalid encrypted data.");
  }
  return decryptedData;
};
