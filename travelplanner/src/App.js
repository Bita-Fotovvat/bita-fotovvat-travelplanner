import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';

export default function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes></Routes>
    </BrowserRouter>
  );
}
