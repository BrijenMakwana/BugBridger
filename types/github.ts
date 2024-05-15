interface IGitRepo {
  id: number;
  name: string;
  description: string;
  topics: string[];
  html_url: string;
}

export { IGitRepo };
