const inputs = document.querySelectorAll("input")

inputs.forEach((input)=>{
    input.addEventListener("blur", (evento)=>{
        erroFunction(evento.target)
    })
})

const possibleErros = [
    "customError",
    "patternMismatch",
    "valueMissing"
]

const errorMessages = {
    name: {
        valueMissing: "O campo nome não pode ficar vazio."
    },
    email: {
        valueMissing: "O campo email não pode ficar vazio.",
        customError: "O email digitado não é valido."
    },
    birth: {
        valueMissing: "O campo birth date não pode ficar vazio."
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
    possibleErros.forEach(error => {
        let mensagem = ""
        if(input.validity[error]){
            const inputType = input.dataset.tipo
            
            mensagem = errorMessages[inputType][error]
        }
        input.setCustomValidity(mensagem)
    })
}





