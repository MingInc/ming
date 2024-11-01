import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase.config";

const useAuthProvider = () => {
  const [providers, setProviders] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const providerData = user.providerData.map(
          (provider) => provider.providerId
        );
        setProviders(providerData);
      } else {
        setProviders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return providers;
};

export default useAuthProvider;
