import { assertTSAnyKeyword } from "@babel/types";
import { ImageOutlined } from "@mui/icons-material";
import React, { Component } from "react";
import { Wrapper } from "./ExhibitStyle";
import { Content } from "./ExhibitStyle";

import { ExhibitView } from "./ExhibitView";
type artAPI = {
  exhibitName: string;
  // image: string,
  // url: string,
  description: string;
  id: string;
};
type ExhibitIndexState = {
  artApiData: artAPI[];
  searchTerm: string;
};

export class ExhibitIndex extends Component<{}, ExhibitIndexState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      artApiData: [],
      searchTerm: "",
    };
  }

  // componentDidMount() {
  //     this.fetchArt();
  // }

  fetchArt = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    let res = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${this.state.searchTerm}&query[term][is_public_domain]=true`
    );
    let json = await res.json();
    let fetchedArt = await json.data.map((data: any) => {
      const { title, id } = data;
      const { alt_text } = data.thumbnail;
      // const {baseImageEndpoint + '/' + imageId } = data.api_link

      let artwork = {
        exhibitName: title,
        // image:
        // url: api_link,
        description: alt_text,
        id: id,
      };

      // async function getImg(e) {

      //     const url = "https://api.artic.edu/api/v1/artworks/27992?fields=id,title,image_id";
      //     let specifyImagetype = "/full/843,/0/default.jpg"

      //     const response = await fetch(url);

      //     let data = await response.json();

      //     let baseImageEndpoint = data.config.iiif_url;

      //     let imageId = data.data.image_id;

      //     const theRealImage = (baseImageEndpoint + '/' + imageId + specifyImagetype);

      // }

      return artwork;
    });
    this.setState({
      artApiData: fetchedArt,
    });
    //  console.log(await json)
  };

  handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    this.setState({
      searchTerm: value,
    });
  };

  render() {
    return (
      <div>
        <Wrapper>
          <form
            onSubmit={(e) => {
              this.fetchArt(e);
            }}
          >
            <input
              onChange={(e) => {
                this.handleSearchInput(e);
              }}
              value={this.state.searchTerm}
              type="text"
              placeholder="search"
            ></input>
            <button type="submit">Enter</button>
          </form>

          {this.state.artApiData.map((artwork: artAPI) => (
            <div key={artwork.id}>
              <Content>
                <h2> {artwork.exhibitName}</h2>
                {/* <img src={artwork.image} width="300px"/> */}
                <p> {artwork.description}</p>
                {/* <p>{artwork.url}</p> */}
                <p>{artwork.id}</p>
              </Content>
            </div>
          ))}

          {/* <button onClick={()=> console.info(this.state)}>Check Exhibit Index State</button> */}

          <ExhibitView />
        </Wrapper>
      </div>
    );
  }
}
