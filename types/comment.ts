import { IOwner } from "../components/PostCreationInfo";

export interface IComment {
  body_markdown: string;
  owner: IOwner;
  creation_date: Date;
}
