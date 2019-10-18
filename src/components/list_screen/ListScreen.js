import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';
import DeleteListDialog from './DeleteListDialog';

export class ListScreen extends Component {
    state = {
        key: '',
        name: '',
        owner: '',
        completed: '',
        deleteListDialogIsOpen: false
    }

    getKey() {
        if(this.props.todoList) {
            return this.props.todoList.key;
        }
    }

    getListName() {
        if (this.props.todoList) {
            //let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            //let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }

    getCompleted() {
        if (this.props.todoList) {
            //let completed = this.props.todoList.completed
            return this.props.todoList.owner;
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    changeName = (e) => {
        e.preventDefault();
        this.props.changeName(this.getListName(),this.state.name);
    }

    changeOwner = (e) => {
        e.preventDefault();
        this.props.changeOwner(this.getListOwner(),this.state.owner)
    }

    moveUp = (e) => {
        this.props.moveUp(this.getKey(), e)
    }

    moveDown = (e) => {
        this.props.moveDown(this.getKey(), e)
    }

    delTodo = (e) => {
        this.props.delTodo(this.getKey(), e)
    }

    delList = (e) => {
        this.props.delList(this.getKey())
    }

    showItemScreen = (e) => {
        this.props.showItemScreen()
    }

    editItem = (e) => {
        this.props.editItem(this.getKey(), e)
    }

    sortByTask = (e, order) => {
        this.props.sortByTask(this.getKey(), order)
    }

    sortByDueDate = (e, order) => {
        this.props.sortByDueDate(this.getKey(), order)
    }

    sortByStatus = (e, order) => {
        this.props.sortByStatus(this.getKey(), order)
    }

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash onClick={(e) => this.setState({deleteListDialogIsOpen: true})}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input
                            name="name" 
                            defaultValue={this.getListName()}  
                            onChange={this.onChange}
                            onKeyUp={this.changeName}
                            type="text" 
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            name="owner"
                            defaultValue={this.getListOwner()}
                            onChange={this.onChange}
                            onKeyUp={this.changeOwner}
                            type="text" 
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable 
                    todoList={this.props.todoList} 
                    moveUp={this.moveUp} 
                    moveDown={this.moveDown}
                    delTodo={this.delTodo}
                    showItemScreen={this.showItemScreen}
                    editItem={this.editItem}
                    sortByTask={this.sortByTask}
                    sortByDueDate={this.sortByDueDate}
                    sortByStatus={this.sortByStatus}/>
                <DeleteListDialog 
                    isOpen={this.state.deleteListDialogIsOpen} 
                    onClose={(e) => this.setState({deleteListDialogIsOpen:false})}
                    delList= {this.delList}/>
            </div>
        )
    }
}

// PropTypes
ListScreen.propTypes = {
    todoList: PropTypes.object.isRequired
}

export default ListScreen
