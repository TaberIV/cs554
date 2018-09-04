export interface Task {
  _id: string;
  title: string;
  description: string;
  hoursEstimated: number;
  completed: boolean;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  name: string;
  comment: string;
}
