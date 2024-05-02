import { IOwner } from "../components/PostCreationInfo";

import { IComment } from "./comment";

export interface IAnswer {
  answer_id: number;
  index: number;
  body_markdown: string;
  is_accepted: boolean;
  owner: IOwner;
  creation_date: Date;
  link: string;
  up_vote_count: number;
  comments: IComment[];
}
