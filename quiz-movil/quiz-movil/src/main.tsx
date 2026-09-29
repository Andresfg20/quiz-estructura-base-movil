import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { databaseService } from './infrastructure/database/database.service';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento #root');
}
const root = createRoot(rootElement);

async function bootstrap(): Promise<void> {
  try {
    await databaseService.init();
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    root.render(<p style={{ padding: 16 }}>No se pudo inicializar SQLite: {message}</p>);
  }
}

void bootstrap();
