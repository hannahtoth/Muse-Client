import { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

type Props = {
  token: string;
  updateToken(newToken: string): void;
};

type State = {
  journal: {
    id: string;
    exhibitName: string;
    image: string;
    url: string;
    description: string;
    userId: string;
    notes: string;
    journalId: string;
  };
  navRedirect: boolean;
};

class JournalCreate extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      journal: {
        id: "",
        exhibitName: "",
        image: "",
        url: "",
        description: "",
        userId: "",
        notes: "",
        journalId: "",
      },
      navRedirect: false,
    };
  }

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({
      journal: {
        id: this.state.journal.id,
        exhibitName: this.state.journal.exhibitName,
        image: this.state.journal.image,
        url: this.state.journal.url,
        description: this.state.journal.description,
        userId: this.state.journal.userId,
        notes: this.state.journal.notes,
        journalId: this.state.journal.journalId,
      },
      navRedirect: true,
    });

    fetch("http://localhost:3000/journal/create", {
      method: "POST",
      body: JSON.stringify({
        journal: {
          id: this.state.journal.id,
          exhibitName: this.state.journal.exhibitName,
          image: this.state.journal.image,
          url: this.state.journal.url,
          description: this.state.journal.description,
          userId: this.state.journal.userId,
          notes: this.state.journal.notes,
          journalId: this.state.journal.journalId,
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
                  journal: {
                    ...this.state.journal,
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
                  journal: {
                    ...this.state.journal,
                    description: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="notes"></Label>
            <Input
              className="Form-Input"
              type="text"
              name="notes"
              id="notes"
              placeholder="notes"
              onChange={(e: { target: { value: any } }) =>
                this.setState({
                  journal: { ...this.state.journal, notes: e.target.value },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="ud"></Label>
            <Input
              className="Form-Input"
              type="text"
              name="id"
              id="id"
              placeholder="Id"
              onChange={(e: { target: { value: any } }) =>
                this.setState({
                  journal: { ...this.state.journal, id: e.target.value },
                })
              }
            />
          </FormGroup>

          <Button className="Btn-login">Add</Button>
          {navRedirect && <Redirect to="/user/profile" />}
          <Link className="Link-Style" to="/user/profile">
            View Journal
          </Link>
        </Form>
      </div>
    );
  }
}

export default JournalCreate;
