export default {
  help: ["cry"],
  tags: ["anime"],
  command: ["cry"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/b79fce84d5.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/dd26822d9a.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/c54fc328de.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/2c4c1039ae.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está llorando por ${target} (╥_╥)`

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