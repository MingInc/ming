import { getFrameworkInfo } from "@/services/github.services";
import { useState, useEffect } from "react";

interface Script {
  name: string;
}

export const useFrameworkPreset = (
  scripts: Script[],
  owner: string | null,
  repo: string
) => {
  const [frameworkPreset, setFrameworkPreset] = useState("");

  useEffect(() => {
    // Ensure scripts is an array
    if (!Array.isArray(scripts)) {
      console.error("Expected 'scripts' to be an array");
      return;
    }

    const jsonFiles = ["package.json", "composer.json"];
    let presetFound = false;

    for (const script of scripts) {
      if (
        script.name === "next.config.js" ||
        script.name === "next.config.ts"
      ) {
        setFrameworkPreset("Next.js");
        presetFound = true;
        break; // Exit loop if found
      }
      if (
        script.name === "vite.config.js" ||
        script.name === "vite.config.ts"
      ) {
        setFrameworkPreset("Vite");
        presetFound = true;
        break; // Exit loop if found
      }
    }

    if (!presetFound) {
      // If no 'next.config.js' or 'next.config.ts' found, set to the first json file
      const jsonFile = jsonFiles.find((file) =>
        scripts.some((script) => script.name === file)
      );
      if (jsonFile) {
        async function getFrameworkContens() {
          const data = await getFrameworkInfo(owner, repo, jsonFile!);
          const jsonData = JSON.parse(data?.data);
          console.log("package json contents :", jsonData);
          for (const key in jsonData) {
            if (key === "scripts" && jsonData[key]) {
              for (const scriptName in jsonData[key]) {
                const scriptCommand = jsonData[key][scriptName];

                if (scriptCommand.includes("next")) {
                  setFrameworkPreset("Next.js");
                } else if (scriptCommand.includes("vite")) {
                  setFrameworkPreset("Vite");
                } else {
                  setFrameworkPreset("Unknown Framework");
                }
              }
            }
          }
        }
        getFrameworkContens();
        // setFrameworkPreset(jsonFile);
      }
    }
  }, [scripts]);

  return frameworkPreset;
};
