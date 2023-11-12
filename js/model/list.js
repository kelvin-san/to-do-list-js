import Item from "./item.js"

class List {
  constructor(name) {
    this.name = name
    this.itens = []
  }

  buildItem(item) {
    let i = new Item(
      item.id,
      item.title,
      item.description,
      item.isDone
    )

    return i
  }

  addItem(item) {
    let i = this.buildItem(item)

    this.itens.push(i)
  }

  delItem(id) {
    const indexToRemove = this.itens.findIndex(item => item.id == id)

    if (indexToRemove != -1) {
      this.itens.splice(indexToRemove, 1)
    }
  }

  getItemIndex(id) {
    const index = this.itens.findIndex(item => item.id == id)

    return index
  }

  getItem(id) {
    let item = this.itens[this.getItemIndex(id)]
    let i = this.buildItem(item)

    return i
  }
}

export default List