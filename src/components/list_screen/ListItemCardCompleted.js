import React, { Component } from 'react'

export class ListItemCardCompleted extends Component {
    render() {
        if (this.props.completed) {
            return (
                <div>
                    completed
                </div>
            )
        }

        else 
            return (
                <div style={{color:'red'}}>
                    pending
                </div>
            )
        
    }
}

export default ListItemCardCompleted
