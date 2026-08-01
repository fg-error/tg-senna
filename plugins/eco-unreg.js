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

await ctx.reply(`⚠️ *¿Estás seguro de eliminar tu cuenta?*

📝 Nombre: ${user.name}
🎂 Edad: ${user.age || "No especificada"} años
🪙 Monedas: ${user.coins || 0}
🏦 Banco: ${user.bank || 0}

❌ *Esta acción no se puede deshacer*`, {
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
const data = ctx.callbackQuery?.data

if (data === "unreg_confirm") {
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado")
return
}

delete global.db.users[ctx.from.id]
await ctx.reply("✅ *Cuenta eliminada correctamente*\n\n🔹 Tus datos han sido borrados\n🔹 Puedes volver a registrarte con /register\n\n¡Gracias por usar el bot!")
await ctx.deleteMessage()
return
}

if (data === "unreg_cancel") {
await ctx.reply("❌ Eliminación cancelada")
await ctx.deleteMessage()
return
}
} catch (error) {
console.error("Error en callback unregister:", error)
await ctx.reply("❌ Error ejecutando comando")
}
}
}