import MaxContainer from 'components/MacContainer';
import About from 'pages/About';
import Collections from 'pages/Collections';
import Contact from 'pages/Contact';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Process from 'pages/Process';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from 'sections/Footer';
import NavBar from 'components/NavBar';

const App: React.FC = () => {
  return (
    <main className='relative'>
      <NavBar />
      <MaxContainer>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<About />} path='/about' />
          <Route element={<Process />} path='/process' />
          <Route element={<Collections />} path='/collections' />
          <Route element={<Contact />} path='/contact' />
          <Route element={<NotFound />} path='*' />
        </Routes>
      </MaxContainer>
      <Footer />
    </main>
  );
};

export default App;
