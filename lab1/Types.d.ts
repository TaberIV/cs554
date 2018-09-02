import { v4 } from "uuid/interfaces";

export interface Task {
  id: v4;
  title: string;
  description: string;
  hoursEstimated: number;
  completed: boolean;
  comments: Comment[];
}

export interface Comment {
  id: v4;
  name: string;
  comment: string;
}
