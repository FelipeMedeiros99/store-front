// modulos externos
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';

// modulos internos
import TelaLogin from "./Components/TelaLogin";
import TelaCadastro from './Components/TelaCadastro';
import TelaHome from './Components/TelaHome';
import TelaCarrinho from './Components/TelaCarrinho';
import TelaAdmin from './Components/TelaAdmin';

// css
import "./assets/reset.css";
import "./assets/index.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={"/login"} />} />
                <Route path="/login" element={<TelaLogin />} />
                <Route path="/cadastro" element={<TelaCadastro />} />
                <Route path="/home" element={<TelaHome />} />
                <Route path="/carrinho" element={<TelaCarrinho />} />
                <Route path="/admin" element={<TelaAdmin />} />
            </Routes>
        </Router>

    )
}

createRoot(document.querySelector(".root")).render(<App />)