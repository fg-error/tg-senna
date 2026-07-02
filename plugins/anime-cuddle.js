export default {
  help: ["cuddle"],
  tags: ["anime"],
  command: ["cuddle"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/0613060e12.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/2e0a770c30.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/324999251a.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/3e5d93c849.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} se acurrucó con ${target} ꒰ঌ(˶ˆᗜˆ˵)໒꒱`

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