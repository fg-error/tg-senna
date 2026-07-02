export default {
  help: ["facepalm"],
  tags: ["anime"],
  command: ["facepalm"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/51bb8762ac.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/1c49c203b9.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/0906825871.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/1a6c762666.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} se da una palmada en la cara por las estupideces de ${target} (ভ_ ভ) ރ`

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