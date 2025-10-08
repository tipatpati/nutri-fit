/**
 * Error Boundary Component
 * Phase 6: Quality & Testing
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // TODO: Send to error reporting service (Sentry, etc.)
    // reportError(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen md-surface flex items-center justify-center p-md-4">
          <Card className="max-w-md w-full md-elevation-2">
            <CardHeader>
              <div className="flex items-center gap-md-3 mb-md-2">
                <div className="p-md-3 bg-md-error-container rounded-full">
                  <AlertTriangle className="h-6 w-6 text-md-error" />
                </div>
                <CardTitle className="md-headline-small">Oups ! Une erreur s'est produite</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-md-4">
              <p className="md-body-medium text-md-surface-on-variant">
                Nous sommes désolés, quelque chose s'est mal passé. Notre équipe a été informée du problème.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-md-3 bg-md-error-container rounded-lg">
                  <p className="md-label-small text-md-error mb-md-2">Message d'erreur (dev only):</p>
                  <p className="md-body-small text-md-error-on-container font-mono">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex gap-md-3">
                <Button 
                  variant="filled" 
                  onClick={this.handleReset}
                  className="flex-1"
                >
                  Réessayer
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => window.location.href = '/'}
                  className="flex-1"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
