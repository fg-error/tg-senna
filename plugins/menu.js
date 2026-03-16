export default {

help: ["help"],
tags: ["main"],
command: ["menu","help","menú"],

run: async (ctx, { conn, usedPrefix }) => {

let tags = {
  main: 'ACERCA DE',
  dl: 'DESCARGAS'
}

let plugins = Object.values(global.plugins)

let categorias = {}

for (let plugin of plugins) {

if (!plugin.help || !plugin.tags) continue

for (let tag of plugin.tags) {

if (!categorias[tag]) categorias[tag] = []

for (let help of plugin.help) {
categorias[tag].push(help)
}

}

}

let text = `
◈ ━━━━━ SENNA ━━━━━ ◈

⚙️ Plugins: ${plugins.length}

Grupo: ${global.fg_group}
Canal: ${global.fg_canal}

≡ LISTA DE MENUS
`

for (let tag in tags) {

if (!categorias[tag]) continue

text += `\n┌─⊷ ${tags[tag]} \n`

for (let cmd of categorias[tag]) {
text += `▢ ${usedPrefix}${cmd}\n`
}

text += `└───────────\n`

}

//---
let pp = './src/fg_logo.jpg'
await conn.replyWithPhoto(
{ source: pp },
{ caption: text }
)
//conn.reply(text)

}

}