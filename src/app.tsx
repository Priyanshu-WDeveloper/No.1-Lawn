import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes/app-routes';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/error-boundary';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
