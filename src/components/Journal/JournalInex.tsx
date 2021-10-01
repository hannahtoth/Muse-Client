import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import JournalEdit from './JournalEdit';
import APIURL from '../helpers/environment'

type Props = {
  token: string;
  updateToken(newToken: string): void;
  JournalEdit(newGallery: Journal): any;
  userId: number | null;
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
  journal: Journal[];
  id: number | null;
  navRedirect: boolean;
};

class JournalIndex extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      journal: [],
      id: null,
      navRedirect: false,
    };
  }

  componentDidMount() {
    this.displayJournalData();
  }

  displayJournalData = () => {
    fetch(`${APIURL}/journal/myjournal`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          journal: json,
          navRedirect: true,
        });
        console.log(json);
      })
      .catch((err) => console.log(err));
  };

  render() {
    // const { navRedirect } = this.state

    if (this.props.userId !== null) {
      return <Redirect to="/journal/update" />;
    }

    return (
      <div className="styling">
        {this.state.journal.map((journal) => {
          return (
            <div>
              <Card className="card-styling">
                <Card.Body className="card-body">
                  <Card.Title>{journal.exhibitName}</Card.Title>
                  <Card.Text>{journal.description}</Card.Text>
                  <Card.Text>{journal.notes}</Card.Text>
                  <Card.Text>{journal.journalId}</Card.Text>

                  <br />

                  <Link to="/journal/delete">
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

export default JournalIndex;
