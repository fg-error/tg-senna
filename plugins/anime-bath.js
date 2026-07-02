export default {
  help: ["bath"],
  tags: ["anime"],
  command: ["bath"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/6295b8c041.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/38a2241162.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/3fb9740eef.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/e748493aa9.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está bañando a ${target} ٩(ˊᗜˋ )و`

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