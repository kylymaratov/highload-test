import fs from "fs";
import path from "path";

const getCurrentTimestamp = (): string => {
  const now = new Date();
  return now
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);
};

const createMigrationFile = (migrationName: string): void => {
  const timestamp = getCurrentTimestamp();
  const fileName = `${timestamp}-${migrationName}.ts`;

  const migrationContent = `
  import { QueryInterface, DataTypes } from 'sequelize';

  export const up = async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable('', {});
  };

  export const down = async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('');
  } ;
`;

  const migrationsDir = path.join(__dirname, "../migrations");

  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir);
  }

  fs.writeFileSync(
    path.join(migrationsDir, fileName),
    migrationContent,
    "utf8"
  );
  console.info(`Migration file created: ${fileName}`);
};

const migrationName = process.argv[2];

if (!migrationName) {
  process.exit(1);
}

createMigrationFile(migrationName);
