import { IOwner } from "./owner";

export interface IComment {
  body_markdown: string;
  owner: IOwner;
  creation_date: Date;
}
