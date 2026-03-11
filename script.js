
let naipes = ["♥", "♠", "♦", "♣"];
let valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const descricoesValores = {
    "2": "+1",
    "3": "+1",
    "4": "+1",
    "5": "+2",
    "6": "+2",
    "7": "+2",
    "8": "+3",
    "9": "+3",
    "10": "+3",
    "J": "+4",
    "Q": "+4",
    "K": "+4",
    "A": "+5"
}

const descricoesNaipes = {
    "♥": " Bônus em RD no próximo dano que sofrer na cena.",
    "♠": "Bônus  na próxima rolagem de dano na cena.",
    "♦": " Bônus no próximo teste de pericia a sua escolha na cena.",
    "♣": " Bônus na defesa do próximo ataque que sofrer na cena."
}
const naipesVermelhos = ["♥",  "♦"];
const container = document.getElementById("cartas")
const painelDescritivo = document.getElementById("texto-descricao")
const tituloDescritivo = document.getElementById("titulo-carta")
const pesquisaCarta = document.getElementById("pesquisaCarta")
pesquisaCarta.addEventListener("input", function(){
    const termo = pesquisaCarta.value.toLowerCase().trim();
    const cartaPesquisada = document.querySelectorAll(".carta")
    cartaPesquisada.forEach(function(carta){
        const valor = carta.dataset.valor.toLowerCase()
        const naipe = carta.dataset.naipe.toLowerCase()
        if(valor.includes(termo) || naipe.includes(termo)){
            carta.style.display = "block"
        } else {
            carta.style.display = "none"
        }
    })
})

function salvarCartas(){
    const cartasAtivas = document.querySelectorAll(".carta.ativa");
    let lista = [];
    cartasAtivas.forEach(function(carta){
        lista.push({
            valor: carta.dataset.valor,
            naipe: carta.dataset.naipe
        })
    })
    localStorage.setItem("cartasAtivas", JSON.stringify(lista))
}

function carregarCartas(){
    const cartasSalvas = JSON.parse(localStorage.getItem("cartasAtivas"))

    if(!cartasSalvas) return;

    cartasSalvas.forEach(function(carta){
        const selector = `.carta[data-valor="${carta.valor}"][data-naipe="${carta.naipe}"]`
        const cartaElement = document.querySelector(selector)
        if(cartaElement){
            cartaElement.classList.add("ativa")
        }
    })
}


function atualizarPainel(){
    painelDescritivo.innerHTML = "";
    const cartasAtivas = document.querySelectorAll(".carta.ativa");

    cartasAtivas.forEach(function(carta){
        const valor = carta.dataset.valor
        const naipe = carta.dataset.naipe

        const bloco = document.createElement("div");
        bloco.innerHTML = `<h4>${valor} ${naipe}</h4>
        <p>${descricoesValores[valor]}${descricoesNaipes[naipe]}</p>
        <hr>
        `;
        painelDescritivo.appendChild(bloco);
    }
    )}
function criarBaralho(naipes, valores){
    for (let i =0; i < valores.length; i++){
        for (let j = 0; j< naipes.length; j++){

            let carta = document.createElement("div")
            let topo = document.createElement("div")
            let meio = document.createElement("div")
            let baixo = document.createElement("div")
            topo.textContent = naipes[j] +  valores[i]
            meio.textContent = naipes[j]
            baixo.textContent = naipes[j] + valores[i]
            container.appendChild(carta)
            carta.appendChild(topo)
            carta.appendChild(meio)
            carta.appendChild(baixo)
            console.log(container)

            carta.classList.add("carta")
            topo.classList.add("topo")
            meio.classList.add("meio")
            baixo.classList.add("baixo")

            if(naipesVermelhos.includes(naipes[j])){
                carta.classList.add("vermelhas")
            }
            
            carta.dataset.valor = valores[i]
            carta.dataset.naipe = naipes[j]
            
                carta.addEventListener("click", function(){
                    carta.classList.toggle("ativa")

                    atualizarPainel();

                    salvarCartas();
            })
        }
    }
}
criarBaralho(naipes, valores)
carregarCartas()        
atualizarPainel()