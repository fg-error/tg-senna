export default {
  help: ["bored"],
  tags: ["anime"],
  command: ["bored"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/d1437c05a6.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/55f668ef05.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/9e5482e641.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/b27a530165.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está aburrido/a de ${target} ( ¬_¬)`

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