import { loadGroup } from "../lib/loadDatabase.js"

function escapeHtml(text) {
  if (!text) return ""
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

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

        const name = escapeHtml(sender.first_name || "Usuario")
        const username = sender.username ? `@${escapeHtml(sender.username)}` : name

        const warningMsg =
          `⚠️ <b>¡ENLACE NO PERMITIDO!</b>\n\n` +
          `👤 <b>${name}</b> (${username}), no se permiten enlaces en este grupo.\n\n` +
          `🗑️ <b>Tu mensaje ha sido eliminado.</b>`

        await ctx.reply(warningMsg, { parse_mode: "HTML" })
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
      return ctx.reply("✅ <b>AntiLink:</b> Activado", {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message?.message_id
      })
    }

    if (["off", "0", "desact"].includes(action)) {
      group.antilink = false
      return ctx.reply("❌ <b>AntiLink:</b> Desactivado", {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message?.message_id
      })
    }

    const status = group.antilink ? "🟢 Activado" : "🔴 Desactivado"
    return ctx.reply(
      `⚙️ <b>ESTADO DEL ANTILINK:</b> ${status}\n\n` +
      `Uso del comando:\n` +
      `• <code>${usedPrefix}${command} on</code> → Activar\n` +
      `• <code>${usedPrefix}${command} off</code> → Desactivar`,
      {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message?.message_id
      }
    )
  }
}
