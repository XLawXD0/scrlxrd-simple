
import fetch from "node-fetch";

let activeBroadcast = {
  intervalId: null,
  message: "",
  duration: 0,
};

let handler = async (m, { conn, command, text, usedPrefix }) => {
  switch (command) {
    case "setbc":
      if (!text) {
        return conn.reply(
          m.chat,
          `Contoh penggunaan:\n\n*${usedPrefix + command} 5m|Pesan broadcast*\n\nGunakan *${usedPrefix}stopbc* untuk menghentikan broadcast.`,
          m
        );
      }

      const [duration, message] = text.split("|");
      if (!duration || !message) {
        return conn.reply(
          m.chat,
          `Format salah. Contoh penggunaan:\n\n*${usedPrefix + command} 5m|Pesan broadcast*\n\nGunakan "m" untuk menit atau "j" untuk jam.`,
          m
        );
      }

      const timeInMs = parseDuration(duration.trim());
      if (!timeInMs) {
        return conn.reply(
          m.chat,
          `Format waktu salah. Gunakan "m" untuk menit atau "j" untuk jam. Contoh: *5m* atau *2j*`,
          m
        );
      }

      // Cek jika broadcast sebelumnya masih aktif
      if (activeBroadcast.intervalId) {
        return conn.reply(
          m.chat,
          `Broadcast otomatis masih berjalan. Gunakan *${usedPrefix}stopbc* untuk menghentikan broadcast sebelumnya.`,
          m
        );
      }

      // Mengambil semua ID grup
      const groupIds = Object.keys(await conn.chats).filter((id) => id.endsWith("@g.us"));
      if (groupIds.length === 0) {
        return conn.reply(m.chat, "Tidak ada grup untuk broadcast.", m);
      }

      conn.reply(
        m.chat,
        `_Mengirim pesan pertama ke ${groupIds.length} grup..._`,
        m
      );

      // Kirim pesan pertama
      for (const id of groupIds) {
        try {
          await conn.sendMessage(id, { text: message.trim() }, { quoted: null });
        } catch (err) {
          console.error(`Gagal mengirim pesan ke grup ${id}:`, err);
        }
      }

      conn.reply(
        m.chat,
        `_Pesan pertama selesai dikirim. Pesan akan diulang setiap ${duration.trim()}._`,
        m
      );

      // Simpan informasi broadcast aktif
      activeBroadcast.message = message.trim();
      activeBroadcast.duration = timeInMs;

      // Kirim ulang pesan secara otomatis
      activeBroadcast.intervalId = setInterval(async () => {
        for (const id of groupIds) {
          try {
            await conn.sendMessage(id, { text: activeBroadcast.message }, { quoted: null });
          } catch (err) {
            console.error(`Gagal mengirim pesan ke grup ${id}:`, err);
          }
        }
      }, activeBroadcast.duration);
      break;

    case "stopbc":
      if (activeBroadcast.intervalId) {
        clearInterval(activeBroadcast.intervalId);
        activeBroadcast.intervalId = null;
        activeBroadcast.message = "";
        activeBroadcast.duration = 0;

        conn.reply(m.chat, "_Broadcast otomatis telah dihentikan._", m);
      } else {
        conn.reply(m.chat, "_Tidak ada broadcast otomatis yang aktif._", m);
      }
      break;

    default:
      conn.reply(m.chat, "Perintah tidak dikenal.", m);
  }
};

handler.help = ["setbc"];
handler.tags = ["owner"];
handler.command = /^(setbc|stopbc)$/i;
handler.owner = true;

export default handler;

// Fungsi untuk mengonversi waktu
function parseDuration(input) {
  const match = input.match(/^(\d+)(m|j)$/i);
  if (!match) return null;

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  if (unit === "m") return value * 60 * 1000; // Menit ke milidetik
  if (unit === "j") return value * 60 * 60 * 1000; // Jam ke milidetik
  return null;
}