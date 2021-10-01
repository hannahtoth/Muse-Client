import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import GalleryEdit from "./GalleryEdit";
import APIURL from '../helpers/environment'

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
    fetch(`${APIURL}/gallery/mygallery`, {
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
