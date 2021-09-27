import React, { Component } from 'react';




interface GalleryObj {
    createdAt: string;
    id: number;
    exhibit: [] | [];
    exhibitImage: string;
    exhibitName: string;
    updatedAt: string;
    userId: number;
};
type GalleryViewProps = {
    fetchOneExhibit(): void,
    fetchExhibit(): void,
    oneExhibit: GalleryObj,
    token: string | null,
    exhibitId: number,
};
type GalleryViewState = {
    currentView: string,
    query: string,
    exhibitId: number,
    exhibitName: string,
    exhibitImage: string,
    showEditModel: boolean,
    updateActive: boolean,
}

export class GalleryView extends Component<GalleryViewProps, GalleryViewState> {
    updateOn() {
        throw new Error('Method not implemented.');
    }
    constructor(props: GalleryViewProps) {
        super(props);
        this.state = {
            currentView: "ExhibitView",
            query: '',
            exhibitId: 0,
            exhibitName: '',
            exhibitImage: '',
            showEditModel: false,
            updateActive: false,
         
    
        }
    }

    componentDidMount() {
        this.props.fetchOneExhibit();
    }

    ExhibitView = () => {
        this.setState({
            currentView: "ExhibitView",
        })
    }

    exhibitSearch = () => {
        this.setState({
            currentView: "ExhibitSearch",
        })
     }

    toggleEditModel = () => {
        this.setState({ showEditModel: !this.state.showEditModel })
    }

    editBtn = () => {
        this.updateOn();
        this.toggleEditModel();
    }

    deleteExhibit = () => {
        fetch(`http://localhost:3000/gallery/${this.props.exhibitId}/delete/${this.state.exhibitId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.props.fetchOneExhibit())
    }

    render() {
        return (
            <div>

                {this.state.currentView === "ExhibitView"}

                {/* {this.state.currentView === "ExhibitView" ?
              
                     <div>

                        <button onClick={this.exhibitSearch}>search</button>
                        <br />
                       
                        <h1>{this.props.oneExhibit.exhibitName}</h1>
                        {this.props.oneExhibit.exhibit.map((exhibit) => {
                            return <div>
                             
                          
                        })}
             :
             </div>
           
                    (this.state.currentView === "ExhibitView") ?
                        <GalleryView
                            exhibitId={this.props.exhibitId}
                            token={this.props.token}
                            fetchOneExhibit={this.props.fetchOneExhibit}
                            fetchExhibit={this.props.fetchExhibit}
                            oneExhibit={this.props.oneExhibit}
                            token={this.props.token}
                        />  */}
               </div>
           
           )
        }
    
        // setName = (newName: string) => {
        //     this.setState({ exhibitName: newName })
        // }
        // setImage = (newImage: string) => {
        //     this.setState({ exhibitImage: newImage })
        // }
    
        // updateGallery = (exhibitId: number) => {
        //     this.setState({ gaelleryToUpdate: exhibitId })
        // }
        // updateOn = () => {
        //     this.setState({ updateActive: true })
        // }
        // updateOff = () => {
        //     this.setState({ updateActive: false })
        // }
    // }
    