export default {
  help: ["eat"],
  tags: ["anime"],
  command: ["eat"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/ee941f7baf.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/6083d8f12a.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/a58d888a58.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/bba920bb2d.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está comiendo con ${target} (っ˘ڡ˘ς)`

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