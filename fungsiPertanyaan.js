const fs  = require('fs');
var validator = require('validator');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

//buat folder dan file
//buat variabel untuk menyimpan lokasi penyimpanan
const dirPath = './data';
const dataPath = './data/contacts.json';

//cek folder sudah ada atau tidak, jika tidak buat folder
//fungsi inisiasi data
function initData(){
  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
  }
  //cek file sudah ada atau tidak, jika tidak buat file
  if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
  }
}

//buat fungsi dengan variabel pertanyaan
const pertanyaan = (question) =>{
  return new Promise((resolve, reject) =>{
   readline.question(question, (answer)=>{
     resolve(answer);
   })
  })
}

//buat fungsi dengan variabel saveJawaban menggunakan arrow fungsi =>
 const saveJawaban = (name, email, mobile) => {
    const contact = {name, email, mobile}
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8',));
    
    //cek nama harus berbeda semua(unique)
    const cek = data.find((contact) => contact.name === name);
    if (cek){
      console.log('Nama sudah terdaftar didalam kontak');
      readline.close()
      return false;
    }
    data.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(data));
    console.log("Data Tersimpan")
    readline.close();
 }

//export fungsi agar bisa digunakan diluar file fungsi
 module.exports = {
  pertanyaan,
  saveJawaban,
  initData,
 }