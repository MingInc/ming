declare namespace Component {
  // Define the type for a GitHub repository
  interface Repo {
    id: number;
    name: string;
    html_url: string;
    owner: {
      avatar_url: string;
    };
    updated_at: string;
    full_name: string;

  }
}
