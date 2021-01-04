import React from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

class editProfileForm extends React.Component {
    state = {
        email: "",
        profile_image: ""
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.editAccountHandler(this.props.user.id, this.state)
    }

    render(){
        console.log(this.props.user)
        return (
            <Modal
            show={this.props.editEmailClicked}
            onHide={this.props.editEmailClickedHandler}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                     Edit Your Email
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>New Email Address</Form.Label>
                    <Form.Control type="text" name="email" placeholder="Enter New Email" value={this.state.email} onChange={this.changeHandler} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>              
                </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </Modal>  
            // <form onSubmit={this.submitHandler}>
            //     <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler}/>
            //     <input type="text" name="profile_image" placeholder="profile_image" value={this.state.profile_image} onChange={this.changeHandler}/>
            //     <input type="submit" value="Edit One or Both Fields"/>
            // </form>
        )
    }
    
}
export default editProfileForm