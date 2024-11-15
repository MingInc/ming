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
import { useNavigate } from "react-router-dom";
import {
  useAuth,
  useDebounce,
  useRepositories,
} from "@/hooks";
import { useState } from "react";

export default function ConfigureProject() {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { repos } = useRepositories(authState?.user?.id);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filterRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Import Git Repository</h2>
      <div className="flex gap-2 mb-4">
        <Select>
          <SelectTrigger className="w-[180px] border-gray-700">
            <SelectValue placeholder={authState.user.login} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={authState.user.login as string}>{authState.user.login}</SelectItem>
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
            className="pl-8 border-gray-700 text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filterRepos.length > 0 &&
          filterRepos?.map((repo) => {
            const parsedDate: Date = new Date(repo.updated_at);
            const now: Date = new Date();
            const timeDifference: number = now.getTime() - parsedDate.getTime();
            const daysAgo: number = Math.floor(
              timeDifference / (1000 * 60 * 60 * 24)
            );

            const handleImportClick = () => {
              const repoSrcUrl = repo.html_url;
              const fullName = repo.full_name;
              const owner = repo.owner.login;
              const defaultBranch = repo.default_branch;
              const name = repo.name;
              navigate(
                `/new?s=${encodeURIComponent(
                  repoSrcUrl
                )}&name=${name}&fullname=${fullName}&owner=${owner}&default_branch=${defaultBranch}`
              );
            };
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
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleImportClick}
                >
                  Import
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
