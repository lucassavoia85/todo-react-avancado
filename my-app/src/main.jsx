import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './components/App.css'
import { TodoProvider } from './TodoContext.jsx'
import{ RecoilRoot } from "recoil";
const root = document.getElementById('root');

createRoot(root).render(
    <RecoilRoot>
    <TodoProvider>
        <App />
    </TodoProvider>
    </RecoilRoot>
)
