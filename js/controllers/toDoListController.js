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



// Action Listeners

// Verifica se existe algo no local storage
window.addEventListener("load", function () {
  DOMController.initialLoad()

  if (StorageController.isEmpty()) {
    console.log("tem")
    lists = StorageController.loadLists()
    globalItemID = StorageController.loadGlobalID()
    
    setTimeout(function () {
      DOMController.loadLists(lists)
      DOMController.setGlobalItemID(globalItemID)
    }, 500)
  } else {
    DOMController.initialLoad()
  }
})

// Cria uma nova lista
createListButton.addEventListener("click", function () {
  setTimeout(function () {
  lists.push(DOMController.getLastList())
  console.log(DOMController.getLastList())

  StorageController.save(lists, globalItemID)
  }, 500)
})

// Cria um novo item para uma lista
createItemButton.addEventListener("click", function () {
  DOMController.setGlobalItemID(globalItemID)

  setTimeout(function () {
  lists.push(DOMController.getLastItem())
  console.log(DOMController.getLastItem())

  StorageController.save(lists, globalItemID)
  }, 500)
})

// Função que carrega a lista clicada retornar o nome da lista para marcar aqui e fazer o push
// na posição certa


/*
  ! Parar de criar tudo no DOM
  * Criar objetos aqui e mandar esses objetos para o DOM construir
    * Criar funções no DOM para puxar os dados dos forms para poder construir os objetos aqui
    * Criar função no DOM para salvar a lista atual e criar um getAccList()

*/