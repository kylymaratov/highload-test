import User from "../schemas/user.schema";

export const createUser = async () => {
  try {
    await User.create({ balance: 10000 });

    console.info(`User created`);
  } catch (error) {
    console.error(`Failed create user: ${error}`);
  }
};
