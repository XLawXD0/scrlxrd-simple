import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
    let buffer = await fetch(`https://telegra.ph/file/fcb914d2617e9f64b2557.jpg`).then(res => res.buffer());
    conn.sendFile(m.chat, buffer, 'hasil.jpg', `┏━ꕥ〔 *Payment* 〕ꕥ━⬣┃✾ PULSA  [083821123163]┃✾ Dana  [083821123163]┗━━━━ꕥ┏━━ꕥ〔 *NOTE* 〕ꕥ━⬣┃ Kirim bukti tf ke .owner┃ Jika mau donasi kirim saja kawan :D┃ Thx slurr┗━━━━ꕥ`, m);
};

handler.help = handler.command = ['donasi', 'donate', 'pay', 'payment'];
handler.tags = ['main'];

export default handler;
