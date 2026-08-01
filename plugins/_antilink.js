import { loadGroup } from "../lib/loadDatabase.js"

export default {
  command: ["antilink", "antilinks"],

  event: async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) return

    const group = loadGroup(ctx)
    if (!group.antilink) return

    const text = ctx.message?.text || ctx.message?.caption
    if (!text) return

    const linkRegex = /(https?:\/\/)?(www\.)?(chat\.whatsapp\.com|whatsapp\.com\/channel\/|t\.me\/|telegram\.me\/|telegram\.dog\/|discord\.gg\/|discord\.com\/invite\/|discordapp\.com\/invite\/)[^\s]+/i

    if (linkRegex.test(text)) {
      const sender = ctx.from
      if (!sender) return

      try {
        const member = await ctx.getChatMember(sender.id)
        if (["administrator", "creator"].includes(member.status)) return
      } catch (e) {
        return
      }

      try {
        await ctx.deleteMessage(ctx.message.message_id)

        const name = sender.first_name || "Usuario"
        const username = sender.username ? `@${sender.username}` : name

        const warningMsg =
          `⚠️ *¡ENLACE NO PERMITIDO!*\n\n` +
          `👤 *${name}* (${username}), no se permiten enlaces en este grupo.\n\n` +
          `🗑️ *Tu mensaje ha sido eliminado.*`

        await ctx.reply(warningMsg, { parse_mode: "Markdown" })
      } catch (e) {
        console.log("❌ Error en antilink:", e)
      }
    }
  },

  run: async (ctx, { args, usedPrefix, command }) => {
    if (ctx.chat?.type !== "group" && ctx.chat?.type !== "supergroup") {
      return ctx.reply("❌ Este comando solo se puede usar en grupos.", {
        reply_to_message_id: ctx.message?.message_id
      })
    }

    try {
      const user = await ctx.getChatMember(ctx.from.id)
      if (!["administrator", "creator"].includes(user.status)) {
        return ctx.reply("❌ Solo los administradores pueden modificar esta opción.", {
          reply_to_message_id: ctx.message?.message_id
        })
      }
    } catch (e) {
      return
    }

    const group = loadGroup(ctx)
    const action = args[0]?.toLowerCase()

    if (["on", "1", "act"].includes(action)) {
      group.antilink = true
      return ctx.reply("✅ **AntiLink:** Activado", {
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message?.message_id
      })
    }

    if (["off", "0", "desact"].includes(action)) {
      group.antilink = false
      return ctx.reply("❌ **AntiLink:** Desactivado", {
        parse_mode: "Markdown",
        reply_to_message_id: ctx.message?.message_id
      })
    }

    const status = group.antilink ? "🟢 Activado" : "🔴 Desactivado"
    return ctx.reply(
      `⚙️ **ESTADO DEL ANTILINK:** ${status}\n\n` +
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
