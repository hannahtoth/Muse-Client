import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

type Props = {
  token: string;
  updateToken(newToken: string): void;
  gallery: Gallery;
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

class GalleryDelete extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      exhibitName: this.props.gallery.exhibitName,
      description: this.props.gallery.description,
    };
  }

  onDelete = () => {
    fetch(`http://localhost:3000/gallery/delete/${this.props.gallery.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      }),
    });
  };

  render() {
    if (this.props.token === "") {
      return <Redirect to="/user/login" />;
    }
    console.log(this.state);
    return (
      <div className="style">
        <p>Are you sure you want to remove this gallery?</p>
        {this.props.gallery.exhibitName}
        {this.props.gallery.description}
        <button onClick={this.onDelete} className="Btn-home">
          Remove
        </button>
      </div>
    );
  }
}

export default GalleryDelete;
