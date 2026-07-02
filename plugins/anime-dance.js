export default {
  help: ["dance"],
  tags: ["anime"],
  command: ["dance"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/3a2b027ee7.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/7ea032e20f.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/be8392dd68.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/7ece5ac35b.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está bailando con ${target} (ﾉ^ヮ^)ﾉ*:・ﾟ✧`

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