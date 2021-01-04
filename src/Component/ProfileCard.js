import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import EditProfileForm from "../Component/EditProfileForm"

class ProfileCard extends React.Component {

    state = {
        editEmailClicked: null,
        deleteProfileClicked: null
    }


    editEmailClickedHandler = () => {
        this.setState(prevState => ({
            editEmailClicked: !prevState.editEmailClicked
        }))  
        console.log(this.state.editEmailClicked) 
    }

    deleteProfileClickedHandler = () => {
        this.setState(prevState => ({
            deleteProfileClicked: !prevState.deleteProfileClicked
        }))    
    }


    

    deleteAccountClickHandler = () => {
        this.deleteAccountHandler(this.props.state.user.id)
    }

    render() {
      
        return (
            <div>
                <Modal
                show={this.props.localAccountClick}
                onHide={this.props.localAccountClickHandler}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Your Account Info
                        </Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            {this.props.user && <h2>Username: {this.props.user.username}</h2>}
                            {this.props.user && <h3>Email: {this.props.user.email}</h3>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.editEmailClickedHandler}>Edit Email</Button>
                    <Button onClick="">Delete Profile</Button>
                </Modal.Footer>
                </Modal> 
                <EditProfileForm 
                    editEmailClickedHandler={this.editEmailClickedHandler}
                    editEmailClicked={this.state.editEmailClicked}
                    user={this.props.user}
                    editAccountHandler={this.props.editAccountHandler}
                /> 
            </div>
        )
    }
}

export default ProfileCard