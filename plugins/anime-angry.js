export default {
  help: ["angry"],
  tags: ["anime"],
  command: ["angry"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/b3fdb76c39.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/be96ac752d.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/2f63e591be.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/712040c297.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está enojado/a con ${target} 凸ಠ益ಠ)凸`

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