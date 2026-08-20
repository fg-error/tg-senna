export default {
  help: ["bc"],
  tags: ["owner"],
  command: ["bc"],

  run: async (ctx, { text }) => {
    const messageId = ctx.message?.message_id
    const senderId = String(ctx.from?.id)

    if (!global.ownerID.includes(senderId)) {
      return ctx.reply("⛔ No tienes permisos para usar este comando.", { reply_to_message_id: messageId })
    }

    let content = text || (ctx.message?.caption) || null
    if (!content && !ctx.message?.reply_to_message) {
      return ctx.reply("⚠️ Debes escribir un mensaje.", { reply_to_message_id: messageId })
    }

    await ctx.reply(`📢 Enviando aviso a ${Object.keys(global.db.users).length} usuarios...`, { reply_to_message_id: messageId })

    let sent = 0
    for (let id of Object.keys(global.db.users)) {
      try {
        if (ctx.message?.reply_to_message) {
          await ctx.copyMessage(id, ctx.chat.id, ctx.message.reply_to_message.message_id)
        } else {
          await ctx.sendMessage(id, { text: content })
        }
        sent++
      } catch (e) {
        console.error("❌ Error enviando a", id, e.message)
      }
    }

    await ctx.reply(`✅ Enviado a ${sent} usuarios.`, { reply_to_message_id: messageId })
  }
}