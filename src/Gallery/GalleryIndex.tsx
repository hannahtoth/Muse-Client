import React, { Component } from 'react';
import {GalleryCreate} from './GalleryCreate';
import { GalleryEdit } from './GalleryEdit';
import { GalleryCards } from './GalleryCards';


interface GalleryObj {
    id: number,
    image: string,
    url: string,
    description: string,
    userId: number,
  
   
};
type GalleryIndexProps = {
    sessionToken: string | null,
   
};
type GalleryIndexState = {
    showAddModel: boolean,
    showEditModel: boolean,
    exhibitName: string,
    updateActive: boolean,
    updateOff: boolean,
    exhibitImage: string,
    galleryToUpdate: number,
    updateGallery: boolean;
    exhibitData: [] | [],
    oneExhibit: GalleryObj,
    currentView: string,
    setName(newName: string): void,

};

export class GalleryIndex extends Component<GalleryIndexProps, GalleryIndexState> {
    galleryView: (() => void) | any;
    updateOff: (() => void) | undefined;
    setName: ((newName: string) => void) | undefined;
    setImage: ((newImage: string) => void) | undefined;
    updateGallery: (galleryId: number) => void;
    constructor(props: GalleryIndexProps) {
        super(props);
        this.state = {
            exhibitName: '',
            exhibitImage: '',
            showAddModel: false,
            showEditModel: false,
            updateActive: false,
            updateOff: false,
            updateGallery: false,
            galleryToUpdate: 0,
            exhibitData: [],
            oneExhibit: {
                id: 0,
                userId: 0,
                image: '',
                url: '',
                description: '',
            },
            currentView: "GalleryCards",
        }
    }

    toggleAddModel = () => {
        this.setState({
            showAddModel: !this.state.showAddModel,
        })
    }
    toggleEditModel = () => {
        this.setState({
            showEditModel: !this.state.showEditModel,
        })
    }

    fetchExhibit = () => {
        fetch("http://localhost:3000/gallery/all", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => res.json())
            .then((exhibitData) => this.setState({
                exhibitData: exhibitData,
            }))
    }

    fetchOneExhibit = () => {
        fetch(`http://localhost:3000/gallery/${this.state.galleryToUpdate}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then((res) => res.json())
            .then((oneExhibit) => {
                if (oneExhibit!== null) this.setState({
                    oneExhibit: oneExhibit,
                })
            })
    }

    deleteExhibit = () => {
        fetch(`http://localhost:3000/gallery/delete/${this.state.galleryToUpdate}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        }).then(() => this.fetchExhibit())
    }

    render() {
        return (
            <div>
                {this.state.currentView === "GalleryCards" ?
                    <button onClick={this.toggleAddModel}> </button> :
                    <></>                
                }
                 <GalleryCreate
                    token={this.props.sessionToken}
                    exhibitName={this.state.exhibitName}
                    image={this.state.exhibitImage}
                    showAddModel={this.state.showAddModel}
                    toggleAddModel={this.toggleAddModel}


                />
                 <GalleryCards
                    fetchExhibit={this.fetchExhibit}
                    galleryToUpdate={this.state.galleryToUpdate}
                    updateGallery={this.updateGallery}
                    toggleEditModel={this.toggleEditModel}
                    token={this.props.sessionToken}
                    deleteExhibit={this.deleteExhibit}
                    fetchOneExhibit={this.fetchOneExhibit}
                    currentView={this.state.currentView}
                    galleryView={this.galleryView}
                /> 
                {this.state.updateActive
                    ? <GalleryEdit
                        galleryToUpdate={this.state.galleryToUpdate}
                        updateOff={this.updateOff}
                        token={this.props.sessionToken}
                        name={this.state.exhibitName}
                        image={this.state.exhibitImage}
                        setName={this.setName}
                        setImage={this.setImage}
                        showEditModel={this.state.showEditModel}
                        toggleEditModel={this.toggleEditModel}
                        fetchExhibit={this.fetchExhibit}
                    />
                    : <></>} 
                    
                   
            </div>
        )
    }

    setName = (newName: string) => {
        this.setState({ exhibitName: newName })
    
    }
    setImage = (newImage: string) => {
        this.setState({ exhibitImage: newImage })
    }
    updateExhibit = (exhibitId: number) => {
        this.setState({ galleryToUpdate: exhibitId })
    }
    updateOn = () => {
        this.setState({ updateActive: true })
    }
    updateOff = () => {
        this.setState({ updateActive: false })
    }

    ExhibitView = () => {
        this.setState({ currentView: "Exhibit" })
    }
}