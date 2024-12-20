import { IAnswer } from "./answer";
import { IComment } from "./comment";
import { IOwner } from "./owner";

export interface IQuestion {
  question_id: number;
  title: string;
  is_answered: boolean;
  body_markdown: string;
  tags: string[];
  score: number;
  view_count: number;
  answer_count: number;
  up_vote_count: number;
  owner: IOwner;
  creation_date: number;
  link: string;
  notice: IPostNotice;
  answers: IAnswer[];
  comments: IComment[];
}

export interface IPostNotice {
  body: string;
}
