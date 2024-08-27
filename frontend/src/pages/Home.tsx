import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem('ming_authenticated_user') || '{}')
    if (_user.email) return navigate("/dashboard");
  }, []);

  return <div className="container mx-auto max-w-[7xl]">This is Home</div>;
}
