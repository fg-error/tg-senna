export default {
help: ["unregister", "unreg"],
tags: ["economy"],
command: ["unregister", "unreg"],

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
},

callback: async (ctx) => {
const data = ctx.callbackQuery?.data

if (data === "unreg_confirm") {
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado")
return
}

delete global.db.users[ctx.from.id]
await ctx.reply("✅ *Cuenta eliminada correctamente*\n\n🔹 Tus datos han sido borrados\n🔹 Puedes volver a registrarte con /reg\n\n¡Gracias por usar la bot!")
await ctx.deleteMessage()
return
}

if (data === "unreg_cancel") {
await ctx.reply("❌ Eliminación cancelada")
await ctx.deleteMessage()
return
}
}
}