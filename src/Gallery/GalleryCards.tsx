import React, { Component } from 'react';
import {GalleryView} from './GalleryView'


interface GalleryObj {
    map(arg0: (exhibit: { exhibitName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; id: number; }) => JSX.Element): React.ReactNode;
    createdAt: string;
   
    id: number;
    updatedAt: string;
    userId: number;
    exhibit: [] | [];
    exhibitImage: string;
    exhibitName: string;

};
type GalleryCardsProps = {
    fetchExhibit(): void,
    token: string | null,
    updateGallery(galleryId: number): void,
    updateOn(): void,
    toggleEditModel(): void,
    deleteExhibit(): void,
    fetchOneExhibit(): void,
    oneExhibit: GalleryObj,
    currentView: string,
    exhibitData: GalleryObj;
    galleryView(): void,
    exhibitId: number,
    showAddModal: boolean,
    toggleAddModal(): void,
    exhibitToUpdate: number,
    

};
type GalleryCardsState = {
};

export class GalleryCards extends Component<GalleryCardsProps, GalleryCardsState> {
    constructor(props: GalleryCardsProps) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchExhibit();
    }

    editBtn = () => {
        this.props.updateOn();
        this.props.toggleEditModel();
    }

    render() {
        return (
            <div>
                  {this.props.currentView === "GalleryCards" ?
                    this.props.exhibitData.map((exhibit: { exhibitName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; id: number; }) => {
                        return (
                            <div>
                                <h3>{exhibit.exhibitName}</h3>
                                <button onClick={() => { this.props.updateGallery(exhibit.id); this.props.fetchOneExhibit(); this.props.galleryView() }}>view</button>
                                <button onClick={() => { this.props.updateGallery(exhibit.id); this.editBtn() }}>edit</button>
                                <button onClick={() => { this.props.updateGallery(exhibit.id); this.props.deleteExhibit() }}>delete</button>
                            </div>
                        )
                            }
                     ) :
                     <GalleryView
                        fetchOneExhibit={this.props.fetchOneExhibit}
                        fetchExhibit={this.props.fetchExhibit}
                        oneExhibit={this.props.oneExhibit}
                        token={this.props.token}
                        exhibitId={this.props.exhibitToUpdate}
                    />
                }
            </div>
   )
     } 
 }