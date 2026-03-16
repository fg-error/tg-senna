import fg from "fg-senna"

export default {

help: ["ytmp4 url"],
tags: ["dl"],
command: ["ytmp4"],

run: async (conn, { args }) => {

if (!args[0]) return conn.reply("❌ Envia link de YouTube")

await conn.sendChatAction("upload_video")

try {

let data = await fg.ytv(args[0], "480p")

await conn.replyWithVideo(
{ url: data.dl_url },
{ caption: data.title }
)

} catch (error) {

conn.reply("❌ Error descargando MP4" + error)

}

}

}