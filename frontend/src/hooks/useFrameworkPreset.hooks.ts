import { useEffect, useState } from "react";

export const useFrameworkPreset = (scripts: string) => {
  const [frameworkPreset, setFrameworkPreset] = useState("");

  console.log("scripts ", JSON.parse(scripts));
  const parsedScriptsData = JSON.parse(scripts);
  useEffect(() => {
    console.log(parsedScriptsData?.scripts?.build?.includes("next"));
    if (parsedScriptsData?.scripts?.build?.includes("next")) {
      setFrameworkPreset("Next.js");
    } else if (parsedScriptsData?.scripts?.build?.includes("vite")) {
      setFrameworkPreset("Vite");
    } else {
      setFrameworkPreset("Unknown Framework");
    }
    // if (packageJsonData.dependencies && packageJsonData.dependencies["next"]) {
    //   setFrameworkPreset("Next.js");
    // }
  }, [parsedScriptsData?.scripts?.build]);

  return frameworkPreset;
};
