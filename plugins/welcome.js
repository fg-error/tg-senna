import { loadGroup } from "../lib/loadDatabase.js"

export default {
  command: ["welcome", "bienvenida", "bye", "despedida"],

  event: async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) return

    const group = loadGroup(ctx)
    const groupName = ctx.chat.title || "el grupo"

    if (ctx.message?.new_chat_members) {
      if (!group.welcome) return

      for (const member of ctx.message.new_chat_members) {
        if (member.id === ctx.botInfo.id) continue

        const name = member.first_name || "Usuario"
        const username = member.username ? `@${member.username}` : name

        const caption =
          `✨ **¡BIENVENIDO/A AL GRUPO!** ✨\n\n` +
          `👤 **Usuario:** ${name} (${username})\n` +
          `🏰 **Grupo:** ${groupName}\n\n` +
          `🎈 Disfruta tu estadía y respeta a los demás miembros.`

        await sendUserMedia(ctx, member.id, caption, "tada")
      }
    }

    if (ctx.message?.left_chat_member) {
      if (!group.welcome) return

      const member = ctx.message.left_chat_member
      if (member.id === ctx.botInfo.id) return

      const name = member.first_name || "Usuario"
      const username = member.username ? `@${member.username}` : name

      const caption =
        `👋 **¡HASTA LUEGO!**\n\n` +
        `👤 **Usuario:** ${name} (${username})\n` +
        `🏰 **Grupo:** ${groupName}\n\n` +
        `🥀 Un miembro nos ha abandonado.`

      await sendUserMedia(ctx, member.id, caption, "balloon")
    }
  },

  run: async (ctx, { args, usedPrefix, command }) => {
    if (ctx.chat?.type !== "group" && ctx.chat?.type !== "supergroup") {
      return ctx.reply("❌ Este comando solo se puede usar en grupos.")
    }

    const group = loadGroup(ctx)
    const action = args[0]?.toLowerCase()

    if (["on", "1", "act"].includes(action)) {
      group.welcome = true
      return ctx.reply("✅ **Módulo de Bienvenida y Despedida:** Activado", { parse_mode: "Markdown" })
    }

    if (["off", "0", "desact"].includes(action)) {
      group.welcome = false
      return ctx.reply("❌ **Módulo de Bienvenida y Despedida:** Desactivado", { parse_mode: "Markdown" })
    }

    const status = group.welcome ? "🟢 Activado" : "🔴 Desactivado"
    return ctx.reply(
      `⚙️ **ESTADO DEL MÓDULO:** ${status}\n\n` +
      `Uso del comando:\n` +
      `• \`${usedPrefix}${command} on\` → Activar\n` +
      `• \`${usedPrefix}${command} off\` → Desactivar`,
      { parse_mode: "Markdown" }
    )
  }
}

async function sendUserMedia(ctx, userId, caption, effectId) {
  const effectMap = {
    tada: "5046589136895476101",
    balloon: "5046509860389126442"
  }

  const messageEffectId = effectMap[effectId]

  try {
    const photos = await ctx.telegram.getUserProfilePhotos(userId, 0, 1)

    if (photos && photos.total_count > 0) {
      const fileId = photos.photos[0][0].file_id
      await ctx.replyWithPhoto(fileId, {
        caption,
        parse_mode: "Markdown",
        message_effect_id: messageEffectId
      })
    } else {
      await ctx.reply(caption, {
        parse_mode: "Markdown",
        message_effect_id: messageEffectId
      })
    }
  } catch (e) {
    await ctx.reply(caption, {
      parse_mode: "Markdown",
      message_effect_id: messageEffectId
    })
  }
}
