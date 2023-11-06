import List from "../model/list.js"
import Item from "../model/item.js"

// Containers
const listMenu = document.querySelector(".side-menu")
const listContent = document.querySelector(".list-content")

// Button and form for a new list
let newListButton = document.querySelector(".new-list-button")
let newListCreator = document.querySelector(".list-creator")

// Inputs for a new list
const newListTitle = document.getElementById("newListTitle")
const createListButton = document.getElementById("createListButton")

// Button and form for a new item
let newItemButton = document.querySelector(".new-item-button")
let newItemCreator = document.querySelector(".item-creator")

// Inputs for a new item
const newItemTitle = document.getElementById("newItemTitle")
const newItemDescription = document.getElementById("newItemDescription")
const createItemButton = document.getElementById("createItemButton")

let lastList
let lastItem

let globalItemID

let lists = []
let accList



function initialLoad() {
  newItemButton.remove()
  newItemCreator.remove()
  newListCreator.remove()
}



function setGlobalItemID(id) {
  globalItemID = id
}



function loadLists(lists) {
  // const listMenu = document.querySelector(".side-menu");
  console.log("carreg")


  // Limpa o conteúdo do menu lateral
  listMenu.innerHTML = "<h1>Listas</h1>";

  // Carrega as listas salvas do localStorage
  // const savedLists = JSON.parse(localStorage.getItem("lists"));

  // if (savedLists) {
    // Itera sobre as listas carregadas e cria elementos HTML para cada uma
    lists.forEach((list) => {
      const newDiv = document.createElement("div");
      newDiv.className = "list";
      newDiv.id = `id:${list.nome}`;

      const novoSpan = document.createElement("span");
      novoSpan.className = "list-title";
      novoSpan.textContent = list.nome;

      newDiv.appendChild(novoSpan);

      // Adiciona um ouvinte de evento para lidar com o clique na lista
      newDiv.addEventListener("click", function () {
        selectList(newDiv);
        loadItens(newDiv);
      });

      // Adiciona a nova lista ao menu lateral
      listMenu.appendChild(newDiv);
    });
  // }

  listMenu.appendChild(newListButton)

  // Reatribui o evento de criação de nova lista após carregar as listas
  newListButton.addEventListener("click", newListButtonAction);
}



function newItemButtonAction(globalItemID) {
  newItemButton.remove();

  let aux = newItemCreator;

  listContent.append(newItemCreator);

  function createItem() {
    let itemDiv = document.createElement("div");

    itemDiv.className = "item";
    itemDiv.id = `itemID:${globalItemID}`;

    let title = newItemTitle.value;
    let desc = newItemDescription.value;

    // Cria o elemento de título do item
    let titleSpan = document.createElement("span");
    titleSpan.className = "item-title";
    titleSpan.textContent = title;

    // Cria o elemento de descrição do item
    let descriptionSpan = document.createElement("span");
    descriptionSpan.className = "item-description";
    descriptionSpan.textContent = desc;

    // Cria a div para os botões do item
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "item-buttons";

    // Cria a imagem para o botão "Unchecked"
    let uncheckedImg = document.createElement("img");
    uncheckedImg.src = "media/icons/unchecked.svg";
    uncheckedImg.alt = "Unchecked button";
    uncheckedImg.id = `doneID:${globalItemID}`

    // Cria a imagem para o botão "Delete"
    let deleteImg = document.createElement("img");
    deleteImg.src = "media/icons/delete.svg";
    deleteImg.alt = "Delete button";
    deleteImg.id = `deleteID:${globalItemID}`

    // Adiciona os elementos à div do item
    buttonsDiv.appendChild(uncheckedImg);
    buttonsDiv.appendChild(deleteImg);

    itemDiv.appendChild(titleSpan);
    itemDiv.appendChild(descriptionSpan);
    itemDiv.appendChild(buttonsDiv);

    // Adiciona a div do item ao conteúdo da lista
    listContent.appendChild(itemDiv);
    newItemCreator.remove();
    newItemCreator = itemDiv;
    listContent.appendChild(newItemCreator);
    listContent.appendChild(newItemButton);
    newItemCreator = aux;

    let selectedListName = accList.querySelector(".list-title").textContent;

    // Encontre a lista selecionada com base no nome
    let selectedList = lists.find((list) => list.nome === selectedListName);

    if (selectedList) {
      // Crie o item
      let item = new Item(globalItemID, title, desc, false);
      lastItem = item

      // Adicione o item à lista selecionada
      // selectedList.itens.push(item);
      // saveLists();
    }

    createItemButton.removeEventListener("click", createItem);
    newItemTitle.value = "";
    newItemDescription.value = "";
  }

  createItemButton.addEventListener("click", createItem);
  globalItemID++;
}

newItemButton.addEventListener("click", newItemButtonAction)


