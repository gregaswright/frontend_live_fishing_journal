import React from 'react'
import MyFishCard from '../Component/MyFishCard'
import Modal from 'react-bootstrap/Modal'

class MyFishContainer extends React.Component {

    renderMySpices = () => {
        return this.props.mySpecies.map(creature => <MyFishCard key={creature.id} creature={creature} removeFromMySpecies={this.props.removeFromMySpecies}/>)
    }

    render() {
        return (
            <>
                <Modal
                    show={this.props.localMyFishClick}
                    onHide={this.props.localMyFishClickHandler}
                    dialogClassName="Modal"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                    <Modal.Title className="ModalHeader" id="example-custom-modal-styling-title">
                        My Species
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ModalBody">
                       {this.renderMySpices()}
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>  
            </>
        )
    }
}

export default MyFishContainer