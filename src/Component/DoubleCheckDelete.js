import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class DoubleCheckDelete extends React.Component {

    yesClickHandler = () => {
        this.props.deleteJournalEntry(this.props.journalId)
    }

    noClickHandler = () => {
        this.props.deleteJournalEntryClickHandler()
    }
    
    render() {
        return (
            
            <Modal
                show={this.props.deleteJournalEntryClickHandler}
                onHide={this.props.deleteJournalEntryClickHandler}
            >
            <Modal.Header closeButton>
              <Modal.Title>Delete Journal?</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <Button onClick={this.yesClickHandler}>Yes</Button>
              <Button onClick={this.noClickHandler}>No</Button>
            </Modal.Body>
          
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          
        )
    }
}

export default DoubleCheckDelete