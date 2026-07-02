export default {
  help: ["punch"],
  tags: ["anime"],
  command: ["punch"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/f53f89c8d5.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/2a13d90ed4.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/8ed0a8dc87.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/01be60a41e.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} 666666 ${target} 88888888`

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