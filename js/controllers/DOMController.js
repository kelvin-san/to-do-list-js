import * as toDoController from "./toDoListController.js"

// Images
const checkedImage = {
  path: "./media/icons/checked.svg",
  alt: "Checked button"
}
const uncheckedImage = {
  path: "./media/icons/unchecked.svg",
  alt: "Unchecked button"
}
const deleteImage = {
  path: "./media/icons/delete.svg",
  alt: "Delete button"
}

// Containers
const listMenu = document.querySelector(".side-menu")
const listContent = document.querySelector(".list-content")

// Button and form for a new list
let newListButton = document.querySelector(".new-list-button")
let newListCreator = document.querySelector(".list-creator")

// Inputs for a new list
const newListTitle = document.querySelector("#newListTitle")
const createListButton = document.querySelector("#createListButton")

// Button and form for a new item
let newItemButton = document.querySelector(".new-item-button")
let newItemCreator = document.querySelector(".item-creator")

// Inputs for a new item
const newItemTitle = document.querySelector("#newItemTitle")
const newItemDescription = document.querySelector("#newItemDescription")
const createItemButton = document.querySelector("#createItemButton")

// Others
let selectedListId
let selectedItemId


// Carregamento inicial

function initialLoad() {
  newItemButton.remove()
  newItemCreator.remove()
  newListCreator.remove()
}


// Listas

newListButton.addEventListener("click", newListButtonAction)

function newListButtonAction() {
  newListButton.remove()

  listMenu.append(newListCreator)

  newListTitle.value = ''
}

function loadLists(lists) {
  // Limpa o conteúdo do menu lateral
  listMenu.innerHTML = "<h1>Listas</h1>"

  lists.forEach((list) => {
    const newDiv = document.createElement("div")
    newDiv.className = "list"
    newDiv.id = `id:${list.name}`

    const newSpan = document.createElement("span")
    newSpan.className = "list-title"
    newSpan.textContent = list.name

    newDiv.appendChild(newSpan)

    // Adiciona um event listener para lidar com o clique na lista
    newDiv.addEventListener("click", function () {
      selectList(newDiv)
      loadItens(toDoController.getItensToLoad())
    })

    listMenu.appendChild(newDiv)
  })

  // Adiciona novamente o botão para a criação de uma nova lista
  listMenu.appendChild(newListButton)

  // Reatribui o evento de criação de nova lista após carregar as listas
  newListButton.addEventListener("click", newListButtonAction)
}

// Chama a lógica de criação de um novo item
createListButton.addEventListener("click", function () {
  toDoController.createNewList()
})

// Marca uma lista como selecionada
function selectList(selectedList) {
  let listDivs = document.querySelectorAll(".list")
  listDivs.forEach((listDiv) => {
    listDiv.classList.remove("selected")
  })

  selectedListId = selectedList

  if (selectedList != newListButton) {
    selectedList.classList.add("selected")
  }
}

// Event listener para as listas
document.querySelectorAll(".lists").forEach((listDiv) => {
  listDiv.addEventListener("click", function(event) {
    let selectedList = event.target
    selectList(selectedList)
    event = undefined
  })
})



// Itens

newItemButton.addEventListener("click", newItemButtonAction)

function newItemButtonAction() {
  newItemButton.remove()

  newItemTitle.value = ""
  newItemDescription.value = ""

  listContent.append(newItemCreator)
}

createItemButton.addEventListener("click", function () {
  toDoController.createNewItem()
})

function loadItens(itens) {
  listContent.innerHTML = ''

  if (itens) {
  itens.forEach((item) => {
    let itemDiv = document.createElement("div")
    itemDiv.className = "item"
    itemDiv.id = `itemID:${item.id}`

    let titleSpan = document.createElement("span")
    titleSpan.className = "item-title"
    titleSpan.textContent = item.title

    let descriptionSpan = document.createElement("span")
    descriptionSpan.className = "item-description"
    descriptionSpan.textContent = item.description

    let buttonsDiv = document.createElement("div")
    buttonsDiv.className = "item-buttons"

    let doneImg = document.createElement("img")
    if (item.isDone) {
      doneImg.src = checkedImage.path
      doneImg.alt = checkedImage.alt
      itemDiv.classList.add("done")
    } else {
      doneImg.src = uncheckedImage.path
      doneImg.alt = uncheckedImage.alt
    }
    doneImg.id = `doneID:${item.id}`
    
    let deleteImg = document.createElement("img")
    deleteImg.src = deleteImage.path
    deleteImg.alt = deleteImage.alt
    deleteImg.id = `deleteID:${item.id}`
    
    buttonsDiv.appendChild(uncheckedImg)
    buttonsDiv.appendChild(deleteImg)

    doneImg.addEventListener("click", function() {
      setSelectedItemId(item.id)
      toggleDone(item.id)
      toDoController.toggleItemAsDone()
    })
    deleteImg.addEventListener("click", function() {
      setSelectedItemId(item.id)
      deleteItem(item.id)
      toDoController.deleteItem()
    })

    itemDiv.appendChild(titleSpan)
    itemDiv.appendChild(descriptionSpan)
    itemDiv.appendChild(buttonsDiv)

    listContent.appendChild(itemDiv)
  })
  }

  listContent.append(newItemButton)
}



// Operações itens

function toggleDone(id) {
  let itensDOM = Array.from(document.querySelectorAll(".item"))
  const selectedItem = itensDOM.find((div) => div.id.split(':')[1] == id)
  
  if (selectedItem) {
    if (!selectedItem.classList.contains("done")) {
      document.getElementById(`doneID:${id}`).src = checkedImage.path
      document.getElementById(`doneID:${id}`).alt = checkedImage.alt

      selectedItem.classList.add("done")
    } else {
      document.getElementById(`doneID:${id}`).src = uncheckedImage.path
      document.getElementById(`doneID:${id}`).alt = uncheckedImage.alt

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



// Operações auxiliares

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

function getselectedListId() {
  if (selectedListId) {
    let id = selectedListId.id.split(":")[1]
    return id
  }
}

function setSelectedItemId(id) {
  selectedItemId = id
}

function getSelectedItemId() {
  return selectedItemId
}



export {
  initialLoad, loadLists, loadItens,
  getNewListName, getNewItemTitle, getNewItemDescription,
  getselectedListId, getSelectedItemId
}