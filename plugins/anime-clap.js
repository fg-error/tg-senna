export default {
  help: ["clap"],
  tags: ["anime"],
  command: ["clap"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/2b5bb45998.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/a937dbc61c.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/f8ec47a3f2.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/2181289bb9.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está aplaudiendo por ${target} (୨୧•͈ᴗ•)`

    try {
      await ctx.telegram.sendAnimation(ctx.chat.id, gif, {
        caption,
        reply_to_message_id: messageId
      })
    } catch (e) {
      console.error(e)
      await ctx.reply("Error al enviar animación.", { reply_to_message_id: messageId })
    }
  }
}