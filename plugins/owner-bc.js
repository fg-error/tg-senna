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

    let content = text || ctx.message?.caption || null
    const replyMsg = ctx.message?.reply_to_message

    if (!content && !replyMsg) {
      return ctx.reply("⚠️ Debes escribir un mensaje.", { reply_to_message_id: messageId })
    }

    const users = Object.keys(global.db.users || {})
    if (!users.length) {
      return ctx.reply("⚠️ No hay usuarios en la base de datos.", { reply_to_message_id: messageId })
    }

    let sent = 0
    for (let id of users) {
      try {
        if (replyMsg) {
          await ctx.telegram.copyMessage(id, ctx.chat.id, replyMsg.message_id)
        }
        if (content) {
          await ctx.telegram.sendMessage(id, content)
        }
        sent++
      } catch (e) {
        console.error("❌ Error enviando a", id, e.message)
      }
    }

    await ctx.reply(`✅ Enviado a ${sent} usuarios.`, { reply_to_message_id: messageId })
  }
}