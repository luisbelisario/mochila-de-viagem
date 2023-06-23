const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((item) => {
    criarElemento(item);
})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const existe = itens.find((elemento) => elemento.nome === nome.value);

    let itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;
        console.log(`Esse elemento já existe no array com o id ${existe.id}! O item será atualizado!`);
        atualizarElemento(itemAtual);
        // para atualizar o localStorage basta atualizar meu array de itens
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
        // o meu array itens na posição daquele id será atualizado
    } else {
        console.log(nome);
        console.log(nome.value);
        console.log(quantidade);
        console.log(quantidade.value);

        itemAtual.id = itens[itens.length-1] ? itens[itens.length-1].id + 1 : 0;

        itens.push(itemAtual);

        criarElemento(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));
    // havendo ou não atualização o array será passado para o localStorage, atualizando-o
    // será como se a cada submit eu descartasse o localStorage atual e criasse um novo

    nome.value = "";
    quantidade.value = "";
})

function criarElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const quantidadeItem = document.createElement('strong');
    quantidadeItem.innerHTML = item.quantidade;
    quantidadeItem.dataset.id = item.id;
    // a linha acima adiciona um data attribute ao elemento strong qu contém a quantidade do item
    novoItem.appendChild(quantidadeItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDelete(item.id));

    lista.appendChild(novoItem);
}

function atualizarElemento(item) {
    const elemento = document.querySelector("[data-id='"+item.id+"']");
    console.log('Elemento a ter seu valor atualizado');
    console.log(elemento);
    elemento.innerHTML = item.quantidade;
}

function botaoDelete(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "deletar";

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento(elemento, idElemento) {
    elemento.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === idElemento), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}