import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        completed: ''
    }

    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }

    getCompleted() {
        if (this.props.todoList) {
            let completed = this.props.todoList.completed
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

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
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
                <ListItemsTable todoList={this.props.todoList} />
            </div>
        )
    }
}

export default ListScreen
