export default {
  help: ["laugh"],
  tags: ["anime"],
  command: ["laugh"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/2f3731235f.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/b112780a5a.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/e08d760e5a.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/c86e858e9d.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} se esta riendo de ${target} (≧▽≦)`

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