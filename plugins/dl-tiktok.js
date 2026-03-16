import fg from "fg-senna"

export default {

help: ["tiktok url"],
tags: ["dl"],
command: ["tt", "tiktok"],

run: async (conn, { args }) => {

if (!args[0]) {
return conn.reply("❌ Envia un link de TikTok")
}

try {

let data = await fg.tiktok(args[0])
let res = data.result

if (!res.images) {

let tex = `
🎵 TIKTOK DL

👤 Nombre: ${res.author.nickname}
📌 Usuario: ${res.author.unique_id}
⏱ Duración: ${res.duration}
❤️ Likes: ${res.digg_count}
👀 Vistas: ${res.play_count}

📝 ${res.title}
`
await conn.sendChatAction("upload_video")

await conn.replyWithVideo(
{ url: res.play },
{ caption: tex }
)

} else {

let cap = `
❤️ Likes: ${res.digg_count}

📝 ${res.title}
`

for (let img of res.images) {

    await conn.sendChatAction("upload_photo")
    
await conn.replyWithPhoto(
{ url: img },
{ caption: cap }
)

}

if (res.play) {
await conn.replyWithAudio({ url: res.play })
}

}

} catch (err) {

console.log(err)

conn.reply("❌ Error descargando el TikTok")

}

}

}