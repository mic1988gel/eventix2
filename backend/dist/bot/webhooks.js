export function webhookHandler(bot) {
    return async (req, res) => {
        try {
            await bot.handleUpdate(req.body);
            res.sendStatus(200);
        }
        catch (error) {
            res.status(500).json({ error: "Webhook handling failed", details: String(error) });
        }
    };
}
