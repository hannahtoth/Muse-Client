import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Label, FormGroup, Input, Button } from "reactstrap";
import APIURL from '../helpers/environment'

type Props = {
  token: string;
  updateToken(newToken: string): void;
  journal: Journal;
};

type Journal = {
  id: string;
  exhibitName: string;
  image: string;
  url: string;
  description: string;
  userId: string;
  notes: string;
  journalId: string;
};

type State = {
  navRedirect: boolean;
};

class JournalEdit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      navRedirect: false,
    };
  }

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({
      navRedirect: true,
    });

    fetch(`${APIURL}/journal/update/${this.props.journal.id} `, {
      method: "PUT",
      body: JSON.stringify({
        // journal: {
        //   id: this.state.journal.id,
        //   exhibitName: this.state.journal.exhibitName,
        //   image: this.state.journal.image,
        //   url: this.state.journal.url,
        //   description: this.state.journal.description,
        //   userId: this.state.journal.userId,

        // },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token} `,
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

    return (
      <div className="Form-Style">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            {/* <Input className="Form-Input" type="text"
                            name="sharedWith"
                            id="sharedWith"
                            value={this.state.sharedWith}
                            placeholder={this.state.sharedWith}
                            onChange={(e) => this.setState({ sharedWith: e.target.value })} />
                        <Label></Label>
                        <Input className="Form-Input" type="text"
                            name="sharedDate"
                            id="sharedDate"
                            value={this.state.sharedDate}
                            placeholder={this.state.sharedDate}
                            onChange={(e) => this.setState({ sharedDate: e.target.value })} /> */}
          </FormGroup>
          <Button className="Btn-login">Lend</Button>
          {navRedirect && <Redirect to="/user/profile" />}
        </Form>
      </div>
    );
  }
}

export default JournalEdit;
