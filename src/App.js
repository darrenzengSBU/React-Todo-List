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
    currentList: null
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
      console.log(todoList)
      if(todoList.name === listname) {
        todoList.name = name;
      }
      return todoList;
    })})
  }

  changeOwner = (listowner, owner) => {
    this.setState({ todoLists: this.state.todoLists.map(todoList => {
      console.log(todoList)
      if(todoList.owner === listowner) {
        todoList.owner = owner;
      }
      return todoList;
    })})
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          changeName={this.changeName}
          changeOwner={this.changeOwner} />; 
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;