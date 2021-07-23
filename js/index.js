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
        valueMissing: "O campo Nome não pode ficar vazio."
    },
    email: {
        valueMissing: "O campo email não pode ficar vazio.",
        customError: "O email digitado não é valido."
    }
}

const erroFunction = (input) => {
    possibleErros.forEach(error => {
        if(input.validity[error]){
            input.dataset.tipo
            console.log("campo em branco")
        }
    })
}





