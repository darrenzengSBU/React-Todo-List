import React, { Component } from 'react'

export class DeleteListDialog extends Component {
    render() {

        if (!this.props.isOpen) {
            return null
        }

        return (
            <div style = {backdropStyle}>
                <div style={style} >
                    <p>Delete list?</p>
                    <strong>Are you sure you want to delete this list?</strong>
                    <p/>
                    <button onClick={this.props.delList}>Yes</button>
                    <button onClick={this.props.onClose}>No</button>
                    <p>The list will not be retrievable.</p>
                </div>
            </div>
           
        )
    }
}

const style = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#E1E4CB',
    padding: '10px'
}

const backdropStyle= {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
}
                
export default DeleteListDialog
