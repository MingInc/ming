// import { useState } from "react";

// interface PostResponse<T> {
//   data: T | null;
//   error: string | null;
//   loading: boolean;
// }

// interface usePostResult<T, U> extends PostResponse<T> {
//   postRequest: () => Promise<void>;
// }

// function usePost<T, U>(
//   url: string,
//   body: U,
//   options?: RequestInit
// ): usePostResult<T, U> {
//   const [data, setData] = useState<T | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const postRequest = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...options?.headers, // Merge any additional headers passed in options
//         },
//         body: JSON.stringify(body),
//         ...options, // Include other options (like mode, credentials, etc.)
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result: T = await response.json();
//       setData(result);
//     } catch (error) {
//       setError((error as Error).message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, error, loading, postRequest };
// }

// export default usePost;
