interface IGitRepo {
  id: number;
  name: string;
  description: string;
  topics: string[];
  html_url: string;
}

interface IContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export { IContributor, IGitRepo };
