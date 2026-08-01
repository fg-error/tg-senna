export default {
help: ["register", "reg"],
tags: ["economy"],
command: ["register", "reg"],

run: async (ctx, { args }) => {
const user = global.db.users[ctx.from.id]
if (user) {
await ctx.reply("✅ Ya estás registrado!")
return
}

const input = args.join(" ")
if (!input) {
await ctx.reply("❌ Usa: /register <nombre>.<edad>\nEjemplo: /register Juan.25")
return
}

const parts = input.split(".")
if (parts.length !== 2) {
await ctx.reply("❌ Formato incorrecto\nUsa: /register <nombre>.<edad>\nEjemplo: /register Juan.25")
return
}

const name = parts[0].trim()
const age = parseInt(parts[1].trim())

if (!name || !age || isNaN(age) || age < 1 || age > 120) {
await ctx.reply("❌ Datos inválidos\nNombre: texto\nEdad: número entre 1-120")
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

await ctx.reply(`✅ *Registro completado!*

🎉 Bienvenido ${name}

📝 Nombre: ${name}
🎂 Edad: ${age} años
🪙 Recibiste 100 monedas
💰 Balance: 100 🪙
🏦 Banco: 0 🪙
`)
}
}