import { sequelize } from "@/common/database/database";
import User from "@/common/database/schemas/user.schema";
import { ServerError } from "@/common/server/server.exception";
import { NextFunction, Request, Response } from "express";

export class UserService {
  constructor() {}

  async updateBalance(req: Request, res: Response, next: NextFunction) {
    const updateTransaction = await sequelize.transaction();
    try {
      const { userId, amount } = req.body;

      const doAmount = Number(amount);

      if (isNaN(doAmount)) throw new ServerError("Amount field is NaN", 400);

      const user = await User.findOne({
        where: { id: userId },
        lock: true,
        transaction: updateTransaction,
      });

      if (!user) throw new ServerError("User not found in database", 404);

      if (user.balance + doAmount < 0)
        throw new ServerError("The balance cannot be below zero", 400);

      user.balance += doAmount;

      await user.save({ transaction: updateTransaction });

      await updateTransaction.commit();

      res.json({ userId: user.id, balance: user.balance });
    } catch (error) {
      await updateTransaction.rollback();
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
