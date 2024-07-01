import './App.scss';
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import theme from './theme';

function App() {
  return (

    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <Header />
        <main>
          <RoutesConfig />
          <div className="push"></div>
        </main>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
    
  );
}

export default App;
