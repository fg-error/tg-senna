export default {
help: ["daily"],
tags: ["economy"],
command: ["daily"],

run: async (ctx) => {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (!user) {
await ctx.reply("❌ No estás registrado\nUsa /reg <nombre>.<edad> para registrarte", { reply_to_message_id: messageId })
return
}

const now = Date.now()
const lastDaily = user.daily || 0
const cooldown = 86400000

if (now - lastDaily < cooldown) {
const remaining = cooldown - (now - lastDaily)
const hours = Math.floor(remaining / 3600000)
const minutes = Math.floor((remaining % 3600000) / 60000)
await ctx.reply(`⏳ Espera ${hours}h ${minutes}m para reclamar tu recompensa diaria`, { reply_to_message_id: messageId })
return
}

user.daily = now
const reward = Math.floor(Math.random() * 500) + 500
user.coins = (user.coins || 0) + reward

await ctx.reply(`✅ Recibiste ${reward} 🪙 hoy.Vuelve mañana por más.`, { reply_to_message_id: messageId })
}
}