import { umzug } from "./umzug";

const down = async () => {
  try {
    await umzug.down();
    console.info(`Rollback completed`);
  } catch (error) {
    console.error(`Error rollback: ${error}`);
  }
};

down();
