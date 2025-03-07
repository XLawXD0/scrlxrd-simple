import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk' 
import { fileURLToPath } from 'url' 

global.owner = [
  ['6283821123163', 'XLaw XD', true],
  ['YOUR_NUMBER'],
  ['YOUR_NUMBER']
] //OWNER NUMBER

global.mods = [''] 
global.prems = ['50489079501', '573143917092']
global.botNumber = [''] 
global.APIs = { // API Prefix
  // name: 'https://website' 
  nrtm: 'https://fg-nrtm.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.fgmods.xyz': 'm2XBbNvzn' //--- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = 'Created by' 
global.author = '© ScrLxrd BOT' 

//--info FG
global.botName = 'ScrLxrd'
global.fgig = 'https://instagram.com/dirgasa1202' 
global.fgsc = 'https://github.com/XLawXD0/scrlxrd-simple' 
global.fgyt = 'https://youtube.com/'
global.fgpyp = 'https://paypal.me/dirgasa1202'
global.fglog = 'https://files.catbox.moe/4ww3h9.jpg' 

//--- Grupos WA
global.id_canal = '120363356632373217@newsletter' //-ID de canal de WhatsApp
global.fgcanal = 'https://whatsapp.com/channel/0029Vb8dX4TLI8YSd3dcyb3s'
global.bgp = 'https://chat.whatsapp.com/Ep8oL3jQe7I8mgqcbwyNg7'

global.wait = '⌛ _Loading, Please wait..._'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '2' // maximum warnings

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
