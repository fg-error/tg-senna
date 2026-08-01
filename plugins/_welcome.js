import { loadGroup } from "../lib/loadDatabase.js"

export default {
  command: ["welcome", "bienvenida", "bye", "despedida"],

  event: async (ctx) => {
    const msg = ctx.message || ctx.update?.message
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup") || !msg) return

    const group = loadGroup(ctx)
    const groupName = ctx.chat.title || "el grupo"

    if (msg.new_chat_members) {
      if (!group.welcome) return

      for (const member of msg.new_chat_members) {
        if (member.id === ctx.botInfo.id) continue

        const name = member.first_name || "Usuario"
        const username = member.username ? `@${member.username}` : name

        const caption =
          `🎉 *¡Hey, ${name}!* Bienvenido/a a *${groupName}*.\n\n` +
          `👤 ${username}\n\n` +
          `Esperamos que hayas venido con ganas de pasarla bien... y no de romper las reglas. 😜\n\n` +
          `💬 Preséntate, participa y disfruta del grupo. ¡Que la pases genial! ✨`

        await sendUserMedia(ctx, member.id, caption)
      }
    }

    if (msg.left_chat_member) {
      if (!group.welcome) return

      const member = msg.left_chat_member
      if (member.id === ctx.botInfo.id) return

      const name = member.first_name || "Usuario"
      const username = member.username ? `@${member.username}` : name

      const caption =
        `👋 *${name}* ha salido de *${groupName}*.\n\n` +
        `👤 ${username}\n\n` +
        `Esperamos que no haya sido por nuestras bromas... 😅\n\n` +
        `🍀 ¡Mucha suerte y aquí tendrás las puertas abiertas si algún día decides volver!`

      await sendUserMedia(ctx, member.id, caption)
    }
  },

  run: async (ctx, { args, usedPrefix, command }) => {
    if (ctx.chat?.type !== "group" && ctx.chat?.type !== "supergroup") {
      return ctx.reply("❌ Este comando solo se puede usar en grupos.", {
        reply_to_message_id: ctx.message?.message_id
      })
    }

    const group = loadGroup(ctx)
    const action = args[0]?.toLowerCase()

    if (["on", "1", "act"].includes(action)) {
      group.welcome = true
      return ctx.reply("✅ **Bienvenida y Despedida:** Activado", {
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message?.message_id
      })
    }

    if (["off", "0", "desact"].includes(action)) {
      group.welcome = false
      return ctx.reply("❌ **Bienvenida y Despedida:** Desactivado", {
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message?.message_id
      })
    }

    const status = group.welcome ? "🟢 Activado" : "🔴 Desactivado"
    return ctx.reply(
      `⚙️ **ESTADO:** ${status}\n\n` +
      `Uso del comando:\n` +
      `• \`${usedPrefix}${command} on\` → Activar\n` +
      `• \`${usedPrefix}${command} off\` → Desactivar`,
      {
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message?.message_id
      }
    )
  }
}

async function sendUserMedia(ctx, userId, caption) {
  try {
    const photos = await ctx.telegram.getUserProfilePhotos(userId, 0, 1)

    if (photos && photos.total_count > 0) {
      const fileId = photos.photos[0][0].file_id
      await ctx.replyWithPhoto(fileId, {
        caption,
        parse_mode: "Markdown"
      })
    } else {
      await ctx.reply(caption, {
        parse_mode: "Markdown"
      })
    }
  } catch (e) {
    await ctx.reply(caption, {
      parse_mode: "Markdown"
    })
  }
}
