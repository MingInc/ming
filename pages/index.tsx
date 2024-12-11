import Link from "next/link";
import Layout from "../components/Layout";
import { useState } from "react";

const IndexPage = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Success! You are subscribed.");
        setEmail("");
      } else {
        setMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <Layout title="Coming Soon - Ming Open Web Headquarters">
      <div className="relative z-10 py-3 space-y-5 lg:space-y-15 text-gray-900">
        <div className="text-center space-y-8">
          <h3 className="font-semibold text-xl tracking-wider">
            Ming Open Web Headquarters, Canada
          </h3>
          <h1 className="text-5xl lg:text-5xl font-extrabold">
            We’re tailoring to fit your dApp needs. 🏗️
          </h1>
          <p className="text-xl lg:text-xl tracking-wide mx-10 lg:max-w-xl lg:mx-auto">
            We`re going live on January 1st, 2025. Keep in touch for exciting
            offers!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative z-10 mx-10 lg:max-w-xl lg:mx-auto"
        >
          <input
            type="text"
            placeholder="lexy@minginc.xyz"
            className="w-full text-xl font-light text-gray-900 placeholder-gray-500 py-3 pl-5 pr-36 lg:pr-44 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute top-1 right-1 bottom-1 px-4 lg:px-5 text-lg font-semibold bg-gray-900 text-white rounded-xl transition ease-in-out duration-500 hover:bg-red-500"
          >
            Notify me
          </button>
        </form>
        {message && (
          <p
            className="text-center"
            style={{
              marginTop: "16px",
            }}
          >
            🏝️ {message}
          </p>
        )}
      </div>
      <div className="absolute bottom-5">
        <ul className="flex space-x-3">
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 transition ease-in-out duration-500 hover:bg-red-500 hover:text-white hover:shadow-lg"
            >
              <i className="ri-telegram-2-line text-2xl"></i>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 transition ease-in-out duration-500 hover:bg-red-500 hover:text-white hover:shadow-lg"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 transition ease-in-out duration-500 hover:bg-red-500 hover:text-white hover:shadow-lg"
            >
              <i className="text-2xl ri-github-fill"></i>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 transition ease-in-out duration-500 hover:bg-red-500 hover:text-white hover:shadow-lg"
            >
              <i className="text-2xl ri-linkedin-box-fill"></i>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default IndexPage;
