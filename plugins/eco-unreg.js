export default {
help: ["unreg"],
tags: ["profile"],
command: ["unreg"],

run: async (ctx) => {
try {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado\nUsa /reg nombre.edad para registrarte", { reply_to_message_id: messageId })
return
}

delete global.db.users[ctx.from.id]

await ctx.replyWithHTML(`✅ <b>Cuenta eliminada correctamente</b>

🔹 Tus datos han sido borrados
🔹 Puedes volver a registrarte con /reg nombre.edad

<i>¡Gracias por usar el bot!</i>`, { reply_to_message_id: messageId })
} catch (error) {
console.error("Error en unregister:", error)
await ctx.reply("❌ Error ejecutando comando")
}
}
}