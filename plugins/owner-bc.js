export default {
  help: ["bc"],
  tags: ["owner"],
  command: ["bc", "broadcast"],

  run: async (ctx, { text }) => {
    const messageId = ctx.message?.message_id
    const senderId = String(ctx.from?.id)

    if (!global.ownerID.includes(senderId)) {
      return ctx.reply("⛔ No tienes permisos para usar este comando.", { reply_to_message_id: messageId })
    }

    let content = text || ctx.message?.caption || null
    if (!content && !ctx.message?.reply_to_message) {
      return ctx.reply("⚠️ Debes escribir un mensaje.", { reply_to_message_id: messageId })
    }

    const users = Object.keys(global.db.users || {})
    if (!users.length) {
      return ctx.reply("⚠️ No hay usuarios en la base de datos.", { reply_to_message_id: messageId })
    }

    await ctx.reply(`📢 Enviando aviso a ${users.length} usuarios...`, { reply_to_message_id: messageId })

    let sent = 0
    for (let id of users) {
      try {
        let name = global.db.users[id]?.name || id
        if (ctx.message?.reply_to_message) {
          await ctx.copyMessage(id, ctx.chat.id, ctx.message.reply_to_message.message_id)
        }
        await ctx.sendMessage(id, { text: `👤 ${name}\n\n${content}` })
        sent++
      } catch (e) {
        console.error("❌ Error enviando a", id, e.message)
      }
    }

    await ctx.reply(`✅ Enviado a ${sent} usuarios.`, { reply_to_message_id: messageId })
  }
}