export default {
help: ["register", "reg"],
tags: ["economy"],
command: ["register", "reg"],

run: async (ctx, { args }) => {
try {
const messageId = ctx.message?.message_id
const user = global.db.users[ctx.from.id]
if (user) {
await ctx.replyWithHTML(`✅ <b>Ya estás registrado!</b>

<i>Tu cuenta está activa</i>`, { reply_to_message_id: messageId })
return
}

const input = args.join(" ")
if (!input) {
await ctx.replyWithHTML(`❌ <b>Formato incorrecto</b>

Usa: <code>/register nombre.edad</code>
Ejemplo: <code>/reg Juan.25</code>`, { reply_to_message_id: messageId })
return
}

const parts = input.split(".")
if (parts.length !== 2) {
await ctx.replyWithHTML(`❌ <b>Formato incorrecto</b>

Usa: <code>/register nombre.edad</code>
Ejemplo: <code>/register Juan.25</code>

<i>No uses espacios entre nombre y edad</i>`, { reply_to_message_id: messageId })
return
}

const name = parts[0].trim()
const age = parseInt(parts[1].trim())

if (!name || !age || isNaN(age) || age < 1 || age > 120) {
await ctx.replyWithHTML(`❌ <b>Datos inválidos</b>

📝 <b>Nombre:</b> Texto sin espacios
🎂 <b>Edad:</b> Número entre 1-120

Ejemplo: <code>/register Maria.30</code>`, { reply_to_message_id: messageId })
return
}

global.db.users[ctx.from.id] = {
id: ctx.from.id,
name: name,
username: ctx.from.username ? "@" + ctx.from.username : "",
premium: false,
registered: Date.now(),
coins: 100,
bank: 0,
daily: 0,
weekly: 0,
monthly: 0,
lastWork: 0,
lastRob: 0,
age: age
}

await ctx.replyWithHTML(`✅ <b>Registro completado!</b>

🎉 <b>Bienvenido ${name}</b>

📝 <b>Nombre:</b> ${name}
🎂 <b>Edad:</b> ${age} años
🪙 <b>Recibiste:</b> 100 monedas
💰 <b>Balance:</b> 100 🪙
🏦 <b>Banco:</b> 0 🪙

<i>Usa /help para ver los comandos disponibles</i>`, { reply_to_message_id: messageId })
} catch (error) {
console.error("Error en register:", error)
await ctx.reply("❌ Error ejecutando comando")
}
}
}