function getLastItem() {
  return lastItem
}



// Função para lidar com a seleção de listas
function selectList(selectedListId) {
  // Percorra todas as listas e remova a classe "selected"
  let listDivs = document.querySelectorAll(".list");
  listDivs.forEach((listDiv) => {
    listDiv.classList.remove("selected");
  });

  // Encontre a lista selecionada com base no ID fornecido
  let selectedList = selectedListId
  accList = selectedListId

  if (selectedList && selectedList != newListButton) {
    // Adicione a classe "selected" à lista selecionada
    selectedList.classList.add("selected");
  }
}


function loadItens(selectedListId) {
  // Encontre o elemento span com a classe "list-title" dentro da lista selecionada
  let selectedListTitle = selectedListId.querySelector(".list-title");

  if (selectedListTitle) {
    let selectedListName = selectedListId.id.split(":")[1]; // Obtém o nome da lista selecionada

    // Encontre a lista selecionada com base no nome
    let selectedList = lists.find((list) => list.nome === selectedListName);

    if (selectedList) {
      listContent.innerHTML = ''; // Limpa o conteúdo anterior

      selectedList.itens.forEach((item) => {
      // Cria uma div para o item
      let itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.id = `itemID:${item.id}`;

      // Cria o elemento de título do item
      let titleSpan = document.createElement("span");
      titleSpan.className = "item-title";
      titleSpan.textContent = item.title;

      // Cria o elemento de descrição do item
      let descriptionSpan = document.createElement("span");
      descriptionSpan.className = "item-description";
      descriptionSpan.textContent = item.description;

      // Cria a div para os botões do item
      let buttonsDiv = document.createElement("div");
      buttonsDiv.className = "item-buttons";

      // Cria a imagem para o botão "Unchecked"
      let uncheckedImg = document.createElement("img");
      if (item.isDone) {
        uncheckedImg.src = "media/icons/checked.svg";
        itemDiv.classList.add("done")
      } else {
        uncheckedImg.src = "media/icons/unchecked.svg";
      }
      uncheckedImg.alt = "Unchecked button";
      uncheckedImg.id = `doneID:${item.id}`

      // Cria a imagem para o botão "Delete"
      let deleteImg = document.createElement("img");
      deleteImg.src = "media/icons/delete.svg";
      deleteImg.alt = "Delete button";
      deleteImg.id = `deleteID:${item.id}`

      // Adiciona os elementos à div do item
      buttonsDiv.appendChild(uncheckedImg);
      buttonsDiv.appendChild(deleteImg);

      itemDiv.appendChild(titleSpan);
      itemDiv.appendChild(descriptionSpan);
      itemDiv.appendChild(buttonsDiv);

      // Adiciona a div do item ao conteúdo da lista
      listContent.appendChild(itemDiv);
      });
    }

    listContent.append(newItemButton)
  }
}

// Exemplo de como usar a função ao clicar em uma lista
document.addEventListener("click", function(event) {
  if (event.target && event.target.classList.contains("list")) {
    let selectedList = event.target;
    selectList(selectedList);
    loadItens(selectedList); // Carrega os itens da lista selecionada
    event = undefined
  }
});





newListButton.addEventListener("click", newListButtonAction)

function newListButtonAction() {
  newListButton.remove();
  let aux = newListCreator;
  listMenu.append(newListCreator);

  function createList() {
    let name = newListTitle.value;

    if (name) {

    if (!isNameAlreadyUsed(name)) {
      let list = new List(name, []);
      console.log(list)
      lastList = list


      let novaDiv = document.createElement("div");
      novaDiv.className = "list";
      novaDiv.id = `id:${name}`
      let novoSpan = document.createElement("span");
      novoSpan.className = "list-title";
      newListTitle.value = "";
      novoSpan.textContent = name;
      novaDiv.appendChild(novoSpan);

      newListCreator.remove();
      newListCreator = novaDiv;
      listMenu.appendChild(newListCreator);
      listMenu.append(newListButton);

      newListCreator = aux;


      // lists.push(list);
      // saveLists();
      createListButton.removeEventListener("click", createList);
    } else {
      // Nome duplicado, trate de acordo com sua lógica
      alert("O nome da lista já existe.");
      createListButton.addEventListener("click", createList);
    }
  } else {
    alert("A lista deve receber um nome")
  }

  }

  createListButton.addEventListener("click", createList);
}

function getLastList() {
  console.log(lastList)
  return lastList
}

// Função para verificar se o nome já foi usado
function isNameAlreadyUsed(name) {
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].nome == name) {
      return true; // Nome já existe
    }
  }
  return false; // Nome não existe
}



export {initialLoad, loadLists, getLastList, newListButtonAction, getLastItem,
  newItemButtonAction, setGlobalItemID}