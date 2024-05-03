import { IComment } from "./comment";
import { IOwner } from "./owner";

export interface IAnswer {
  answer_id: number;
  index: number;
  body_markdown: string;
  is_accepted: boolean;
  owner: IOwner;
  creation_date: number;
  link: string;
  up_vote_count: number;
  comments: IComment[];
}
