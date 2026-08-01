export default {
help: ["bal", "balance"],
tags: ["economy"],
command: ["bal", "balance"],

run: async (ctx) => {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado\nUsa /register <nombre>.<edad> para registrarte", { reply_to_message_id: messageId })
return
}

await ctx.reply(`💰 *Balance de ${user.name}*

🪙 Monedas: ${user.coins || 0}
🏦 Banco: ${user.bank || 0}
💎 Total: ${(user.coins || 0) + (user.bank || 0)}`, { reply_to_message_id: messageId })
}
}