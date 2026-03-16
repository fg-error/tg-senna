export function loadUser(ctx) {

let id = ctx.from.id
let name = ctx.from.first_name || ""
let username = ctx.from.username ? "@" + ctx.from.username : ""

let user = global.db.users[id]

if (!user) {

user = global.db.users[id] = {
id,
name,
username,
premium: false,
registered: Date.now()
}

} else {

user.name = name
user.username = username

}

return user
}


export function loadGroup(ctx) {

let id = ctx.chat.id
let name = ctx.chat.title || "Grupo"

let group = global.db.groups[id]

if (!group) {

group = global.db.groups[id] = {
id,
name,
autodl: false,
antilink: false,
welcome: false,
created: Date.now()
}

} else {

group.name = name

}

return group
}


export function loadChannel(ctx) {

let id = ctx.chat.id
let name = ctx.chat.title || "Canal"

let channel = global.db.channels[id]

if (!channel) {

channel = global.db.channels[id] = {
id,
name,
autodownload: false,
created: Date.now()
}

} else {

channel.name = name

}

return channel
}