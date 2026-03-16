import yts from "yt-search"

export default {

help: ["play"],
tags: ["dl"],
command: ["play"],

run: async (conn, { args, usedPrefix, command }) => {

console.log("▶️ PLAY ejecutado")

if (!args.length) {
return conn.reply(`✳️ Ejemplo:\n${usedPrefix + command} Lil peep`)
}

let text = args.join(" ")

try {

console.log("🔎 Buscando:", text)

const searchResult = await yts(text)

const video = searchResult.videos[0]

if (!video) {
console.log("❌ No se encontró video")
return conn.reply("❌ Video no encontrado")
}

console.log("✅ Video encontrado:", video.title)

const { title, timestamp, views, ago, url, thumbnail } = video

await conn.replyWithPhoto(
{ url: thumbnail },
{
caption: `🎵 ${title}`,
reply_markup: {
inline_keyboard: [
[
{
text: "🎶 MP3",
callback_data: `${usedPrefix}ytmp3 ${url}`
},
{
text: "🎥 MP4",
callback_data: `${usedPrefix}ytmp4 ${url}`
} ] ]
}
}
)


} catch (err) {

console.log("❌ ERROR PLAY:", err)

conn.reply("❌ Error buscando la música")

}

}

}