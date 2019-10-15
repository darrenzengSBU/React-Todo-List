import React, { Component } from 'react'
import ListItemCardCompleted from './ListItemCardCompleted'

export class ListItemCard extends Component {
    render() {
        return (
            <div className='list_item_card' onClick={this.props.editItem.bind(this, this.props.listItem.key)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className='list_item_card_completed'>
                    <ListItemCardCompleted completed = {this.props.listItem.completed}/>
                </div>
                <div onClick={e => e.stopPropagation()} className='list_item_card_toolbar'>
                    <button className='list_item_card_button' onClick={this.props.moveUp.bind(this, this.props.listItem.key)}>&#x21e7;</button>
                    <button className='list_item_card_button' onClick={this.props.moveDown.bind(this, this.props.listItem.key)}>&#x21e9;</button>
                    <button className='list_item_card_button' onClick={this.props.delTodo.bind(this, this.props.listItem.key)}>&#10005;</button>
                </div>
            </div>
        )
    }
}

export default ListItemCard
