import "./config.js"
import "./lib/database.js"
import { loadUser, loadGroup } from "./lib/loadDatabase.js"

import { Telegraf } from "telegraf"
import fs from "fs"
import chalk from "chalk"
import cfonts from 'cfonts'

const bot = new Telegraf(global.BOT_TOKEN)

global.plugins = {}
global.commandCount = 0

const pluginFolder = "./plugins"

/* ========= MESSAGE LOG ========= */

function printMessageLog(ctx, text) {

let sender = ctx.from?.username || ctx.from?.first_name || "Unknown"
let chatName = ctx.chat?.title || ""
let chatType = ctx.chat?.type || "private"
let me = ctx.botInfo?.username || "BOT"

let contextIcon = "💬"
let contextLabel = "Privado"

if (chatType === "group" || chatType === "supergroup") {
contextIcon = "👥"
contextLabel = "Grupo"
}

if (chatType === "channel") {
contextIcon = "📢"
contextLabel = "Canal"
}

let isCommand = text.startsWith(global.PREFIX)

let niceType = isCommand ? "COMMAND" : "CHAT"

let messageColor = isCommand
? chalk.green.bold(text)
: chalk.white(text)

console.log(`
${chalk.hex('#FE0041').bold('╭━━━〔 MESSAGE LOG 〕━━━⬣')}
🤖 ${chalk.cyan(me)}
⏰ ${chalk.black(chalk.bgGreen(
new Date().toLocaleTimeString('es-ES',{timeZone:'America/Argentina/Buenos_Aires'})
))}
📦 ${chalk.black(chalk.bgYellow(niceType))}
👤 ${chalk.redBright(sender)}
📍 ${contextIcon} ${chalk.green(contextLabel)}${chatName ? ' ~ ' + chalk.cyan(chatName) : ''}
💬 ${messageColor}
${chalk.hex('#FE0041').bold('╰━━━━━━━━━━━━━━━━━━━━⬣')}
`.trim())

}

/* ========= PLUGIN LOADER ========= */

async function loadPlugin(file) {

if (!file.endsWith(".js")) return

try {

const module = await import(`./plugins/${file}?update=${Date.now()}`)

const plugin = module.default || module

if (!plugin) {
console.log(chalk.red("⚠ Plugin vacío →"), file)
return
}

global.plugins[file] = plugin

console.log(
chalk.green("✔ Plugin cargado →"),
chalk.yellow(file)
)

} catch (e) {

console.log(
chalk.red("✖ Error en plugin →"),
file
)

console.log(e)

}

}

function loadPlugins() {

const files = fs.readdirSync(pluginFolder)

for (const file of files) {
loadPlugin(file)
}

}

loadPlugins()

/* ========= HOT RELOAD ========= */

fs.watch(pluginFolder, (event, file) => {

if (!file || !file.endsWith(".js")) return

console.log(
chalk.blue("🔄 Plugin actualizado →"),
chalk.yellow(file)
)

loadPlugin(file)

})

/* ========= MAIN HANDLER ========= */

async function runPlugins(ctx, text) {

if (!text) return

printMessageLog(ctx, text)

let isCommand = text.startsWith(global.PREFIX)

if (!isCommand) return

let start = Date.now()

let args = text.slice(global.PREFIX.length).trim().split(/ +/)
let command = args.shift()?.toLowerCase()

for (let name in global.plugins) {

let plugin = global.plugins[name]

if (!plugin) continue
if (!plugin.command) continue
if (!plugin.run) continue

if (plugin.command.includes(command)) {

try {

await plugin.run(ctx, {
conn: ctx,
args,
command,
text: args.join(" "),
usedPrefix: global.PREFIX
})

let time = Date.now() - start

console.log(
chalk.magenta("PLUGIN →"),
name,
chalk.blue("TIEMPO →"),
time + "ms"
)

global.commandCount++

} catch (e) {

console.log(chalk.red("❌ Error en plugin:"), name)
console.log(e)

ctx.reply("❌ Error ejecutando comando")

}

}

}

}

/* ========= MESSAGE EVENT ========= */
bot.on(["message","channel_post"], async (ctx) => {

let text =
ctx.message?.text ||
ctx.channelPost?.text

if (!text) return

runPlugins(ctx, text)

})
/* ========= BUTTON EVENT ========= */

bot.on("callback_query", async (ctx) => {

let data = ctx.callbackQuery?.data

console.log("🔘 BOTÓN PRESIONADO →", data)

await ctx.answerCbQuery()

runPlugins(ctx, data)

})

/* ========= ERROR ========= */

bot.catch(err => {
console.log(chalk.red("❌ Error Telegram:"), err)
})

/* ========= START ========= */

bot.launch()

//--
const { say } = cfonts

say('Senna FG', {
  font: 'pallet',
  align: 'center',
  gradient: ['red', 'magenta']
})

say('senna-bot By FG Ig: @fg.error', {
  font: 'console',
  align: 'center',
  gradient: ['cyan', 'magenta']
})