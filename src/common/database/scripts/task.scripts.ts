import Task from "../schemas/task.schema";

export const createTasks = async () => {
  try {
    const tasksCount = 100;

    for (let i = 0; tasksCount > i; i++) {
      await Task.create({
        name: `task_${i}`,
        intervalSeconds: i === 0 ? 10 : i * 10,
      });
    }
    console.log(`Test tasks created`);
  } catch {}
};
