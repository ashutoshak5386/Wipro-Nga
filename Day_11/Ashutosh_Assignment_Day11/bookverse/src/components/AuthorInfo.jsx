import React, { Component } from "react";

class AuthorInfo extends Component {
  componentDidMount() {
    console.log(`AuthorInfo mounted for ${this.props.author.name}`);
  }

  render() {
    const { author } = this.props;
    if (!author) return null;

    return (
      <div className="card p-4 m-3 shadow-sm bg-light">
        <h3>{author.name}</h3>
        <p>{author.bio}</p>
        <h5>Top 3 Books:</h5>
        <ul>
          {author.topBooks.slice(0, 3).map((book, i) => (
            <li key={i}>{book}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuthorInfo;
