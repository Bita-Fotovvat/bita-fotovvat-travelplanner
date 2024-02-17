import './App.scss';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes></Routes>
    </BrowserRouter>
  );
}
