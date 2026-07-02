export default {
  help: ["sad"],
  tags: ["anime"],
  command: ["sad"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/1db59a2438.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/1db492db24.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/56dd412254.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/4c53e50d39.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está triste por ${target} （︶︿︶）`

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