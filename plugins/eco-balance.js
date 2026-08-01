export default {
help: ["bal", "balance", "coins"],
tags: ["economy"],
command: ["bal", "balance", "coins"],

run: async (ctx) => {
try {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.replyWithHTML(`❌ <b>No estás registrado</b>

Usa <code>/reg nombre.edad</code> para registrarte

<i>Ejemplo: /register Juan.25</i>`, { reply_to_message_id: messageId })
return
}

const total = (user.coins || 0) + (user.bank || 0)
const daysRegistered = Math.floor((Date.now() - user.registered) / 86400000)

let rank = ""
if (total > 10000) rank = "👑 <b>Rey</b>"
else if (total > 5000) rank = "⭐ <b>Millonario</b>"
else if (total > 2000) rank = "💎 <b>Rico</b>"
else if (total > 1000) rank = "💰 <b>Clase media</b>"
else if (total > 500) rank = "🪙 <b>Pobre</b>"
else rank = "🧹 <b>Mendigo</b>"

await ctx.replyWithHTML(`
<pre>━━━━━━━━━━━━━━━━━━</pre>
🪙 <b>Monedas:</b> ${user.coins || 0}
🏦 <b>Banco:</b> ${user.bank || 0}
💎 <b>Total:</b> ${total}
<pre>━━━━━━━━━━━━━━━━━━</pre>
`, { reply_to_message_id: messageId })
} catch (error) {
console.error("Error en balance:", error)
await ctx.reply("❌ Error ejecutando comando")
}
}
}