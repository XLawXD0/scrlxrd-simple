let handler = async (m, {conn, groupMetadata }) => {
conn.reply(m.chat, `${await groupMetadata.id}`, m)
}
handler.help = ['cekid']
handler.tags = ['pushkontak']
handler.command = /^(cekid|idgc|gcid)$/i

handler.group = true

export default handler  
