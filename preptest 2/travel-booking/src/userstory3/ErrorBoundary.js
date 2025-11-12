// src/userstory3/ErrorBoundary.js
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // log error if needed
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="container my-4 alert alert-danger">Something went wrong.</div>;
    }
    return this.props.children;
  }
}
