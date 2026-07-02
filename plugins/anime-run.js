export default {
  help: ["run"],
  tags: ["anime"],
  command: ["run"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/5f2e7ffa77.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/fefcbdcc80.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/f25ab9250c.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/10e625a814.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} esta huyendo de ${target} (❛-❛)`

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