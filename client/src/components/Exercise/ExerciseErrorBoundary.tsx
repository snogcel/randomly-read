import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Error as ErrorIcon,
  Refresh,
  Home,
  BugReport,
  ExpandMore,
} from '@mui/icons-material';
import { ExerciseErrorBoundaryProps, ExerciseErrorFallbackProps } from './flowTypes';

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const ErrorCard = styled(Card)(({ theme }) => ({
  maxWidth: '600px',
  width: '100%',
  textAlign: 'center',
  border: `2px solid ${theme.palette.error.light}`,
}));

const ErrorIcon_Styled = styled(ErrorIcon)(({ theme }) => ({
  fontSize: '4rem',
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

class ExerciseErrorBoundary extends Component<ExerciseErrorBoundaryProps, State> {
  constructor(props: ExerciseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('Exercise Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In a real application, you might want to log this to an error reporting service
    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // This would typically send error data to a logging service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorId: this.state.errorId,
    };

    // Example: Send to logging service
    // logErrorToService(errorData);
    console.log('Error logged:', errorData);
  };

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  private handleRetry = () => {
    // Reset the error boundary and attempt to retry
    this.handleReset();
    
    // Force a re-render by updating a key or triggering a parent component update
    // This might involve calling a retry function passed as a prop
    if (this.props.onError) {
      // Trigger a retry mechanism if available
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    // Navigate to home or safe route
    window.location.href = '/';
  };

  private getErrorType = (error: Error): string => {
    if (error.name === 'ChunkLoadError') return 'Network Error';
    if (error.message.includes('GraphQL')) return 'Data Error';
    if (error.message.includes('Timer')) return 'Timer Error';
    if (error.message.includes('Audio')) return 'Audio Error';
    return 'Application Error';
  };

  private getErrorSeverity = (error: Error): 'error' | 'warning' => {
    // Determine if this is a critical error or something recoverable
    const recoverableErrors = ['ChunkLoadError', 'NetworkError', 'TimeoutError'];
    return recoverableErrors.some(type => error.name.includes(type)) ? 'warning' : 'error';
  };

  private renderErrorDetails = () => {
    const { error, errorInfo } = this.state;
    if (!error) return null;

    return (
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="body2">
            <BugReport sx={{ mr: 1, verticalAlign: 'middle' }} />
            Technical Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle2" gutterBottom>
              Error Message:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
              {error.message}
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>
              Error ID:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
              {this.state.errorId}
            </Typography>

            {errorInfo && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Component Stack:
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.75rem',
                    whiteSpace: 'pre-wrap',
                    backgroundColor: 'grey.100',
                    p: 1,
                    borderRadius: 1,
                    maxHeight: '200px',
                    overflow: 'auto',
                  }}
                >
                  {errorInfo.componentStack}
                </Typography>
              </>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  render() {
    if (this.state.hasError) {
      const { error } = this.state;
      const { fallback: FallbackComponent } = this.props;

      // If a custom fallback component is provided, use it
      if (FallbackComponent && error) {
        return (
          <FallbackComponent
            error={error}
            resetError={this.handleReset}
            retry={this.handleRetry}
          />
        );
      }

      // Default error UI
      return (
        <ErrorContainer>
          <ErrorCard>
            <CardContent>
              <ErrorIcon_Styled />
              
              <Typography variant="h5" gutterBottom color="error">
                Oops! Something went wrong
              </Typography>
              
              <Typography variant="body1" color="textSecondary" paragraph>
                We encountered an unexpected error during your exercise session.
                Don't worry - your progress has been saved.
              </Typography>

              {error && (
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={this.getErrorType(error)}
                    color={this.getErrorSeverity(error)}
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`ID: ${this.state.errorId.slice(-8)}`}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              )}

              <Alert 
                severity={error ? this.getErrorSeverity(error) : 'error'} 
                sx={{ mb: 2, textAlign: 'left' }}
              >
                <Typography variant="body2">
                  {error?.name === 'ChunkLoadError' 
                    ? 'This appears to be a network issue. Please check your connection and try again.'
                    : error?.message.includes('GraphQL')
                    ? 'There was a problem loading exercise data. Please try again.'
                    : 'An unexpected error occurred. You can try refreshing the page or returning to the home screen.'
                  }
                </Typography>
              </Alert>

              {this.renderErrorDetails()}
            </CardContent>

            <CardActions>
              <ActionButtons>
                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  onClick={this.handleRetry}
                  color="primary"
                >
                  Try Again
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Home />}
                  onClick={this.handleGoHome}
                >
                  Go Home
                </Button>
              </ActionButtons>
            </CardActions>
          </ErrorCard>
        </ErrorContainer>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

// Default fallback component
export const DefaultErrorFallback: React.FC<ExerciseErrorFallbackProps> = ({
  error,
  resetError,
  retry,
}) => (
  <ErrorContainer>
    <ErrorCard>
      <CardContent>
        <ErrorIcon_Styled />
        <Typography variant="h6" gutterBottom>
          Exercise Error
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {error.message}
        </Typography>
      </CardContent>
      <CardActions>
        <ActionButtons>
          {retry && (
            <Button variant="contained" onClick={retry}>
              Retry
            </Button>
          )}
          <Button variant="outlined" onClick={resetError}>
            Reset
          </Button>
        </ActionButtons>
      </CardActions>
    </ErrorCard>
  </ErrorContainer>
);

export default ExerciseErrorBoundary;