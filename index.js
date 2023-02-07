const yargs = require("yargs");
var validator = require('validator');
const fungsiPertanyaan = require('./fungsiPertanyaan');
const { exit } = require("process");

yargs.command({
  command:'add',
  describe: 'add new contact',
  builder:{
    name:{
      describe: 'Contact Name',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'contact email',
      demandOption: false,
      type: 'string',
    },
    mobile:{
      describe: 'Contact mobile phone number',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv){
    const contact = {
      name:argv.name,
      email:argv.email,
      mobile:argv.mobile,
  };
  //memanggil fungsi main dengan parameter contact
  main(contact);
  },  
});

//yargs.parse() untuk memunculkan perintah dari yargs
yargs.parse();

//buat fungsi main untuk dipanggil dalam yargs
function main(contact){
  fungsiPertanyaan.initData();
  //cek validasi email jika invalid atau salah
  if(contact.email && !validator.isEmail(contact.email)){
    console.log('Format Email Salah')
    exit();
    return;
  }
  //cek validasi format nomor HP
  if(!validator.isMobilePhone(contact.mobile, 'id-ID')){
    console.log('Format Phone Number Salah!')
    exit();
    return;
  }
  //panggil fungsi untuk save ke database
  fungsiPertanyaan.saveJawaban(contact.name, contact.email, contact.mobile);
}

// console.log(yargs.argv);