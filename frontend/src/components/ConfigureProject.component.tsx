import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { decryptData } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function ConfigureProject() {
  const [repos, setRepos] = useState<[] | Component.Repo[]>([]);
  const navigate = useNavigate()
  console.log("repos :", repos);

  useEffect(() => {
    const encryptedRepos = localStorage.getItem("ming_github_user_repos");
    const exactRepos = encryptedRepos?.replace(/"/g, "");
    if (exactRepos) {
      const decryptedRepos = decryptData(exactRepos);
      const reposArray = JSON.parse(decryptedRepos);
      setRepos(reposArray);
    }
  }, []);

  return (
    <div className="w-full p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Import Git Repository</h2>
      <div className="flex gap-2 mb-4">
        <Select>
          <SelectTrigger className="w-[180px] border-gray-700">
            <SelectValue placeholder="surajgaire14" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="surajgaire14">surajgaire14</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-grow">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 border-gray-700 text-white"
          />
        </div>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {repos?.map((repo) => {
          console.log(repo)
          const parsedDate: Date = new Date(repo.updated_at);
          const now: Date = new Date();
          const timeDifference: number = now.getTime() - parsedDate.getTime();
          const daysAgo: number = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24)
          );

          const handleImportClick = () => {
            const repoSrcUrl = repo.html_url
            const projectName = repo.name
            const fullName = repo.full_name
            navigate(`/new?s=${encodeURIComponent(repoSrcUrl)}&name=${projectName}&fullname=${fullName}`)
            
          }
          return (
            <div
              key={repo.name}
              className="flex items-center justify-between p-2 rounded"
            >
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded">
                  {/* {repo?.owner?.avatar_url} */}
                </span>
                <span>{repo.name}</span>
                <span className="text-xs text-gray-400">
                  {daysAgo} days ago
                </span>
              </div>
              <Button variant="secondary" size="sm" onClick={handleImportClick}>
                Import
              </Button>
            </div>
          );
        })}
      </div>
      <a href="#" className="block mt-4 text-sm text-gray-400 hover:text-white">
        Import Third-Party Git Repository →
      </a>
    </div>
  );
}
