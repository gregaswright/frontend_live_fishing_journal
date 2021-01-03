import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class DoubleCheckDeletePin extends React.Component {

    yesClickHandler = () => {
        this.props.deletePinHandler(this.props.selectedPinId)
        this.props.deletePinClickHandler()
    }

    noClickHandler = () => {
        this.props.deletePinClickHandler()
    }
    
    render() {
        return (
            
            <Modal
                show={this.props.deletePinClickHandler}
                onHide={this.props.deletePinClickHandler}
            >
            <Modal.Header closeButton>
              <Modal.Title>Delete Pin?</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <Button onClick={this.yesClickHandler}>Yes, I'm Sure.</Button>
              <Button onClick={this.noClickHandler}>No, Take Me Back.</Button>
            </Modal.Body>
          
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
          
        )
    }
}

export default DoubleCheckDeletePin