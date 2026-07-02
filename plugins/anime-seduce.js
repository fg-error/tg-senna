export default {
  help: ["seduce"],
  tags: ["anime"],
  command: ["seduce"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/2b807d2dcb.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/3589bac0f0.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/b8a758e1f4.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/27b396925f.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} esta seduciendo a ${target} ( ͡° ͜ʖ ͡)`

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