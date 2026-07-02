export default {
  help: ["love"],
  tags: ["anime"],
  command: ["love"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/fec823db8b.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/73329b64c9.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/6a788cf7a2.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/8113b2774c.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está enamorado/a de ${target} ʕ•̫͡•ʔ♡ʕ•̫͡•`

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