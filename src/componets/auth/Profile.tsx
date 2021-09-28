import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom'
// import GalleryEdit from '../Gallery/GalleryEdit';
// import GalleryIndex from '../Gallery/GalleryIndex';
import {GalleryIndex} from '../index'


type Props = {
    token: string,
    updateToken(newToken: string): void,
    GalleryEdit(newGallery: Gallery): void,
    userId:number | null


}

type Gallery = {
    id: string,
    exhibitName: string,
    image: string,
    url: string,
    description: string,
    userId: string,
}

class Profile extends Component<Props, {}> {

    render() {

        if (this.props.token === "") {
            return (<Redirect to='/user/login' />)} 

            return (
                <div>
                    <Link to='/gallery/create'>
                        <Button className="card-btn">Add a Gallery</Button></Link>

                    <GalleryIndex token={this.props.token}
                        updateToken={this.props.updateToken}
                        GalleryEdit={this.props.GalleryEdit}
                        userId={this.props.userId}

                         />
                </div>
            );
    }
}

export default Profile;