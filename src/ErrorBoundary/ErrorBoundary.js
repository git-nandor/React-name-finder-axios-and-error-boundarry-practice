import React, { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        error: '',
    }
    
    static getDerivedStateFromError(error) { 
        console.log('getDerivedStateFromError');
        return {error};
    }
    
    render() {
        if (this.state.error) {
            return <this.props.FallbackComponent error={this.state.error} />;
        } else {
            return this.props.children;
        }
    }
}
export default ErrorBoundary;


export function ErrorFallback({error}) {

    return (
        <div className="error">
            <p>Something badbadbadbadbadbadbad...</p>
            <pre>{error.message}</pre>
        </div>
    )
}



/*
////////////////// Usage //////////////////
If your component is wraped around with the error boundary, all occured error inside the child tree will catch.
Event handlers error and async components error will NOT CATCH!!!!

If error occured in the component than the wraped component will not show, but instead the fallback error component.
Több error boundaryt is készíthetünk melyeket egymásba is ágyazhatunk a component fában. 
Hiba esetén a hibás component-hez legközelebbi error boundary fogja kezelni a hibát.

import ErrorBoundary, { ErrorFallback } from './ErrorBoundary/ErrorBoundary';

return (
  <div>
    <ErrorBoundary>                 // or <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChildComponent />
    </ErrorBoundary>
  </div>
);
////////////////// Usage //////////////////

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: '',
    }

    // Good for log out the error information
    componentDidCatch = (error, errorInfo) => { 
         this.setState = {
            hasError: true,
            errorMessage: error,
            errorInfo: errorInfo,
        }
    }

    // Good for render fallback error component to the UI
    // Update state so the next render will show the fallback UI.
    static getDerivedStateFromError(error) {    
       this.setState = {
            hasError: true,
            error: error,
            errorMessage: 'Fuuu de error',
        }
        return {error};
    }
    

   render() {
    const {hasError, errorMessage, errorInfo} = this.state;

    if (hasError) {
        //return <this.props.FallbackComponent error={error} />;
        return (
            <div>
                <h1>The errorMessage is:{errorMessage}</h1>
                <div>The errorInfo is:{errorInfo}</div>
            </div>
        )
    } else {
        return this.props.children;
    }
}
}
export default ErrorBoundary;


export function ErrorFallback({error}) {
    console.log('Fallback Component was called with:', error);
    return (
        <div>
            <p>Something badbadbadbadbadbadbad...</p>
            <pre>{error.message}</pre>
        </div>
    )
}
*/

