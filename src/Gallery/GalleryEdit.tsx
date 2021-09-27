
import React, { Component } from 'react';



type GalleryEditProps = {
    galleryToUpdate: number,
    updateOff(): void,
    token: string | null,
    name: string,
    image: string,
    setName(newName: string): void,
    setImage(newImage: string): void,
    showEditModel: boolean,
    toggleEditModel(): void,
    fetchExhibit(): void,
};
type GalleryEditState = {};

export class GalleryEdit extends Component<GalleryEditProps, GalleryEditState> {
    myRef: React.RefObject<HTMLDivElement>;
    constructor(props: GalleryEditProps) {
        super(props);
        this.myRef = React.createRef();
    }

    handleSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`http://localhost:3000/gallery/update/${this.props.galleryToUpdate}`, {
            method: 'PUT',
            body: JSON.stringify({
                gallery: {
                    exhibitName: this.props.name,
                    exhibitImage: this.props.image,
       
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            })
        }).then(res => {
            this.props.updateOff();
            this.props.fetchExhibit();
        })
    }

    closeModel = (e: React.FormEvent) => {
        if (this.myRef.current === e.target) {
            this.props.toggleEditModel();
        }
    }

    cancelEdit = () => {
        this.props.toggleEditModel();
        this.props.updateOff();
    }

    render() {
        return (
            <>
                {this.props.showEditModel ? (

                    <div>
                                <h3>edit your gallery</h3>
                                <form onSubmit={this.handleSubmitEdit}>
                                    <label>edit name: </label>
                                    <input required onChange={(e) => this.props.setName(e.target.value)}></input>
                                    <button type="submit">edit</button>
                                </form>
                    </div>
                )
                    : null
                }
            </>
        )
    }
}