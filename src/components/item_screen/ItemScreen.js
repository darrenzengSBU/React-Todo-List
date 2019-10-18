import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state = {
        description: 'Unknown',
        assigned_to: 'Unknown',
        due_date: '',
        completed: false
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    markComplete = (e) => this.setState({completed: !this.state.completed})

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state);
        this.setState({
            description: 'Unknown',
            assignedTo: 'Unknown',
            dueDate: '',
            completed: false
        })
    }

    onCancel = (e) => {
        e.preventDefault();
        this.setState({
            description: 'Unknown',
            assignedTo: 'Unknown',
            dueDate: '',
            completed: false
        })
        //console.log(this.state)
        this.props.showListScreen()
        this.props.resetTodoItem()
    }

    modifyItem = (e) => {
        e.preventDefault()
        this.props.modifyItem()
        this.setState({
            description: 'Unknown',
            assignedTo: 'Unknown',
            dueDate: '',
            completed: false
        })
    }

    render() {
        if (this.props.todoItem !== null) {
            return (
                <div id="item_form_container">
                <strong id="item_heading">Item</strong>
                <span id="item_description_prompt" className="item_prompt">
                    Description: 
                </span>
                <input 
                    id="item_description_textfield" 
                    className="item_input"
                    name="description"
                    defaultValue={this.props.todoItem.description}
                    onChange={this.props.modify.bind(this)}/>
                <span id="item_assigned_to_prompt" className="item_prompt">
                    Assigned To: 
                </span>
                <input 
                    id="item_assigned_to_textfield" 
                    className="item_input"
                    name="assigned_to"
                    defaultValue={this.props.todoItem.assigned_to}
                    onChange={this.props.modify.bind(this)}/>
                <span id="item_due_date_prompt" className="item_prompt">
                    Due Date: 
                </span>
                <input 
                    type="date" 
                    id="item_due_date_textfield" 
                    className="item_input"
                    name="due_date"
                    defaultValue={this.props.todoItem.due_date}
                    onChange={this.props.modify.bind(this)}/>
                <span id="item_completed_prompt" className="item_prompt">
                    Completed: 
                </span>
                <input 
                    type="checkbox" 
                    id="item_completed_textfield" 
                    className="item_input"
                    name="completed"
                    defaultChecked={this.props.todoItem.completed}
                    onChange={this.props.modifyCompleted}/>
                <button type="submit" id="item_form_submit_button" onClick={this.modifyItem}>Submit</button>
                <button type="submit" id="item_form_cancel_button" onClick={this.onCancel}>Cancel</button>
            </div>
            )
        }
        
        return (
            <div id="item_form_container">
                <strong id="item_heading">Item</strong>
                <span id="item_description_prompt" className="item_prompt">
                    Description: 
                </span>
                <input 
                    id="item_description_textfield" 
                    className="item_input"
                    name="description"
                    defaultValue={this.state.description}
                    onChange={this.onChange}/>
                <span id="item_assigned_to_prompt" className="item_prompt">
                    Assigned To: 
                </span>
                <input 
                    id="item_assigned_to_textfield" 
                    className="item_input"
                    name="assigned_to"
                    defaultValue={this.state.assigned_to}
                    onChange={this.onChange}/>
                <span id="item_due_date_prompt" className="item_prompt">
                    Due Date: 
                </span>
                <input 
                    type="date" 
                    id="item_due_date_textfield" 
                    className="item_input"
                    name="due_date"
                    defaultValue={this.state.due_date}
                    onChange={this.onChange}/>
                <span id="item_completed_prompt" className="item_prompt">
                    Completed: 
                </span>
                <input 
                    type="checkbox" 
                    id="item_completed_textfield" 
                    className="item_input"
                    name="completed"
                    checked={this.state.completed}
                    onChange={this.markComplete}/>
                <button type="submit" id="item_form_submit_button" onClick={this.onSubmit}>Submit</button>
                <button type="submit" id="item_form_cancel_button" onClick={this.onCancel}>Cancel</button>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    //todoItem: PropTypes.object.isRequired
}

const style = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#E1E4CB',
    padding: '10px'
}

export default ItemScreen
