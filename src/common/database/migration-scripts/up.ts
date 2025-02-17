import { umzug } from "./umzug";

const up = async () => {
  try {
    await umzug.up();
    console.info(`Migration completed`);
  } catch (error) {
    console.error(`Error migration: ${error}`);
  }
};

up();
