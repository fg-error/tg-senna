export default {

command: ["start"],

run: async (ctx, { conn, usedPrefix }) => {

conn.reply(`
📜 Hola estamos de prueba
  
Owner ${global.owner}
${usedPrefix}help  para ver el menu del bot
`)

}

}