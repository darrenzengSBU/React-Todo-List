import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    state = {
        task : 'ascending',
        due_date : 'ascending',
        status : 'ascending'
    }

    sortByTask = (e) => {
        this.props.sortByTask(e, this.state.task)
        if (this.state.task === 'ascending')
            this.setState({task: 'descending'})
        else this.setState({task: 'ascending'})
    }

    sortByDueDate = (e) => {
        this.props.sortByDueDate(e, this.state.due_date)
        if (this.state.due_date === 'ascending')
            this.setState({due_date: 'descending'})
        else this.setState({due_date: 'ascending'})
    }

    sortByStatus = (e) => {
        this.props.sortByStatus(e, this.state.status)
        if (this.state.status === 'ascending')
            this.setState({status: 'descending'})
        else this.setState({status: 'ascending'})
    }



    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header" onClick = {this.sortByTask}>Task</div>
                    <div className="list_item_due_date_header" onClick = {this.sortByDueDate}>Due Date</div>
                    <div className="list_item_status_header" onClick = {this.sortByStatus}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem}
                            moveUp={this.props.moveUp}
                            moveDown={this.props.moveDown}
                            delTodo={this.props.delTodo}
                            editItem={this.props.editItem}/>
                    ))
                }
                <div className='list_item_add_card' onClick = {this.props.showItemScreen}>+</div>
            </div>
        )
    }
}

export default ListItemsTable
