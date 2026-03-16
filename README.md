<h1 align="center">🤖 SENNA BOT</h1>

<p align="center">
Bot de Telegram multifuncional.
</p>

<p align="center">
<img src="https://img.shields.io/badge/Telegram-Bot-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white">
</p>

---

## 📱 Probar el Bot

Si tienes dudas antes de instalar **SENNA-BOT**, puedes probar el bot directamente en Telegram.

<p align="center">

[![Telegram](https://img.shields.io/badge/Probar%20Bot%20en%20Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/fg_userss)

</p>

---
# 📌 Características

- 🧩 Sistema de **plugins dinámico**
- 🎵 Descarga **YouTube MP3**
- 🎬 Descarga **YouTube MP4**
- 🔎 Comando **play** para buscar música
- 📱 Descarga **TikTok sin marca de agua**
- ⚡ Comando **ping** para verificar latencia
- 📜 Menú automático
- 📡 Compatible con **grupos y canales**
---

# ⚙️ Instalación

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/fg-error/tg-senna
cd tg-senna
```

---

## 2️⃣ Instalar dependencias

```bash
npm install
```

---

## 3️⃣ Configurar el bot

Edita el archivo:

```
config.js
```

Agrega tu **TOKEN de Telegram** obtenido desde **@BotFather**.

Ejemplo:

```javascript
global.BOT_TOKEN = "TU_TOKEN_AQUI"
```

---

## 4️⃣ Iniciar el bot

```bash
npm start
```

---

# 🧩 Sistema de Plugins

El bot utiliza un **sistema modular**, donde cada comando es un plugin independiente.

Ejemplo de plugin:

```javascript
export default {

command: ["ping"],

run: async (conn) => {

conn.reply("🏓 Pong!")

}

}
```

Para agregar un comando nuevo:

1. Crear un archivo en **/plugins**
2. Exportar el comando
3. Reiniciar el bot


---

# 🚀 Deploy

El bot puede ejecutarse en:

- VPS
- Pterodactyl
- Railway
- Render
- Replit

---

# 👤 Autor

**FG**

GitHub  
https://github.com/fg-error

---

# ⭐ Apoya el proyecto

Si te gusta este proyecto puedes:

- ⭐ Dar una estrella al repositorio
- 🍴 Hacer fork
- 🧩 Crear nuevos plugins
- 🛠 Contribuir al desarrollo

---

# 📄 Licencia

Este proyecto está bajo licencia **MIT**.