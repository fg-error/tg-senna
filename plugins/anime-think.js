export default {
  help: ["think"],
  tags: ["anime"],
  command: ["think"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/be310f02b3.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/f35004c537.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/aa04882cf0.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/7f567b121c.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está pensando en ${target} (⸝⸝╸-╺⸝⸝)`

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