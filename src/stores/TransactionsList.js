import { observable, action } from 'mobx'

export class ShoppingList {
  @observable transactions = []
  @observable length
  @action checkItem = name => {
    let item = this.list.find(i => i.name === name)
    item.completed = !item.completed
  }
  @action addItem = name => {
    this.list.push(new Item(name))
  }
  @action editItem = (name, location) => {
    let item = this.list.find(i => i.name === name)
    item.location = location
  }
  @action deleteItem = name => {
    let index = this.list.findIndex(i => i.name === name)
    this.list.splice(index, 1)
  }
}
