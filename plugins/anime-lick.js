export default {
  help: ["lick"],
  tags: ["anime"],
  command: ["lick"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/4bda625d3d.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/23a545f27a.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/09d5d52abf.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/da16559384.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} lamió a ${target} （＾ω＾）`

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