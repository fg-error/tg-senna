export default {
  help: ["pout"],
  tags: ["anime"],
  command: ["pout"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/6b3524f151.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/22f694c285.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/5bfca56869.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/91c2aac9e3.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está haciendo pucheros a ${target} ('⌒')`

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