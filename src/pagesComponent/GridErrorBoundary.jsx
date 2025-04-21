import React from 'react';

// Create a specific error boundary for the grid
class GridErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("Error in grid component:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong while rendering the grid.</div>;
    }

    return this.props.children;
  }
}

export default GridErrorBoundary;
