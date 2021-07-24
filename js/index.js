const inputs = document.querySelectorAll("input")

inputs.forEach((input)=>{
    input.addEventListener("blur", (evento)=>{
        if(input.dataset.tipo == "birth"){
            verificaIdade(evento.target)
        }
        if(input.dataset.tipo == "cep"){
            pegaCEP(evento.target)
        }
        erroFunction(evento.target)
    })
})

const possibleErros = [
    "valueMissing",
    "patternMismatch",
    "customError"
]

const errorMessages = {
    name: {
        valueMissing: "O campo nome não pode ficar vazio."
    },
    email: {
        valueMissing: "O campo email não pode ficar vazio.",
        patternMismatch: "O email digitado não é valido."
    },
    birth: {
        valueMissing: "O campo birth date não pode ficar vazio.",
        customError: "A pessoa cadastrada precisa ser maior de idade."
    },
    cep: {
        valueMissing: "O campo cep não pode ficar vazio."
    },
    city: {
        valueMissing: "O campo city não pode ficar vazio."
    },
    address: {
        valueMissing: "O campo address não pode ficar vazio."
    }
}

const erroFunction = (input) => {
    let mensagem = ""
    possibleErros.forEach(error => {
        if(input.validity[error]){
            const inputType = input.dataset.tipo            
            mensagem = errorMessages[inputType][error]
            errorDisplayON(input, mensagem)
            return
        } 
    })
    if(!mensagem){
        errorDisplayOFF(input)
    }
}

const errorDisplayON = (input, mensagem) => {
    input.parentElement.classList.add("error")
    input.parentElement.querySelector("span").innerText = mensagem
}

const errorDisplayOFF = (input) => {
    input.parentElement.classList.remove("error")
    input.parentElement.querySelector("span").innerText = ""
}

const verificaIdade = (input) => {
    inputDate = new Date(input.value)
    currentDate = new Date()
    referenceDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate())
    if(inputDate >= referenceDate){
        input.setCustomValidity("A pessoa cadastrada precisa ser maior de idade.")
        return
    }
    input.setCustomValidity("")
}

const pegaCEP = async (input) => {
    const cep = input.value.replace(/[^0-9]/g, "")
    const respostaServidor = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: "GET",
        mode: "cors",
        headers: {
            "content-type":"application/json;charset=utf-8"
        }
    })
    const resposta = respostaServidor.json()
    preencheDadosAutomaticamente(resposta)
    console.log(resposta.cep)
}

const preencheDadosAutomaticamente = (resposta) => {
    const city = document.querySelector("[data-tipo='city']")
    city.value = resposta.localidade
}


