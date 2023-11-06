class Item {
  constructor(id, title, description, isDone) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isDone = isDone;
  }

  toggleDone() {
    if (this.isDone) {
      this.isDone = false;
    } else {
      this.isDone = true;
    }
  }
}
