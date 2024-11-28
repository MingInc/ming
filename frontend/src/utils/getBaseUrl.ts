export const getApiBaseUrl = (): string => {
  const origin = window.location.origin; // Get the current origin dynamically

  console.log("origin :", origin);
  if (origin === "http://localhost:5173") {
    return "http://localhost:5173";
  } else if (origin === "https://0web.minginc.xyz") {
    return "https://0web.minginc.xyz";
  } else if (origin === "https://0web.vercel.app") {
    return "https://0web.vercel.app";
  } else {
    return "http://localhost:5173";
  }
};

