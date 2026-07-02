export default {
  help: ["bleh"],
  tags: ["anime"],
  command: ["bleh"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/006ba5556a.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/8370ebb329.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/e0862f6761.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/7fe38d833c.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} le sacó la lengua a ${target} (｡╹ω╹｡)`

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