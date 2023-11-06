const listMenu = document.querySelector(".side-menu")
let newListButton = document.querySelector(".new-list-button")
let newListCreator = document.querySelector(".list-creator")
const createListButton = document.getElementById("createListButton")
const newListTitle = document.getElementById("newListTitle")

let newItemButton = document.querySelector(".new-item-button")
let newItemCreator = document.querySelector(".item-creator")
const newItemTitle = document.getElementById("newItemTitle")
const newItemDescription = document.getElementById("newItemDescription")
const createItemButton = document.getElementById("createItemButton")

const listContent = document.querySelector(".list-content")

var globalItemID = 0;

let lists = []
let accList

newItemButton.remove();
newItemCreator.remove();

window.addEventListener("load", function () {
  const savedLists = JSON.parse(localStorage.getItem("lists"));
  if (savedLists) {
    lists = savedLists.map(listData => {
      // Crie instâncias da classe List com base nos dados salvos
      const list = new List(listData.nome, []);

      // Itere sobre os itens do array itens[] do listData
      listData.itens.forEach(itemData => {
        const item = new Item(itemData.id, itemData.title, itemData.description, itemData.isDone);
        list.itens.push(item);
      });

      // console.log(savedLists)
      return list;
    });
    globalItemID = localStorage.getItem("globalID")
    loadLists();
  } else {
    newListCreator.remove()
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

      let list = new List(name, []);
      lists.push(list);
      saveLists();
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

// Função para verificar se o nome já foi usado
function isNameAlreadyUsed(name) {
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].nome == name) {
      return true; // Nome já existe
    }
  }
  return false; // Nome não existe
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



newItemButton.addEventListener("click", newItemButtonAction)

function newItemButtonAction() {
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

    // Adicione o item à lista selecionada
    selectedList.itens.push(item);
    saveLists();
  }

  createItemButton.removeEventListener("click", createItem);
  newItemTitle.value = "";
  newItemDescription.value = "";
  }

  createItemButton.addEventListener("click", createItem);
  globalItemID++;
}

function toggleDone(event) {
  // Verifica se o elemento clicado é uma imagem com ID começando por "doneID"
  if (event.target && event.target.tagName === 'IMG' && event.target.id.startsWith('doneID')) {
    const itemId = parseInt(event.target.id.split(':')[1]); // Extrai o ID do item a partir do ID da imagem
    const selectedListName = accList.querySelector(".list-title").textContent; // Obtém o nome da lista selecionada

    // Encontre a lista selecionada com base no nome
    const selectedList = lists.find((list) => list.nome === selectedListName);

    if (selectedList) {
      // Encontre o item na lista com base no ID
      const selectedItem = selectedList.itens.find((item) => item.id === itemId);

      if (selectedItem) {
        // Altera o estado isDone
        selectedItem.isDone = !selectedItem.isDone;

        // Altera a imagem da imagem clicada
        if (selectedItem.isDone) {
          event.target.src = "media/icons/checked.svg";
          event.target.alt = "Checked button";
          document.getElementById(`itemID:${itemId}`).classList.add("done");
        } else {
          event.target.src = "media/icons/unchecked.svg";
          event.target.alt = "Unchecked button";
          document.getElementById(`itemID:${itemId}`).classList.remove("done");
        }
      }
      saveLists();
    }
  }
}

// Adicione um ouvinte de evento ao documento para lidar com o clique nas imagens
document.addEventListener("click", toggleDone);

function deleteItem(event) {
  // Verifica se o elemento clicado é uma imagem com ID começando por "deleteID"
  if (event.target && event.target.tagName === 'IMG' && event.target.id.startsWith('deleteID')) {
    const itemId = parseInt(event.target.id.split(':')[1]); // Extrai o ID do item a partir do ID da imagem
    const selectedListName = accList.querySelector(".list-title").textContent; // Obtém o nome da lista selecionada

    // Encontre a lista selecionada com base no nome
    const selectedList = lists.find((list) => list.nome === selectedListName);

    if (selectedList) {
      // Encontre o item na lista com base no ID
      const selectedItem = selectedList.itens.find((item) => item.id === itemId);

      if (selectedItem) {
        // Remova o item da lista
        selectedList.rmvItem(itemId);

        // Remova o elemento da tela
        const itemElement = document.getElementById(`itemID:${itemId}`);
        if (itemElement) {
          itemElement.remove();
        }

        // Salve as alterações
        saveLists();
      }
    }
  }
}

// Adicione um ouvinte de evento ao documento para lidar com o clique nas imagens de delete
document.addEventListener("click", deleteItem);



function saveLists() {
  localStorage.setItem("lists", JSON.stringify(lists));
  localStorage.setItem("globalID", globalItemID)
}

function loadLists() {
  const listMenu = document.querySelector(".side-menu");

  // Limpa o conteúdo do menu lateral
  listMenu.innerHTML = "<h1>Listas</h1>";

  // Carrega as listas salvas do localStorage
  const savedLists = JSON.parse(localStorage.getItem("lists"));

  if (savedLists) {
    // Itera sobre as listas carregadas e cria elementos HTML para cada uma
    savedLists.forEach((list) => {
      const novaDiv = document.createElement("div");
      novaDiv.className = "list";
      novaDiv.id = `id:${list.nome}`;

      const novoSpan = document.createElement("span");
      novoSpan.className = "list-title";
      novoSpan.textContent = list.nome;

      novaDiv.appendChild(novoSpan);

      // Adiciona um ouvinte de evento para lidar com o clique na lista
      novaDiv.addEventListener("click", function () {
        selectList(novaDiv);
        loadItens(novaDiv);
      });

      // Adiciona a nova lista ao menu lateral
      listMenu.appendChild(novaDiv);
    });
  }

  listMenu.appendChild(newListButton)

  // Reatribui o evento de criação de nova lista após carregar as listas
  newListButton.addEventListener("click", newListButtonAction);
}
