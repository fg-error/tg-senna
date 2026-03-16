import fg from "fg-senna"

export default {

help: ["ytmp3 url"],
tags: ["dl"],
command: ["ytmp3"],

run: async (conn, { args }) => {

if (!args[0]) {
return conn.reply("❌ Envia un link de YouTube")
}

try {

await conn.sendChatAction("upload_voice")

let data = await fg.yta(args[0])

let title = data.title || "YouTube Audio"
let url = data.dl_url

await conn.replyWithAudio(
{ url: url },
{
title: title,
performer: "FG-Music",
filename: title + ".mp3"}
)

console.log("🎧 Enviando audio →", title)

} catch (e) {

console.log("❌ Error ytmp3:", e)

conn.reply("❌ Error descargando MP3")

}

}

}