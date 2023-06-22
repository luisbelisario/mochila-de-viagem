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

    console.log(nome);
    console.log(nome.value);
    console.log(quantidade);
    console.log(quantidade.value);

    let itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    itens.push(itemAtual);

    localStorage.setItem("itens", JSON.stringify(itens))

    criarElemento(itemAtual);

    nome.value = "";
    quantidade.value = "";
})

function criarElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const quantidadeItem = document.createElement('strong');
    quantidadeItem.innerHTML = item.quantidade;
    novoItem.appendChild(quantidadeItem);

    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);
}