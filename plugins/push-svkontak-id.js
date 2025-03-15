import fs from 'fs/promises';

// Fungsi sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handler = async (m, { conn, args }) => {
  try {
    const idgroup = args[0];
    // Validasi ID grup
    if (!idgroup || !idgroup.endsWith('@g.us')) {
      return m.reply('Mohon berikan ID grup dengan format yang benar, seperti 120363025089808665@g.us.');
    }

    const chatID = idgroup;

    // Cek apakah bot adalah anggota grup
    if (!conn.chats[chatID]) {
      return m.reply('Bot tidak menjadi anggota grup tersebut.');
    }

    // Mengambil metadata grup
    const groupInfo = await conn.groupMetadata(chatID).catch((err) => {
      throw new Error('Tidak dapat mengakses metadata grup. Pastikan bot adalah anggota grup dan memiliki izin.');
    });

    const participants = groupInfo.participants;
    const groupName = groupInfo.subject;

    // Membuat file vCard
    let vcard = '';
    let noPort = 1;
    for (let participant of participants) {
      if (participant.id && participant.id.includes('@s.whatsapp.net')) {
        const contactNumber = participant.id.split('@')[0];
        vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:Kontak ${noPort}\nTEL;type=CELL;type=VOICE;waid=${contactNumber}:+${contactNumber}\nEND:VCARD\n`;
        noPort++;
      }
    }

    // Jika tidak ada kontak
    if (noPort === 1) {
      return m.reply('Tidak ada kontak yang dapat disimpan.');
    }

    // Menyimpan file vCard
    const fileName = './contacts.vcf';
    await fs.writeFile(fileName, vcard.trim());

    // Mengirim file vCard
    m.reply('Mengimpor ' + (noPort - 1) + ' kontak..');
    await sleep(2000); // Menggunakan fungsi sleep
    conn.sendMessage(m.chat, {
      document: await fs.readFile(fileName),
      mimetype: 'text/vcard',
      fileName: 'Contact.vcf',
      caption: `GROUP: ${groupName}\nMEMBER: ${noPort - 1}`,
    }, { quoted: m });

    // Menghapus file vCard setelah dikirim
    await fs.unlink(fileName);
  } catch (err) {
    // Menangani error dengan pesan yang jelas
    m.reply(`Terjadi kesalahan: ${err.message}`);
  }
};

// Metadata handler
handler.help = ['svkontakid'];
handler.tags = ['pushkontak'];
handler.command = ['svkontakid'];
handler.owner = true;

export default handler;
