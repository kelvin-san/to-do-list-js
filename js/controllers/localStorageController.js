import List from "../model/list.js"
import Item from "../model/item.js"

function isEmpty() {
  const savedLists = JSON.parse(localStorage.getItem("lists"));

  if (savedLists) {
    return false
  }
  
  return true
}

function loadLists() {
  if (!isEmpty()) {
    const savedLists = JSON.parse(localStorage.getItem("lists"))

    savedLists.map(listData => {
      const list = new List(listData.name, [])

      listData.itens.forEach(itemData => {
        const item = new Item(
          itemData.id,
          itemData.title,
          itemData.description,
          itemData.isDone)
        list.addItem(item)
      });

      return list
    })
    
    return savedLists
  }
}

function loadGlobalID() {
  if (!isEmpty()) {
    const globalID = JSON.parse(localStorage.getItem("globalID"))

    return globalID
  }
}

function save(lists, globalID) {
  localStorage.setItem("lists", JSON.stringify(lists))
  localStorage.setItem("globalID", globalID)
}

export {isEmpty, loadLists, loadGlobalID, save}