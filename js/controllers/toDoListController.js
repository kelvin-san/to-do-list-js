import List from "../model/list.js"
import Item from "../model/item.js"

import * as StorageController from "./localStorageController.js"
import * as DOMController from "./DOMController.js"

// Button and form for a new list
const newListButton = document.querySelector(".new-list-button")
const newListCreator = document.querySelector(".list-creator")
const createListButton = document.getElementById("createListButton")
// Button and form for a new item
const newItemButton = document.querySelector(".new-item-button")
const newItemCreator = document.querySelector(".item-creator")
const createItemButton = document.getElementById("createItemButton")

let lists = []
let globalItemID = 0



// Verifica se existe algo no local storage
window.addEventListener("load", function () {
  DOMController.initialLoad()

  if (!StorageController.isEmpty()) {
    lists = StorageController.loadLists()
    globalItemID = StorageController.loadGlobalID()
    
    DOMController.loadLists(lists, getItens)
  }

})

// Cria uma nova lista
createListButton.addEventListener("click", function () {
  let l = new List(DOMController.getNewListName())

  // Se o nome não for vazio
  if (l.name) {
    // Se o nome ainda não foi utilizado
    if (!isNameAlreadyUsed(l.name)) {
      lists.push(l)
    
      StorageController.save(lists, globalItemID)
    
      DOMController.loadLists(lists, getItens)
    } else {
      alert("O nome da lista já existe")
    }
  } else {
    alert("A lista deve receber um nome")
  }
})

// Cria um novo item para uma lista
createItemButton.addEventListener("click", function () {
  let i = new Item(
    globalItemID,
    DOMController.getNewItemTitle(),
    DOMController.getNewItemDescription()
  )

  getSelectedList().itens.push(i)

  StorageController.save(lists, globalItemID)
  
  DOMController.loadItens(getItens())
})

function getSelectedList() {
  let selectedList = lists.find((list) => list.name === DOMController.getAccListId())

  return selectedList
}



// ???
let getItens = function getItensToLoad() {
  return getSelectedList().itens
}

function isNameAlreadyUsed(name) {
  let listLength = lists.length
  for (let i = 0; i < listLength; i++) {
    if (lists[i].name == name) {
      return true
    }
  }
  return false
}

/*
  ! Parar de criar tudo no DOM
  * Criar objetos aqui e mandar esses objetos para o DOM construir
    [x] Criar funções no DOM para puxar os dados dos forms para poder construir os objetos aqui
    [x] Criar função no DOM para salvar a lista atual e criar um getAccList()
    [x] Função que carrega a lista clicada retornar o nome da lista para marcar aqui e fazer o push
        na posição certa

    * Tirar os event listeners do DOM e suas funções -> testar novas funções e estruturações
      * event listeners
*/