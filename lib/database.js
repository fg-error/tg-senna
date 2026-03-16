import fs from "fs"

const DB_FILE = "./database.json"

let db = {
users: {},
groups: {},
channels: {},
settings: {}
}

if (fs.existsSync(DB_FILE)) {
db = JSON.parse(fs.readFileSync(DB_FILE))
}

global.db = db

setInterval(() => {
fs.writeFileSync(DB_FILE, JSON.stringify(global.db, null, 2))
}, 30000)

export default global.db