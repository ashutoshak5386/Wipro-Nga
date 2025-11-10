import React, { Component } from "react";

interface Author {
  name: string;
  bio: string;
  topBooks: string[];
}

interface Props {
  author: Author | null;
}

class AuthorInfo extends Component<Props> {
  componentDidMount(): void {
    if (this.props.author) {
      console.log("AuthorInfo loaded for:", this.props.author.name);
    }
  }

  render() {
    const { author } = this.props;
    if (!author) return null;

    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 mt-5">
        <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
        <p className="text-gray-700 mb-3">{author.bio}</p>
        <h4 className="font-semibold text-gray-800 mb-1">Top Books:</h4>
        <ul className="list-disc ml-6 text-gray-600">
          {author.topBooks.map((book, i) => (
            <li key={i}>{book}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuthorInfo;

