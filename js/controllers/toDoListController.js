import List from "../model/list.js"
import Item from "../model/item.js"

import * as StorageController from "./localStorageController.js"
import * as DOMController from "./DOMController.js"

let lists = []
let globalItemID = 0



// Verifica se existe algo no local storage
window.addEventListener("load", function () {
  DOMController.initialLoad()

  if (!StorageController.isEmpty()) {

    const listAux = StorageController.loadLists()
    listAux.map(listData => {
      const list = new List(listData.name)

      listData.itens.forEach(itemData => {
        const item = new Item(
          itemData.id,
          itemData.title,
          itemData.description,
          itemData.isDone)
        list.addItem(item)
      })

      lists.push(list)
      return list
    })
    
    globalItemID = StorageController.loadGlobalID()
    
    DOMController.loadLists(lists)
  }

})

// Cria uma nova lista
function createNewList() {
  let l = new List(DOMController.getNewListName())

  // Se o nome não for vazio
  if (l.name) {
    // Se o nome ainda não foi utilizado
    if (!isNameAlreadyUsed(l.name)) {
      lists.push(l)
    
      StorageController.save(lists, globalItemID)
    
      DOMController.loadLists(lists)
    } else {
      alert("O nome da lista já existe")
    }
  } else {
    alert("A lista deve receber um nome")
  }
}

// Cria um novo item para uma lista
function createNewItem() {
  let itemTitle = DOMController.getNewItemTitle()
  let itemDesc = DOMController.getNewItemDescription()

  if (itemTitle) {
    let i = new Item(
      globalItemID,
      itemTitle,
      itemDesc,
      false
    )
    
    let listName = getSelectedList().name
    let index = getIndexSelectedList(listName)
    
    lists[index].addItem(i)
  
    StorageController.save(lists, globalItemID)
    
    DOMController.loadItens(getItensToLoad())
  
    globalItemID++
  } else {
    alert("O item deve ter ao menos um título")
  }
}

// Altera um item como concluído ou não
function toggleItemAsDone() {
  let id = DOMController.getSelectedItemId()
  let listName = getSelectedList().name
  let listIndex = getIndexSelectedList(listName)
  let itemIndex = lists[listIndex].getItemIndex(id)

  lists[listIndex].itens[itemIndex].toggleDone()

  StorageController.save(lists, globalItemID)
}

// Deleta um item
function deleteItem() {
  let id = DOMController.getSelectedItemId()
  let listName = getSelectedList().name
  let listIndex = getIndexSelectedList(listName)

  lists[listIndex].delItem(id)

  StorageController.save(lists, globalItemID)
}



// Funções auxiliares

function getSelectedList() {
  let selectedList = lists.find((list) => list.name == DOMController.getselectedListId())
  let l = lists[getIndexSelectedList(selectedList.name)]

  return l
}

function getIndexSelectedList(name) {
  const index = lists.findIndex(i => i.name == name)

  return index
}

function getItensToLoad() {
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
  [X] Refatorar função de deletar item
  [X] Refatorar função de marcar item como feito
  [X] Fazer essas funções utilizando os métodos das classes
  
  [ ] Comentar e estruturar melhor código
  [ ] Organizar criação dos elementos no DOMController

  * Lembrar de fazer essas funções ainda dividindo as responsabilidades
  * entre DOM e esse controller
*/

export {
  createNewList, createNewItem,
  getItensToLoad, toggleItemAsDone, deleteItem
}