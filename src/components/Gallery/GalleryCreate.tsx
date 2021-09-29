import { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { ExhibitIndex } from "../Exhibits/ExhibitIndex";

type Props = {
  token: string;
  updateToken(newToken: string): void;
};

type State = {
  gallery: {
    id: string;
    exhibitName: string;
    image: string;
    url: string;
    description: string;
    userId: string;
  };
  navRedirect: boolean;
};

class GalleryCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gallery: {
        id: "",
        exhibitName: "",
        image: "",
        url: "",
        description: "",
        userId: "",
      },
      navRedirect: false,
    };
  }

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({
      gallery: {
        id: this.state.gallery.id,
        exhibitName: this.state.gallery.exhibitName,
        image: this.state.gallery.image,
        url: this.state.gallery.url,
        description: this.state.gallery.description,
        userId: this.state.gallery.userId,
      },
      navRedirect: true,
    });

    fetch("http://localhost:3000/gallery/create", {
      method: "POST",
      body: JSON.stringify({
        gallery: {
          id: this.state.gallery.id,
          exhibitName: this.state.gallery.exhibitName,
          image: this.state.gallery.image,
          url: this.state.gallery.url,
          description: this.state.gallery.description,
          userId: this.state.gallery.userId,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { navRedirect } = this.state;

    if (this.props.token === "") {
      return <Redirect to="/user/login" />;
    }

    return (
      <div>
        <Form className="Form-Style" onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exhibitName"></Label>
            <Input
              className="Form-Input"
              type="text"
              name="exhibitName"
              id="exhibitName"
              placeholder="Exhibit Name"
              onChange={(e: { target: { value: any } }) =>
                this.setState({
                  gallery: {
                    ...this.state.gallery,
                    exhibitName: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="description"></Label>
            <Input
              className="Form-Input"
              type="text"
              name="description"
              id="description"
              placeholder="description"
              onChange={(e: { target: { value: any } }) =>
                this.setState({
                  gallery: {
                    ...this.state.gallery,
                    description: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="id"></Label>
            <Input
              className="Form-Input"
              type="text"
              name="id"
              id="id"
              placeholder="Id"
              onChange={(e: { target: { value: any } }) =>
                this.setState({
                  gallery: { ...this.state.gallery, id: e.target.value },
                })
              }
            />
          </FormGroup>

          <Button className="Btn-login">Add</Button>
          {navRedirect && <Redirect to="/user/profile" />}
          <Link className="Link-Style" to="/user/profile">
            View Gallery
          </Link>
        </Form>
      </div>
    );
  }
}

export default GalleryCreate;
