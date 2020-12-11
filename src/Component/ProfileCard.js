import React from 'react'
import EditProfileForm from "../Component/EditProfileForm"

class ProfileCard extends React.Component {

    

    deleteAccountClickHandler = () => {
        this.deleteAccountHandler(this.props.state.user.id)
    }

    render() {
        console.log(this.props.editProfileClicked)
        return (
           
            <div>
                <img src={this.props.user.profile_image} alt={this.props.user.username}/>
                <h2>{this.props.user.username}</h2>
                <h3>{this.props.user.email}</h3>
                <button onClick={this.props.editClickHandler}>Edit Profile</button>
                <button onClick={this.deleteAccountClickHandler}>Delete Profile</button>
                { this.props.editProfileClickedState === true ? <EditProfileForm editAccountHandler={this.props.editAccountHandler} user={this.props.user}/> :
                <></>
                }
            </div>
        )
    }
}

export default ProfileCard