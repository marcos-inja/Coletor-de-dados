const https = require("https")
const fs = require("fs")

const base_URL = "https://sistemas.mpal.mp.br/transparencia/contracheque/index/"
const local = "downloads/"

function download(url,year,month) {
  const filename = year +
               "_"
               + month +
               "_membros_ativos.JSON" 

  const req = https.get(url, (res) => {
    const archive = fs.createWriteStream(local+filename)
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

/**
 * Use as variáveis month e year para alterar a data do arquivo que vai ser baixado
 * Coloque o numero do month sem o zero na frente
 */

var month = "5"
var year = "2021"

const url = base_URL + 
            "65?tipo=membrosativos&mes="
            + month +
            "&ano="
            + year +
            "&busca=&download=json"

console.log("Aguarde...")
download(url,year,month)
