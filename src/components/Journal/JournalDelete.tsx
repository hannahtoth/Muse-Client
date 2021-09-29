import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

type Props = {
  token: string;
  updateToken(newToken: string): void;
  journal: Journal;
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

class JournalDelete extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      exhibitName: this.props.journal.exhibitName,
      description: this.props.journal.description,
      notes: this.props.journal.notes,
      journalId: this.props.journal.journalId
    };
  }

  onDelete = () => {
    fetch(`http://localhost:3000/journal/delete/${this.props.journal.id}`, {
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
        <p>Are you sure you want to remove this journal?</p>
        {this.props.journal.exhibitName}
        {this.props.journal.description}
        {this.props.journal.notes}
        {this.props.journal.journalId}
        <button onClick={this.onDelete} className="Btn-home">
          Remove
        </button>
      </div>
    );
  }
}

export default JournalDelete;
