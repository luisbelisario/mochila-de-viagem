const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target.elements['nome'].value);
    console.log(event.target.elements['quantidade'].value);

    criaElemento(event.target.elements['nome'].value, event.target.elements['quantidade'].value);
})

function criaElemento(nome, quantidade) {

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const quantidadeItem = document.createElement('strong');
    quantidadeItem.innerHTML = quantidade;
    novoItem.appendChild(quantidadeItem);

    novoItem.innerHTML += nome;

    lista.appendChild(novoItem);
}