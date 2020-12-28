import React from 'react'
import FormControl from 'react-bootstrap/FormControl'

class FishSearchForm extends React.Component {


    render() {
        return (
            <div>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.props.searchValue} onChange={this.props.searchHandler}/>
            </div>
        )
    }
}

export default FishSearchForm