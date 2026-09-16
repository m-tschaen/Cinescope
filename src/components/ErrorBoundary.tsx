import { Component, type ErrorInfo, type ReactNode } from "react"

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  handleBackHome = () => {
    window.location.href = "/"
  }

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <h1>Une erreur est survenue</h1>

          <p>
            CineScope a rencontré un problème inattendu.
          </p>

          <button onClick={this.handleBackHome}>
            Retour à l'accueil
          </button>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary