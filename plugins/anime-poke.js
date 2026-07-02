export default {
  help: ["poke"],
  tags: ["anime"],
  command: ["poke"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/263affc4c2.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/cf47db1dce.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/76f2bcce0c.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/93b5135827.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} picó a ${target} ↖(^o^)↗`

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