let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    command
}) => {
    if (!text && !m.quoted) return m.reply("Format salah! Gunakan: .pushkontak2 delay|text");

    // Pisahkan delay dan pesan dari input pengguna
    let [delay, ...messageArray] = text.split('|');
    delay = parseInt(delay) * 1000; // Konversi delay ke milidetik
    let message = messageArray.join('|').trim();

    if (isNaN(delay) || delay < 1000) return m.reply("Delay harus berupa angka (minimal 1 detik).");
    if (!message) return m.reply("Pesannya mana sayang?");

    let wait = "Silakan tunggu, pesan sedang dikirim...";
    let get = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    let count = get.length;
    let sentCount = 0;

    m.reply(wait);

    for (let i = 0; i < get.length; i++) {
        setTimeout(function() {
            try {
                conn.sendMessage(get[i], { text: message });
                sentCount++;
            } catch (err) {
                console.error(`Gagal mengirim pesan ke ${get[i]}:`, err);
            }

            if (i === get.length - 1) {
                m.reply(`Berhasil Push Kontak:\nJumlah Pesan Terkirim: *${sentCount}*`);
            }
        }, i * delay); // Gunakan delay yang dikustomisasi
    }
};

handler.command = handler.help = ["pushkontakjeda"];
handler.tags = ["pushkontak"];
handler.owner = true;
handler.group = true;

export default handler;