import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    itemBeingEdited: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  changeName = (listname, name) => {
    this.setState({ todoLists: this.state.todoLists.map(todoList => {
      //console.log(todoList)
      if(todoList.name === listname) {
        todoList.name = name;
      }
      return todoList;
    })})
  }

  changeOwner = (listowner, owner) => {
    this.setState({ todoLists: this.state.todoLists.map(todoList => {
      //console.log(todoList)
      if(todoList.owner === listowner) {
        todoList.owner = owner;
      }
      return todoList;
    })})
  }

  moveUp = (listkey, itemkey) => {
    this.setState({todoLists: this.state.todoLists.map(todoList => {
      if(todoList.key === listkey && itemkey !== 0) {
        let temp = todoList.items[itemkey];
        todoList.items[itemkey].key = (itemkey-1)
        todoList.items[itemkey] = todoList.items[itemkey-1];
        todoList.items[itemkey-1].key = itemkey
        todoList.items[itemkey-1] = temp;
      }
      return todoList;
    })})
  }

  moveDown = (listkey, itemkey) => {
    this.setState({todoLists: this.state.todoLists.map(todoList => {
      if(todoList.key === listkey && typeof todoList.items[itemkey+1] !== 'undefined') {
        let temp = todoList.items[itemkey];
        todoList.items[itemkey].key = (itemkey+1)
        todoList.items[itemkey] = todoList.items[itemkey+1];
        todoList.items[itemkey+1].key = itemkey
        todoList.items[itemkey+1] = temp;
      }
      return todoList;
    })})
  }
  
  delTodo = (listkey, itemkey) => {
    this.setState({ todoLists: this.state.todoLists.map(todoList => {
      if(todoList.key === listkey){
       let item = todoList.items.findIndex(item => item.key === itemkey)
       todoList.items.splice(item,1)
       for (let i=0; i<todoList.items.length; i++) {
          todoList.items[i].key = i;
       }
      }
      return todoList
    })})
  }

  delList = (listKey) => {
    this.setState({todoLists: [...this.state.todoLists.filter(todoList => todoList.key !== listKey)]})
    this.goHome();
  }

  showItemScreen = (e) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN})
  }

  addItem = (details) => {
    // console.log(this.state.currentList.key)
    // console.log(this.state.todoLists[this.state.currentList.key].items.length)
    details.key = this.state.todoLists[this.state.currentList.key].items.length
    // console.log(details)
    this.state.todoLists[this.state.currentList.key].items.push(details)
    this.setState({currentScreen: AppScreen.LIST_SCREEN})
  }

  showListScreen = (e) => {
    //console.log("hi")
    this.setState({currentScreen: AppScreen.LIST_SCREEN})
  }

  editItem = (listkey, itemkey) => {
    // console.log(this.state.todoLists[listKey].items[itemKey])
    // this.setState({itemBeingEdited: this.state.todoLists[listKey].items[itemKey+1]})
    // console.log(this.state.itemBeingEdited)
    // this.showItemScreen()
    this.setState({ todoLists: this.state.todoLists.map(todoList => {
      if(todoList.key === listkey){
       let item = todoList.items[itemkey]
       //console.log(item)
       this.setState({itemBeingEdited: item})
       //console.log(item)
      }
      return todoList
    })})
    //console.log(this.state.itemBeingEdited)
    this.showItemScreen()
  }

  resetTodoItem = (e) => {
    this.setState({itemBeingEdited: null})
  }

  modify = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    let field = e.target.name;
    let value = e.target.value;
    if (field === 'description'){
      this.state.itemBeingEdited.description = value
      this.forceUpdate()}
    if (field === 'assigned_to'){
      this.state.itemBeingEdited.assigned_to = value
      this.forceUpdate()}
    if (field === 'due_date'){
      this.state.itemBeingEdited.due_date = value
      this.forceUpdate()}
  }

  modifyCompleted = (e) => {
    this.state.itemBeingEdited.completed = !this.state.itemBeingEdited.completed
    this.forceUpdate()
  }

  modifyItem = (e) => {
    let itemList = this.state.todoLists[this.state.currentList.key].items
    for(let i=0; i<itemList.length; i++) {
      if (itemList[i].key === this.state.itemBeingEdited.key) {
        itemList[i] = this.state.itemBeingEdited;
      }
    }
    this.resetTodoItem()
    this.setState({currentScreen: AppScreen.LIST_SCREEN})
  }

  createNewList = (e) => {
    let newList =
    {
      "key": this.state.todoLists.length,
      "name": "Unnknown",
      "owner": "Unknown",
      "items": []}
      this.state.todoLists.push(newList);
      console.log(newList)
      console.log(this.state.todoLists)
      this.forceUpdate()
      this.setState({currentList: this.state.todoLists[this.state.todoLists.length-1]})
      this.setState({currentScreen: AppScreen.LIST_SCREEN})
  }

  sortByTask = (listkey, order) => {
    let items = this.state.todoLists[listkey].items
    if (order === 'ascending') {
      items.sort(function(a,b){
        var taskA=a.description.toLowerCase(), taskB=b.description.toLowerCase();
        if (taskA < taskB)
          return -1;
        if (taskA > taskB)
          return 1
        return 0;
      })
      for (let i=0; i<items.length; i++) {
        items[i].key = i;
     }
    }
    else {
      items.sort(function(a,b){
        var taskA=a.description.toLowerCase(), taskB=b.description.toLowerCase();
        if (taskA < taskB)
          return 1;
        if (taskA > taskB)
          return -1
        return 0;
      })
    }
    for (let i=0; i<items.length; i++) {
      items[i].key = i;
   }
  }

  sortByDueDate = (listkey, order) => {
    let items = this.state.todoLists[listkey].items
    if (order === 'ascending') {
      items.sort(function(a,b){
        var taskA=a.due_date.toLowerCase(), taskB=b.due_date.toLowerCase();
        if (taskA < taskB)
          return -1;
        if (taskA > taskB)
          return 1
        return 0;
      })
    }
    else {
      items.sort(function(a,b){
        var taskA=a.due_date, taskB=b.due_date;
        if (taskA < taskB)
          return 1;
        if (taskA > taskB)
          return -1
        return 0;
      })
    }
    for (let i=0; i<items.length; i++) {
      items[i].key = i;
   }
  }

  sortByStatus = (listkey, order) => {
    let items = this.state.todoLists[listkey].items
    if (order === 'ascending') {
      items.sort(function(a,b){
        var taskA=a.completed, taskB=b.completed;
        if (taskA < taskB)
          return -1;
        if (taskA > taskB)
          return 1
        return 0;
      })
    }
    else {
      items.sort(function(a,b){
        var taskA=a.completed, taskB=b.completed;
        if (taskA < taskB)
          return 1;
        if (taskA > taskB)
          return -1
        return 0;
      })
    }
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists}
        createNewList={this.createNewList} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          changeName={this.changeName}
          changeOwner={this.changeOwner}
          moveUp={this.moveUp}
          moveDown={this.moveDown}
          delTodo={this.delTodo}
          delList={this.delList}
          showItemScreen={this.showItemScreen}
          editItem={this.editItem}
          sortByTask={this.sortByTask}
          sortByDueDate={this.sortByDueDate}
          sortByStatus={this.sortByStatus}/>; 
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          currentScreen={this.state.currentScreen}
          todoItem={this.state.itemBeingEdited}
          addItem={this.addItem}
          showListScreen={this.showListScreen}
          resetTodoItem={this.resetTodoItem}
          modify={this.modify}
          modifyCompleted={this.modifyCompleted}
          modifyItem = {this.modifyItem}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;