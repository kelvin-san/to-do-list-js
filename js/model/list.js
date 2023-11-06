class List {
  constructor(nome) {
    this.nome = nome;
    this.itens = [];
  }

  addItem(item) {
    this.itens.push(item);
  }

  rmvItem(id) {
    const indexToRemove = this.itens.findIndex(item => item.id == id);

    if (indexToRemove != -1) {
      this.itens.splice(indexToRemove, 1);
    }
  }
}

export default List