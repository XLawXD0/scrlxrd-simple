let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    command
}) => {
    if (!text && !m.quoted) return m.reply("Pesannya Sayang?\n!!note fitur ini tanpa delay");

    let wait = "Silakan tunggu, pesan sedang dikirim..."; // Tambahkan definisi untuk variabel 'wait'

    let get = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
    let count = get.length;
    let sentCount = 0;
    m.reply(wait);

    for (let i = 0; i < get.length; i++) {
        setTimeout(function() {
            if (text) {
                conn.sendMessage(get[i], {
                    text: text
                });
            } else if (m.quoted) {
                conn.copyNForward(get[i], m.getQuotedObj(), false);
            } else if (text && m.quoted) {
                conn.sendMessage(get[i], {
                    text: text + "\n" + m.quoted.text
                });
            }
            count--;
            sentCount++;
            if (count === 0) {
                m.reply(`Berhasil Push Kontak:\nJumlah Pesan Terkirim: *${sentCount}*`);
            }
        }, i * 1000); // delay setiap pengiriman selama 1 detik
    }
}

handler.command = handler.help = ["pushkontak"];
handler.tags = ["pushkontak"];
handler.owner = true;
handler.group = true;

export default handler;
