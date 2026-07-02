export default {
  help: ["slap"],
  tags: ["anime"],
  command: ["slap"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/4fcbb04a12.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/e4c1ac962d.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/e890d1fc39.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/54d9a5a3ac.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} golpeó a ${target} ٩(͡๏̯͡๏`

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