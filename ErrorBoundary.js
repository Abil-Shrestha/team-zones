import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    console.log("error. clearing local storage");
    // Catch errors in any components below and re-render with error message
    this.setState({
      hasError: true,
    });
    // You can also log error messages to an error reporting service here
    window.localStorage.removeItem("cities");
    window.localStorage.removeItem("timeFormat");
    window.localStorage.removeItem("activeCard");
  }

  render() {
    if (this.state.hasError) {
      // Error path
      return (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Something went wrong. Please reload the page</h2>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
