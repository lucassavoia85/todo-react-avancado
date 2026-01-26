import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './components/App.css'
import { TodoProvider } from './TodoContext.jsx'

const root = document.getElementById('root');

createRoot(root).render(
    <TodoProvider>
        <App />
    </TodoProvider>
)
