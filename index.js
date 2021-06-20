const https = require("https")
const fs = require("fs")

function download(url,year,month) {
  const filename = year +
               "_"
               + month +
               "_membros_ativos.JSON" 

  const req = https.get(url, (res) => {
    const archive = fs.createWriteStream(filename)
    res.pipe(archive)

    archive.on("error", (err) => {
      console.log("Erro ao escrever arquivo")
      console.log(err)
    })

    archive.on("finish", () => {
      archive.close()
      console.log("O arquivo "+ filename +" foi baixado com sucesso!")
    })
  })

  req.on("error", (err)=>{
    console.log("Erro ao baixar o arquivo")
    console.log(err)
  })
}

//Use as variáveis month e year para alterar a data do arquivo que vai ser baixado
var month = "6"
var year = "2021"

const url = "https://sistemas.mpal.mp.br/transparencia/contracheque/index/65?tipo=membrosativos&mes="
            + month +
            "&ano="
            + year +
            "&busca=&download=json"

console.log("Aguarde...")
download(url,year,month)
