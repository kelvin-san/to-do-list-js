class Item {
  constructor(id, title, description, isDone) {
    this.id = id
    this.title = title
    this.description = description
    this.isDone = isDone
  }

  toggleDone() {
    this.isDone = !this.isDone
  }
}

export default Item