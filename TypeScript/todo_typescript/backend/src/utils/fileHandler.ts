import fs from "fs/promises";
import path from "path";

const filePath = path.join(__dirname, "../data/todos.json");

export async function readTodosFromFile() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeTodosToFile(todos: any[]) {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
}
