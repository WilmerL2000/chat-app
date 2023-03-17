import './App.scss';
import { AuthProvider, ChatProvider } from './context';
import { AppRouter } from './router';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppRouter />
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
