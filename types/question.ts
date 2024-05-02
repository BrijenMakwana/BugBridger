import { IOwner } from "../components/PostCreationInfo";
import { IPostNotice } from "../components/PostNotice";

import { IAnswer } from "./answer";
import { IComment } from "./comment";

export interface IQuestion {
  question_id: number;
  title: string;
  is_answered: boolean;
  body_markdown: string;
  tags: string[];
  score: number;
  view_count: number;
  answer_count: number;
  owner: IOwner;
  creation_date: Date;
  link: string;
  notice: IPostNotice;
  answers: IAnswer[];
  comments: IComment[];
}
