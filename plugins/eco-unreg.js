export default {
help: ["unreg"],
tags: ["economy"],
command: ["unreg"],

run: async (ctx) => {
try {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado\nUsa /reg <nombre>.<edad> para registrarte", { reply_to_message_id: messageId })
return
}

await ctx.replyWithHTML(`⚠️ <b>¿Estás seguro de eliminar tu cuenta?</b>

📝 <b>Nombre:</b> ${user.name}
🎂 <b>Edad:</b> ${user.age || "No especificada"} años
🪙 <b>Monedas:</b> ${user.coins || 0}
🏦 <b>Banco:</b> ${user.bank || 0}

❌ <i>Esta acción no se puede deshacer</i>`, {
reply_to_message_id: messageId,
reply_markup: {
inline_keyboard: [
[
{ text: "✅ Sí, eliminar", callback_data: "unreg_confirm" },
{ text: "❌ Cancelar", callback_data: "unreg_cancel" }
]
]
}
})
} catch (error) {
console.error("Error en unregister:", error)
await ctx.reply("❌ Error ejecutando comando")
}
},

callback: async (ctx) => {
try {
await ctx.answerCbQuery()
const data = ctx.callbackQuery?.data

if (data === "unreg_confirm") {
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado")
return
}

delete global.db.users[ctx.from.id]
await ctx.replyWithHTML(`✅ <b>Cuenta eliminada correctamente</b>

🔹 Tus datos han sido borrados
🔹 Puedes volver a registrarte con /register

<i>¡Gracias por usar el bot!</i>`)
await ctx.deleteMessage()
return
}

if (data === "unreg_cancel") {
await ctx.replyWithHTML(`❌ <b>Eliminación cancelada</b>

<i>Tu cuenta está a salvo</i>`)
await ctx.deleteMessage()
return
}
} catch (error) {
console.error("Error en callback unregister:", error)
await ctx.reply("❌ Error ejecutando comando")
}
}
}