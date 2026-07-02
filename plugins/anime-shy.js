export default {
  help: ["shy"],
  tags: ["anime"],
  command: ["shy"],

  run: async (ctx) => {
    const messageId = ctx.message?.message_id
    const user = ctx.message?.from?.first_name || "Usuario"
    const target = ctx.message?.reply_to_message?.from?.first_name || "alguien"

    const gifs = [
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/6b8e063062.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/db06acbd0f.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/97fdab3b08.mp4",
     "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Anime/34de85c05d.mp4"
    ]

    const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const caption = `${user} está  tímido/a por ${target} Σ(￣。￣ノ)ノ`

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