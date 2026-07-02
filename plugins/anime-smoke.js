export default {
  help: ["smoke"],
  tags: ["anime"],
  command: ["smoke"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/58fa4809a2.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/721adf16f3.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/9535cb9a55.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/6b238024da.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está fumando con ${target} ╰(◣﹏◢)╯`

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