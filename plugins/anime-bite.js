export default {
  help: ["bite"],
  tags: ["anime"],
  command: ["bite"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/4140bc2f28.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/b04fc17494.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/63bb388035.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/56aebcb2ea.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} mordió a ${target} ≽^•⩊•^≼`

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