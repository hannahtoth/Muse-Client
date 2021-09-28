// import React, { Component } from 'react';
// import {GalleryCreate} from './GalleryCreate';
// import { GalleryEdit } from './GalleryEdit';
// import { GalleryCards } from './GalleryCards';

// interface GalleryObj {
//     id: number,
//     image: string,
//     url: string,
//     description: string,
//     userId: number,

// };
// type GalleryIndexProps = {
//     sessionToken: string | null,

// };
// type GalleryIndexState = {
//     showAddModel: boolean,
//     showEditModel: boolean,
//     exhibitName: string,
//     updateActive: boolean,
//     updateOff: boolean,
//     exhibitImage: string,
//     galleryToUpdate: number,
//     exhibitData: [] | [],
//     oneExhibit: GalleryObj,
//     currentView: string,

// };

// export class GalleryIndex extends Component<GalleryIndexProps, GalleryIndexState> {
//     galleryView: (() => void) | any;
//     // updateOff: (() => void) | any;
//     // setName: ((newName: string) => void) | any;
//     // setImage: ((newImage: string) => void) | any;
//     updateGallery: ((galleryId: number) => void) | undefined;
//     constructor(props: GalleryIndexProps) {
//         super(props);
//         this.state = {
//             exhibitName: '',
//             exhibitImage: '',
//             showAddModel: false,
//             showEditModel: false,
//             updateActive: false,
//             updateOff: false,

//             galleryToUpdate: 0,
//             exhibitData: [],
//             oneExhibit: {
//                 id: 0,
//                 userId: 0,
//                 image: '',
//                 url: '',
//                 description: '',
//             },
//             currentView: "GalleryCards",
//         }
//     }

//     toggleAddModel = () => {
//         this.setState({
//             showAddModel: !this.state.showAddModel,
//         })
//     }
//     toggleEditModel = () => {
//         this.setState({
//             showEditModel: !this.state.showEditModel,
//         })
//     }

//     fetchExhibit = () => {
//         fetch("http://localhost:3000/gallery/all", {
//             method: 'GET',
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.props.sessionToken}`
//             })
//         }).then((res) => res.json())
//             .then((exhibitData) => this.setState({
//                 exhibitData: exhibitData,
//             }))
//     }

//     fetchOneExhibit = () => {
//         fetch(`http://localhost:3000/gallery/${this.state.galleryToUpdate}`, {
//             method: 'GET',
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.props.sessionToken}`
//             })
//         }).then((res) => res.json())
//             .then((oneExhibit) => {
//                 if (oneExhibit!== null) this.setState({
//                     oneExhibit: oneExhibit,
//                 })
//             })
//     }

//     deleteExhibit = () => {
//         fetch(`http://localhost:3000/gallery/delete/${this.state.galleryToUpdate}`, {
//             method: 'DELETE',
//             headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${this.props.sessionToken}`
//             })
//         }).then(() => this.fetchExhibit())
//     }

//     render() {
//         return (
//             <div>
//                 {this.state.currentView === "GalleryCards" ?
//                     <button onClick={this.toggleAddModel}> </button> :
//                     <></>
//                 }
//                  <GalleryCreate
//                     token={this.props.sessionToken}
//                     exhibitName={this.state.exhibitName}
//                     image={this.state.exhibitImage}
//                     showAddModel={this.state.showAddModel}
//                     toggleAddModel={this.toggleAddModel}

//                 />
//                  <GalleryCards
//                     fetchExhibit={this.fetchExhibit}
//                     galleryToUpdate={this.state.galleryToUpdate}
//                     updateGallery={this.updateGallery}
//                     toggleEditModel={this.toggleEditModel}
//                     token={this.props.sessionToken}
//                     deleteExhibit={this.deleteExhibit}
//                     fetchOneExhibit={this.fetchOneExhibit}
//                     currentView={this.state.currentView}
//                     galleryView={this.galleryView}
//                 />
//                 {this.state.updateActive
//                     ? <GalleryEdit
//                         galleryToUpdate={this.state.galleryToUpdate}
//                         updateOff={this.updateOff}
//                         token={this.props.sessionToken}
//                         name={this.state.exhibitName}
//                         image={this.state.exhibitImage}
//                         setName={this.setName}
//                         setImage={this.setImage}
//                         showEditModel={this.state.showEditModel}
//                         toggleEditModel={this.toggleEditModel}
//                         fetchExhibit={this.fetchExhibit}
//                     />
//                     : <></>}

//             </div>
//         )
//     }

//     setName = (newName: string) => {
//         this.setState({ exhibitName: newName })

//     }
//     setImage = (newImage: string) => {
//         this.setState({ exhibitImage: newImage })
//     }
//     updateExhibit = (exhibitId: number) => {
//         this.setState({ galleryToUpdate: exhibitId })
//     }
//     updateOn = () => {
//         this.setState({ updateActive: true })
//     }
//     updateOff = () => {
//         this.setState({ updateActive: false })
//     }

//     ExhibitView = () => {
//         this.setState({ currentView: "Exhibit" })
//     }
// }

import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import GalleryEdit from './GalleryEdit';


type Props = {
  token: string;
  updateToken(newToken: string): void;
  GalleryEdit(newGallery: Gallery): any;
  userId: number | null;
};

type Gallery = {
  id: string;
  exhibitName: string;
  image: string;
  url: string;
  description: string;
  userId: string;
};

type State = {
  gallery: Gallery[];
  id: number | null;
  navRedirect: boolean;
};

class GalleryIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gallery: [],
      id: null,
      navRedirect: false,
    };
  }

  componentDidMount() {
    this.displayGalleryData();
  }

  displayGalleryData = () => {
    fetch("http://localhost:3000/gallery/mygallery", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          gallery: json,
          navRedirect: true,
        });
        console.log(json);
      })
      .catch((err) => console.log(err));
  };

  render() {
    // const { navRedirect } = this.state

    if (this.props.userId !== null) {
      return <Redirect to="/gallery/update" />;
    }

    return (
      <div className="styling">
        {this.state.gallery.map((gallery) => {
          return (
            <div>
              <Card className="card-styling">
                <Card.Body className="card-body">
                  <Card.Title>{gallery.exhibitName}</Card.Title>
                  <Card.Text>{gallery.description}</Card.Text>

                  <br />

                  <Link to="/gallery/delete">
                    <Button className="card-btn2">Remove</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default GalleryIndex;
