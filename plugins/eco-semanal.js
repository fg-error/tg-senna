export default {
help: ["weekly", "semanal"],
tags: ["economy"],
command: ["weekly", "semanal"],

run: async (ctx) => {
try {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.replyWithHTML(`❌ <b>No estás registrado</b>
Usa <code>/register nombre.edad</code>`, { reply_to_message_id: messageId })
return
}

const now = Date.now()
const lastWeekly = user.weekly || 0
const cooldown = 604800000

if (now - lastWeekly < cooldown) {
const remaining = cooldown - (now - lastWeekly)
const days = Math.floor(remaining / 86400000)
const hours = Math.floor((remaining % 86400000) / 3600000)
await ctx.replyWithHTML(`⏳ <b>Weekly</b>
<pre>━━━━━━━━━━━━</pre>
⏱️ ${days}d ${hours}h
<pre>━━━━━━━━━━━━</pre>`, { reply_to_message_id: messageId })
return
}

user.weekly = now
const reward = Math.floor(Math.random() * 2000) + 2000
user.coins = (user.coins || 0) + reward

await ctx.replyWithHTML(`⭐ <b>Weekly</b>
<pre>━━━━━━━━━━━━</pre>
✅ +${reward} 🪙
💰 ${user.coins} 🪙
<pre>━━━━━━━━━━━━</pre>`, { reply_to_message_id: messageId })
} catch (error) {
console.error("Error en weekly:", error)
await ctx.reply("❌ Error ejecutando comando")
}
}
}