export default async function handler(ctx) {

let text = null
let m = null

console.log("📩 UPDATE RECIBIDO")

// MENSAJE NORMAL
if (ctx.message) {

m = ctx.message
text = m.text

console.log("💬 Mensaje:", text)

}

// BOTÓN
if (ctx.callbackQuery) {

m = ctx.callbackQuery.message
text = ctx.callbackQuery.data

console.log("🔘 Botón presionado:", text)

// quitar loading del botón
await ctx.answerCbQuery()

}

if (!text) {
console.log("⚠️ No hay texto")
return
}

let prefix = global.PREFIX || "/"

console.log("🔤 Prefix:", prefix)

// si viene con prefix
if (text.startsWith(prefix)) {

text = text.slice(prefix.length)

console.log("✂️ Texto sin prefix:", text)

}

let args = text.trim().split(/ +/)
let command = args.shift().toLowerCase()

console.log("⚙️ Comando detectado:", command)
console.log("📦 Args:", args)

for (let name in global.plugins) {

let plugin = global.plugins[name]

if (!plugin.command) continue

console.log("🔎 Revisando plugin:", name)

if (plugin.command.includes(command)) {

console.log("✅ Plugin encontrado:", name)

try {

await plugin.run(ctx, {
conn: ctx,
args,
command,
text: args.join(" "),
usedPrefix: prefix
})

console.log("🚀 Plugin ejecutado:", name)

} catch (e) {

console.log("❌ Error en plugin:", name)
console.log(e)

ctx.reply("❌ Error ejecutando comando")

}

}

}

}