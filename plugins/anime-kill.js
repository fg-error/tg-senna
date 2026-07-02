export default {
  help: ["kill"],
  tags: ["anime"],
  command: ["kill"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/02c521383b.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/94a522d0bd.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/44d02783f3.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/196ae9d291.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} mato a ${target} ( ⚆ _ ⚆ )"`

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