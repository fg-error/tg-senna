export default {

command: ["tes"],

run: async (ctx) => {

let chat = ctx.chat
let user = ctx.from

let txt = `
👤 Usuario
ID: ${user.id}
Usuario: @${user.username || "sin username"}

💬 Chat
Tipo: ${chat.type}
ID: ${chat.id}
Nombre: ${chat.title || "Privado"}
`

ctx.reply(txt)

}

}