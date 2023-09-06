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

export interface IRef {
  getDiv: () => HTMLDivElement;
  getButton: () => HTMLButtonElement;
}

const App: React.FC = () => {
  const [openPanel, setOpenPanel] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  // popover panel ref
  const panelRef = React.useRef<IRef>(null);

  // 畫面點擊時，如果element沒有包含在popoverRef底下的話，就關閉panel
  window.addEventListener('mousedown', (e) => {
    if (
      panelRef.current &&
      !panelRef.current.getDiv().contains(e.target as HTMLElement) &&
      !panelRef.current.getButton().contains(e.target as HTMLElement)
    ) {
      setOpenPanel(false);
    }
  });

  // 進入網站檢查是否有設定深色模式
  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('isDark') || 'false';
    if (isDarkMode === 'true') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='relative'>
      <NavBar
        ref={panelRef}
        openPanel={openPanel}
        onSetOpenPanel={setOpenPanel}
        isDark={isDark}
        onSetIsDark={setIsDark}
      />
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
