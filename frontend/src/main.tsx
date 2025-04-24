import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import App from './App.tsx';
import Game from './Game.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App>
        <Router>
            <Routes>
                <Route path="/" element={<Game />} />
            </Routes>
        </Router>
    </App>
);