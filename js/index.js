const inputs = document.querySelectorAll("input")

inputs.forEach((input)=>{
    input.addEventListener("blur", (evento)=>{
        validacao(evento.target)
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
        valueMissing: "O campo cep não pode ficar vazio.",
        patternMismatch: "O CEP digitado não é valido.",
        customError: "Não foi possível buscar o CEP"
    },
    city: {
        valueMissing: "O campo city não pode ficar vazio."
    },
    address: {
        valueMissing: "O campo address não pode ficar vazio."
    }
}

const validacao = (input) => {
    let mensagem = ""

    if(input.dataset.tipo == "birth"){
        verificaIdade(input)
    }

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
        if(input.dataset.tipo == "cep"){
            pegaCEP(input)
        }
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

//cep valido para teste => 05501-010
const pegaCEP = (input) => {
    const cep = input.value.replace(/[^0-9]/g, "")
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        method: "GET",
        mode: "cors",
        headers: {
            "content-type":"application/json;charset=utf-8"
        }
    }
    fetch(url, options).then(
        resposta => {return resposta.json()}
    ).then(
        resposta => {
            if(resposta.erro){
                input.setCustomValidity("Não foi possível buscar o CEP")
                mensagem = errorMessages.cep.customError
                errorDisplayON(input, mensagem)
            }else{
                input.setCustomValidity("")
                preencheDadosAutomaticamente(resposta)
                errorDisplayOFF(input)
            }

        }
    )
}

const preencheDadosAutomaticamente = (resposta) => {
    const city = document.querySelector("[data-tipo='city']")
    const address = document.querySelector("[data-tipo='address']")
    city.value = resposta.localidade
    address.value = resposta.logradouro
}


