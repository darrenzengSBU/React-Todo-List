import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header">Task</div>
                    <div className="list_item_due_date_header">Due Date</div>
                    <div className="list_item_status_header">Status</div>
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
