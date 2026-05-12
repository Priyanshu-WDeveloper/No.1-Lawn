import React from 'react';
import AppRoutes from './routes/app-routes';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#22c55e',
            color: '#fff',
          },
        }}
      />
    </>
  );
};

export default App;