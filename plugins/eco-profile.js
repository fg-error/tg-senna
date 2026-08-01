export default {
help: ["profile", "perfil"],
tags: ["economy"],
command: ["profile", "perfil"],

run: async (ctx) => {
try {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.replyWithHTML(`❌ <b>No estás registrado</b>

Usa <code>/register nombre.edad</code> para registrarte

<i>Ejemplo: /register Juan.25</i>`, { reply_to_message_id: messageId })
return
}

const total = (user.coins || 0) + (user.bank || 0)
const daysRegistered = Math.floor((Date.now() - user.registered) / 86400000)

await ctx.replyWithHTML(`
<pre>━━━━━━━━━━━━━━━━━━</pre>

📝 <b>Nombre:</b> ${user.name}
🎂 <b>Edad:</b> ${user.age || "No especificada"} años
🆔 <b>ID:</b> <code>${user.id}</code>
📅 <b>Registrado:</b> ${new Date(user.registered).toLocaleDateString()}
⏱️ <b>Días:</b> ${daysRegistered} días
⭐ <b>Premium:</b> ${user.premium ? "✅ <b>Sí</b> 🎖️" : "❌ <b>No</b>"}

<pre>━━━━━━━━━━━━━━━━━━</pre>

💰 <b>Economía</b>
🪙 <b>Monedas:</b> ${user.coins || 0}
🏦 <b>Banco:</b> ${user.bank || 0}
💎 <b>Total:</b> ${total}

<pre>━━━━━━━━━━━━━━━━━━</pre>

📊 <b>Estadísticas</b>
📈 <b>Daily:</b> ${user.daily ? new Date(user.daily).toLocaleDateString() : "Nunca"}
📈 <b>Weekly:</b> ${user.weekly ? new Date(user.weekly).toLocaleDateString() : "Nunca"}
📈 <b>Monthly:</b> ${user.monthly ? new Date(user.monthly).toLocaleDateString() : "Nunca"}

<i>💡 Usa /daily, /weekly, /monthly para reclamar tus recompensas</i>`, { reply_to_message_id: messageId })
} catch (error) {
console.error("Error:", error)
await ctx.reply("❌ Error ejecutando comando")
}
}
}