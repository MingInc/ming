import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface RepoContextType {
    repos: Component.Repo[];
    setRepos: React.Dispatch<React.SetStateAction<Component.Repo[]>>;
}

// Create the context
const RepoContext = createContext<RepoContextType | undefined>(undefined);

// Create a provider component
const RepoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [repos, setRepos] = useState<Component.Repo[]>([]);

    return (
        <RepoContext.Provider value={{ repos, setRepos }}>
            {children}
        </RepoContext.Provider>
    );
};

// Custom hook for using the RepoContext
const useRepoContext = () => {
    const context = useContext(RepoContext);
    if (!context) {
        throw new Error('useRepoContext must be used within a RepoProvider');
    }
    return context;
};

export { RepoProvider, useRepoContext };
