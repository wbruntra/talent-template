import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  handleClearAndReload() {
    localStorage.clear()
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card border-danger">
                <div className="card-body text-center py-5">
                  <i className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3 d-block"></i>
                  <h4 className="card-title">Something went wrong</h4>
                  <p className="text-muted mb-4">
                    The app encountered an error, possibly due to corrupted local data. Clearing
                    your saved data will reset the app to its default state.
                  </p>
                  <button className="btn btn-danger" onClick={this.handleClearAndReload}>
                    Clear Data &amp; Reload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
