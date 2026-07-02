export default {
  help: ["blush"],
  tags: ["anime"],
  command: ["blush"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/27e2b1104b.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/f02931cc79.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/a9fca1e6a2.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/0292d63bbc.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} se sonrojo por ${target} ( ˶o˶˶o˶)!`

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