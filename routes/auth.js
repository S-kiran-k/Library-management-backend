import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import LibraryManagementSystem from './components/library';
import Signup from './components/signup';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/library" element={<LibraryManagementSystem />} />
                <Route path="/login/library" element={<LibraryManagementSystem />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
