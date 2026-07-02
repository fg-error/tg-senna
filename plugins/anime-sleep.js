export default {
  help: ["sleep"],
  tags: ["anime"],
  command: ["sleep"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/e6e04aae5d.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/798f87eef6.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/94a1fd3e7a.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/f3bde98d73.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} esta durmiendo con ${target} (∪。∪)。。。zzz`

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