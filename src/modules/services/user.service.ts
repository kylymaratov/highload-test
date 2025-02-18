import User from "@/common/database/schemas/user.schema";
import { ServerError } from "@/common/server/server.exception";
import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";

export class UserService {
  constructor() {}

  async updateBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, amount } = req.body;

      const doAmount = Number(amount);

      if (isNaN(doAmount)) throw new ServerError("Amount field is NaN", 400);

      const [affectedRows, updatedUsers] = await User.update(
        { balance: Sequelize.literal(`balance + ${doAmount}`) },
        {
          where: {
            id: userId,
            balance: { [Op.gte]: -doAmount },
          },
          returning: true,
        }
      );

      if (affectedRows === 0)
        throw new ServerError("Insufficient funds or user not found", 400);

      res.json({ userId, balance: updatedUsers[0].balance });
    } catch (error) {
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
