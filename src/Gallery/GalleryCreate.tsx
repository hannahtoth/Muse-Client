import React, { Component } from 'react';


type GalleryCreateProps = {
    token: string | null,
    id: string,
    exhibitName: string,
    image: string,
    url: string,
    description: string,
    userId: string,
    setName(newName: string): void,
    showAddModel: boolean,
    toggleAddModel(): void,
}

export class GalleryCreate extends Component<GalleryCreateProps, {}> {
    myRef: React.RefObject<HTMLDivElement>;
    constructor(props: GalleryCreateProps) {
        super(props);
        this.myRef = React.createRef();
    }

    handleSubmit = (e: React.FormEvent) => {
        // e.preventDefault();
        fetch("http://localhost:3000/gallery/create", {
            method: 'POST',
            body: JSON.stringify({
                gallery: {
                    ExhibitName: this.props.exhibitName,
                    ExhibitImage: this.props.image,
                    ExhibitId: this.props.id,
                    ExhibitUrl: this.props.url,
                    ExhibitDescription: this.props.description,
                
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            })
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
            })
    }

    closeModel = (e: React.FormEvent) => {
        if (this.myRef.current === e.target) {
            this.props.toggleAddModel();
        }
    }

    render() {
        return (
            <>
                {this.props.showAddModel ? (
                    <div>
                    
                                <h3>create a gallery</h3>
                                <form onSubmit={this.handleSubmit}>
                                    <label>name: </label>
                                    <input required onChange={(e) => this.props.setName(e.target.value)}></input>
                                 
                                </form>
                    </div>
                )
                    : null
                }
            </>
        )
    }
}