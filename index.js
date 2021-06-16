const https = require("https")
const fs = require("fs")

function download(url,ano,mes) {
  const nome = ano +
               "_"
               + mes +
               "_membros_ativos.JSON" 

  const req = https.get(url, (res) => {
    const arquivo = fs.createWriteStream(nome)
    res.pipe(arquivo)

    arquivo.on("error", (err) => {
      console.log("Erro ao escrever arquivo")
      console.log(err)
    })

    arquivo.on("finish", () => {
      arquivo.close()
      console.log("O arquivo "+ nome +" foi baixado com sucesso!")
    })
  })

  req.on("error", (err)=>{
    console.log("Erro ao baixar o arquivo")
    console.log(err)
  })
}

//Use as variáveis ano e mes para alterar a data do arquivo que vai ser baixado
const ano = "2020"
const mes = "12"

const url = "https://sistemas.mpal.mp.br/transparencia/contracheque/index/65?tipo=membrosativos&mes="
            + mes +
            "&ano="
            + ano +
            "&busca=&download=json"

console.log("Aguarde...")
download(url,ano,mes)
