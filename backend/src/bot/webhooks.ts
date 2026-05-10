import type { Request, Response } from "express";
import type { Telegraf } from "telegraf";

export function webhookHandler(bot: Telegraf) {
  return async (req: Request, res: Response) => {
    try {
      await bot.handleUpdate(req.body);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: "Webhook handling failed", details: String(error) });
    }
  };
}
