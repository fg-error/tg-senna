export default {
  help: ["ia"],
  tags: ["ai"],
  command: ["ia"],

  run: async (ctx, { text }) => {
    const messageId = ctx.message?.message_id || ctx.callbackQuery?.message?.message_id;
    const userId = ctx.from.id;
    const pushName = ctx.from.first_name || ctx.from.username || "Usuario";

    if (!global.sennaMemory) global.sennaMemory = {};
    if (!global.sennaMemory[userId]) global.sennaMemory[userId] = [];

    if (!text) {
      return ctx.reply("Por favor, proporcione el texto o la consulta que desea procesar.", {
        reply_to_message_id: messageId
      });
    }

    await ctx.sendChatAction("typing");

    try {
      const history = global.sennaMemory[userId].join("\n");
      const ROLE = [
        `Eres Senna, amigable y directa`,
        `Debes mencionar al usuario por su nombre: ${pushName}.`,
        `Responde en español, con muchos emojis.`
      ].join(" ");

      const prompt = `${ROLE}\n${history}\nUsuario (${pushName}): ${text}\nAsistente:`;

      const url = `${api}/ai/gemini?text=${encodeURIComponent(prompt)}&apikey=${apikey}`;
      const res = await fetch(url);

      if (!res.ok) throw new Error(`Estado de respuesta: ${res.status}`);

      const data = await res.json();
      const responseText = data.result || data.response || data.resultado || data.message;

      if (!responseText) throw new Error("Gemini no devolvió una respuesta válida.");

      global.sennaMemory[userId].push(`Usuario (${pushName}): ${text}`);
      global.sennaMemory[userId].push(`Asistente: ${responseText}`);

      if (global.sennaMemory[userId].length > 10) {
        global.sennaMemory[userId] = global.sennaMemory[userId].slice(-10);
      }

      await ctx.reply(responseText, {
        reply_to_message_id: messageId
      });

    } catch (e) {
      console.error(e);
      await ctx.reply("Se ha producido un error técnico al procesar su solicitud. Por favor, intente de nuevo más tarde.", {
        reply_to_message_id: messageId
      });
    }
  }
}