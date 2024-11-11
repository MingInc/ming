declare namespace Request {
  // Define the type for a GitHub repository
  interface CustomRequest {
    userId?: string;
    role?: string;
    url?: {
      pathname: string;
    };
  }
}
