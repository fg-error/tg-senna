export default {
help: ["unreg"],
tags: ["economy"],
command: ["unreg"],

run: async (ctx) => {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado\nUsa /reg <nombre>.<edad> para registrarte", { reply_to_message_id: messageId })
return
}

const { Markup } = require("telegraf")

await ctx.reply(`⚠️ *¿Estás seguro de eliminar tu cuenta?*

📝 Nombre: ${user.name}
🎂 Edad: ${user.age || "No especificada"} años
🪙 Monedas: ${user.coins || 0}
🏦 Banco: ${user.bank || 0}

❌ *Esta acción no se puede deshacer*`, {
reply_to_message_id: messageId,
...Markup.inlineKeyboard([
[Markup.button.callback("✅ Sí, eliminar", "unreg_confirm")],
[Markup.button.callback("❌ Cancelar", "unreg_cancel")]
])
})
}
}