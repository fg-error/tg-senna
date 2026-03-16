export default {

help: ["ping"],
tags: ["main"],
command: ["ping"],

run: async (conn) => {

let start = performance.now()

let m = await conn.reply("🏓 Midiendo velocidad...")

let end = performance.now()

let speed = (end - start).toFixed(2)

let ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(0)

await conn.editMessageText(
`🏓 PONG

⚡ Ping: ${speed} ms
🧠 RAM: ${ram} MB
⏱️ Uptime: ${Math.floor(process.uptime())}s`,
{
chat_id: m.chat.id,
message_id: m.message_id
}
)

}

}