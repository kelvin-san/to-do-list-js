class Item {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isDone = false;
  }

  toggleDone() {
    if (this.isDone) {
      this.isDone = false;
    } else {
      this.isDone = true;
    }
  }
}

export default Item