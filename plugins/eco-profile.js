export default {
help: ["profile", "perfil"],
tags: ["economy"],
command: ["profile", "perfil"],

run: async (ctx) => {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado\nUsa /reg <nombre>.<edad> para registrarte", { reply_to_message_id: messageId })
return
}

await ctx.reply(`👤 *Perfil de ${user.name}*

📝 Nombre: ${user.name}
🎂 Edad: ${user.age || "No especificada"} años
🆔 ID: ${user.id}
📅 Registrado: ${new Date(user.registered).toLocaleDateString()}
⭐ Premium: ${user.premium ? "✅ Sí" : "❌ No"}

💰 **Economía**
🪙 Monedas: ${user.coins || 0}
🏦 Banco: ${user.bank || 0}
💎 Total: ${(user.coins || 0) + (user.bank || 0)}`, { reply_to_message_id: messageId })
}
}