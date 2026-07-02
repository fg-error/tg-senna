export default {
  help: ["happy"],
  tags: ["anime"],
  command: ["happy"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/8c35ee09a4.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/78b56befb8.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/a9cfe8c25d.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/57f55bf8df.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está feliz por ${target}  ٩(˶ˆᗜˆ˵)و`

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