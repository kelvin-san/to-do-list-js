import * as toDoController from "./toDoListController.js"

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

let accList
let selectedIdItem



function initialLoad() {
  newItemButton.remove()
  newItemCreator.remove()
  newListCreator.remove()
}



function loadLists(lists, getItens) {
  // Limpa o conteúdo do menu lateral
  listMenu.innerHTML = "<h1>Listas</h1>"

  // Itera sobre as listas carregadas e cria elementos HTML para cada uma
  lists.forEach((list) => {
    const newDiv = document.createElement("div")
    newDiv.className = "list"
    newDiv.id = `id:${list.name}`

    const novoSpan = document.createElement("span")
    novoSpan.className = "list-title"
    novoSpan.textContent = list.name

    newDiv.appendChild(novoSpan)

    // Adiciona um ouvinte de evento para lidar com o clique na lista
    newDiv.addEventListener("click", function () {
      selectList(newDiv)
      loadItens(getItens())
    })

    // Adiciona a nova lista ao menu lateral
    listMenu.appendChild(newDiv)
  })

  listMenu.appendChild(newListButton)

  // Reatribui o evento de criação de nova lista após carregar as listas
  newListButton.addEventListener("click", newListButtonAction)
}

newItemButton.addEventListener("click", newItemButtonAction)

function newItemButtonAction() {
  newItemButton.remove()

  newItemTitle.value = ""
  newItemDescription.value = ""

  listContent.append(newItemCreator)
}


function getAccListId() {
  if (accList) {
    let id = accList.id.split(":")[1]
    return id
  }
}


// Função para lidar com a seleção de listas
function selectList(selectedListId) {
  // Percorra todas as listas e remova a classe "selected"
  let listDivs = document.querySelectorAll(".list")
  listDivs.forEach((listDiv) => {
    listDiv.classList.remove("selected")
  })

  // Encontre a lista selecionada com base no ID fornecido
  let selectedList = selectedListId
  accList = selectedListId

  if (selectedList && selectedList != newListButton) {
    // Adicione a classe "selected" à lista selecionada
    selectedList.classList.add("selected")
  }
}

function loadItens(itens) {
  listContent.innerHTML = ''

  if (itens) {
  itens.forEach((item) => {
    // Cria uma div para o item
    let itemDiv = document.createElement("div")
    itemDiv.className = "item"
    itemDiv.id = `itemID:${item.id}`

    // Cria o elemento de título do item
    let titleSpan = document.createElement("span")
    titleSpan.className = "item-title"
    titleSpan.textContent = item.title

    // Cria o elemento de descrição do item
    let descriptionSpan = document.createElement("span")
    descriptionSpan.className = "item-description"
    descriptionSpan.textContent = item.description

    // Cria a div para os botões do item
    let buttonsDiv = document.createElement("div")
    buttonsDiv.className = "item-buttons"

    // Cria a imagem para o botão "Unchecked"
    let uncheckedImg = document.createElement("img")
    if (item.isDone) {
      uncheckedImg.src = "media/icons/checked.svg"
      uncheckedImg.alt = "Checked button"
      itemDiv.classList.add("done")
    } else {
      uncheckedImg.src = "media/icons/unchecked.svg"
      uncheckedImg.alt = "Unchecked button"
    }
    uncheckedImg.id = `doneID:${item.id}`
    
    // Cria a imagem para o botão "Delete"
    let deleteImg = document.createElement("img")
    deleteImg.src = "media/icons/delete.svg"
    deleteImg.alt = "Delete button"
    deleteImg.id = `deleteID:${item.id}`
    
    // Adiciona os elementos à div do item
    buttonsDiv.appendChild(uncheckedImg)
    buttonsDiv.appendChild(deleteImg)

    uncheckedImg.addEventListener("click", function() {
      setSelectedIdItem(item.id)
      toggleDone(item.id)
      toDoController.doneListener()
    })
    deleteImg.addEventListener("click", function() {
      setSelectedIdItem(item.id)
      deleteItem(item.id)
      toDoController.deleteListener()
    })

    itemDiv.appendChild(titleSpan)
    itemDiv.appendChild(descriptionSpan)
    itemDiv.appendChild(buttonsDiv)

    // Adiciona a div do item ao conteúdo da lista
    listContent.appendChild(itemDiv)
  })
  }

  listContent.append(newItemButton)
}

document.addEventListener("click", function(event) {
  if (event.target && event.target.classList.contains("list")) {
    let selectedList = event.target
    selectList(selectedList)
    event = undefined
  }
})



newListButton.addEventListener("click", newListButtonAction)

function newListButtonAction() {
  newListButton.remove()
  listMenu.append(newListCreator)
  newListTitle.value = ""
}

function getNewListName() {
  newListButton.remove()
  listMenu.append(newListCreator)

  let name = newListTitle.value

  return name
}

function getNewItemTitle() {
  return newItemTitle.value
}

function getNewItemDescription() {
  return newItemDescription.value
}



function setSelectedIdItem(id) {
  selectedIdItem = id
}

function getSelectedIdItem(id) {
  return selectedIdItem
}

function toggleDone(id) {
  let itensDOM = Array.from(document.querySelectorAll(".item"))
  const selectedItem = itensDOM.find((div) => div.id.split(':')[1] == id)
  
  if (selectedItem) {
    if (!selectedItem.classList.contains("done")) {
      document.getElementById(`doneID:${id}`).src = "./media/icons/checked.svg"
      document.getElementById(`doneID:${id}`).alt = "Checked button"

      selectedItem.classList.add("done")
    } else {
      document.getElementById(`doneID:${id}`).src = "./media/icons/unchecked.svg"
      document.getElementById(`doneID:${id}`).alt = "Unchecked button"

      selectedItem.classList.remove("done")
    }
  }
}

function deleteItem(id) {
  let itensDOM = Array.from(document.querySelectorAll(".item"))
  const selectedItem = itensDOM.find((div) => div.id.split(':')[1] == id)

  if (selectedItem) {
    selectedItem.remove()
  }
}



export {
  initialLoad, loadLists, loadItens,
  getNewListName,
  getNewItemTitle, getNewItemDescription,
  getAccListId, getSelectedIdItem
}