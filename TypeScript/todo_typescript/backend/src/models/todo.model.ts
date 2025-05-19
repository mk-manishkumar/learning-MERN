import type { Todo as TodoType } from "../types/todo";

export class Todo implements TodoType {
  constructor(public id: string, public text: string) {}
}
