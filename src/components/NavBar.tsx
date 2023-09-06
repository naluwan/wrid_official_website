import React from 'react';
import navLogoLight from 'assets/images/navLogoLight.png';
import navLogoDark from 'assets/images/navLogoDark.png';
import { navLinks } from 'constants/index';
import { Link, useNavigate } from 'react-router-dom';
import { IRef } from 'App';
import Hamburger from './Hamburger';
import PopoverPanel from './PopoverPanel';
import ToggleSwitch from './ToggleSwitch';

type NavBarProps = {
  openPanel: boolean;
  isDark: boolean;
  onSetOpenPanel: (open: boolean) => void;
  onSetIsDark: (isDark: boolean) => void;
};

const NavBar = React.forwardRef<IRef, NavBarProps>((props, ref) => {
  const { openPanel, onSetOpenPanel, isDark, onSetIsDark } = props;
  const go = useNavigate();

  // 分別設定div和button的ref
  const divRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // 使用useImperativeHandle來回傳各個ref
  React.useImperativeHandle(ref, () => ({
    getDiv() {
      return divRef.current as HTMLDivElement;
    },
    getButton() {
      return buttonRef.current as HTMLButtonElement;
    },
  }));

  // 主題切換功能
  const atClickThemeChangeHandler = React.useCallback(() => {
    const isDarkTheme = document.documentElement.classList.contains('dark');
    if (isDarkTheme) {
      onSetIsDark(false);
      localStorage.setItem('isDark', 'false');
      document.documentElement.classList.remove('dark');
    } else {
      onSetIsDark(true);
      localStorage.setItem('isDark', 'true');
      document.documentElement.classList.add('dark');
    }
  }, [onSetIsDark]);

  return (
    <header className='absolute top-0 z-50 w-full bg-white dark:bg-black'>
      <nav className='box-border flex h-[60px] items-center justify-between px-2 lg:mx-auto lg:max-w-[1024px] lg:px-4'>
        <Link to='/' className='flex items-center'>
          <img src={isDark ? navLogoDark : navLogoLight} alt='logo' width={48} height={48} />
          <span className='px-2 text-xl font-bold text-black dark:text-white max-lg:hidden'>
            吾境設計
          </span>
        </Link>
        <ul className='flex flex-1 items-center justify-end gap-12 max-lg:hidden'>
          {navLinks.map((link: { href: string; label: string }) => (
            <li
              key={link.label}
              className='hover:transition-translate-y-1 transition delay-150 duration-300 ease-in-out hover:scale-110 hover:text-[#6c6c6c]'
            >
              <Link to={link.href} className='text-lg leading-normal text-black dark:text-white'>
                {link.label}
              </Link>
            </li>
          ))}
          <li className='hover:transition-translate-y-1 transition delay-150 duration-300 ease-in-out hover:scale-110'>
            <button onClick={() => atClickThemeChangeHandler()}>
              {isDark ? (
                <svg
                  aria-label='主題圖示'
                  // color='rgb(0, 0, 0)'
                  fill='rgb(245, 245, 245)'
                  stroke='currentColor'
                  height='24'
                  role='img'
                  width='24'
                  className='stroke-0'
                >
                  <title>主題圖示</title>
                  <path d='M12.00018,4.5a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3.5A1.00005,1.00005,0,0,0,12.00018,4.5ZM5.28241,6.69678A.99989.99989,0,1,0,6.69647,5.28271l-1.06054-1.061A.99989.99989,0,0,0,4.22186,5.63574ZM4.50018,12a1,1,0,0,0-1-1h-1.5a1,1,0,0,0,0,2h1.5A1,1,0,0,0,4.50018,12Zm.78223,5.30322-1.06055,1.061a.99989.99989,0,1,0,1.41407,1.41406l1.06054-1.061a.99989.99989,0,0,0-1.41406-1.41407ZM12.00018,19.5a1.00005,1.00005,0,0,0-1,1V22a1,1,0,0,0,2,0V20.5A1,1,0,0,0,12.00018,19.5Zm6.71729-2.19678a.99989.99989,0,0,0-1.41406,1.41407l1.06054,1.061A.99989.99989,0,0,0,19.778,18.36426ZM22.00018,11h-1.5a1,1,0,0,0,0,2h1.5a1,1,0,0,0,0-2ZM18.01044,6.98975a.996.996,0,0,0,.707-.293l1.06055-1.061A.99989.99989,0,0,0,18.364,4.22168l-1.06054,1.061a1,1,0,0,0,.707,1.707ZM12.00018,6a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,12.00018,6Zm0,10a4,4,0,1,1,4-4A4.00458,4.00458,0,0,1,12.00018,16Z' />
                </svg>
              ) : (
                <svg
                  aria-label='主題圖示'
                  fill='rgb(0, 0, 0)'
                  stroke='currentColor'
                  height='24'
                  role='img'
                  width='24'
                  className='stroke-0'
                >
                  <title>主題圖示</title>
                  <path d='M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z' />
                </svg>
              )}
            </button>
          </li>
        </ul>

        <div className='group relative z-10 hidden rounded-lg px-2 max-lg:block'>
          <Hamburger ref={buttonRef} openPanel={openPanel} onSetOpenPanel={onSetOpenPanel} />
          <PopoverPanel ref={divRef} openPanel={openPanel}>
            <>
              {/* 首頁 */}
              <div className='mb-2'>
                <button
                  className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                  onClick={() => {
                    onSetOpenPanel(false);
                    go('/');
                  }}
                >
                  {/* left icon */}
                  <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-7 w-7'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                      />
                    </svg>
                  </div>

                  {/* right icon */}
                  <div className='flex-1'>
                    <p className='mb-[2px] text-base text-black dark:text-white'>首頁</p>
                  </div>
                </button>
              </div>

              {/* 關於我們 */}
              <div className='mb-2'>
                <button
                  className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                  onClick={() => {
                    onSetOpenPanel(false);
                    go('/about');
                  }}
                >
                  {/* left icon */}
                  <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-7 w-7'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                      />
                    </svg>
                  </div>

                  {/* right icon */}
                  <div className='flex-1'>
                    <p className='mb-[2px] text-base text-black dark:text-white'>關於我們</p>
                  </div>
                </button>
              </div>

              {/* 設計流程 */}
              <div className='mb-2'>
                <button
                  className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                  onClick={() => {
                    onSetOpenPanel(false);
                    go('/process');
                  }}
                >
                  {/* left icon */}
                  <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-7 w-7'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z'
                      />
                    </svg>
                  </div>

                  {/* right icon */}
                  <div className='flex-1'>
                    <p className='mb-[2px] text-base text-black dark:text-white'>設計流程</p>
                  </div>
                </button>
              </div>

              {/* 作品欣賞 */}
              <div className='mb-2'>
                <button
                  className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                  onClick={() => {
                    onSetOpenPanel(false);
                    go('/collections');
                  }}
                >
                  {/* left icon */}
                  <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-7 w-7'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25'
                      />
                    </svg>
                  </div>

                  {/* right icon */}
                  <div className='flex-1'>
                    <p className='mb-[2px] text-base text-black dark:text-white'>作品欣賞</p>
                  </div>
                </button>
              </div>

              {/* 聯絡我們 */}
              <div className='mb-2'>
                <button
                  className='flex w-full items-center rounded-lg p-1 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'
                  onClick={() => {
                    onSetOpenPanel(false);
                    go('/contact');
                  }}
                >
                  {/* left icon */}
                  <div className='bg-fb-input flex items-center justify-center rounded-full p-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-7 w-7'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                      />
                    </svg>
                  </div>

                  {/* right icon */}
                  <div className='flex-1'>
                    <p className='mb-[2px] text-base text-black dark:text-white'>聯絡我們</p>
                  </div>
                </button>
              </div>

              {/* theme change */}
              <div className='mb-2 flex cursor-pointer items-center rounded-lg p-2 hover:bg-[#e6e6e6] dark:hover:bg-[#1c1c1c]'>
                {/* left icon */}
                <div className='bg-fb-input mr-2 flex items-center justify-center rounded-full p-2'>
                  {isDark ? (
                    <svg
                      aria-label='主題圖示'
                      // color='rgb(0, 0, 0)'
                      fill='rgb(245, 245, 245)'
                      stroke='currentColor'
                      height='24'
                      role='img'
                      width='24'
                      className='stroke-0'
                    >
                      <title>主題圖示</title>
                      <path d='M12.00018,4.5a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3.5A1.00005,1.00005,0,0,0,12.00018,4.5ZM5.28241,6.69678A.99989.99989,0,1,0,6.69647,5.28271l-1.06054-1.061A.99989.99989,0,0,0,4.22186,5.63574ZM4.50018,12a1,1,0,0,0-1-1h-1.5a1,1,0,0,0,0,2h1.5A1,1,0,0,0,4.50018,12Zm.78223,5.30322-1.06055,1.061a.99989.99989,0,1,0,1.41407,1.41406l1.06054-1.061a.99989.99989,0,0,0-1.41406-1.41407ZM12.00018,19.5a1.00005,1.00005,0,0,0-1,1V22a1,1,0,0,0,2,0V20.5A1,1,0,0,0,12.00018,19.5Zm6.71729-2.19678a.99989.99989,0,0,0-1.41406,1.41407l1.06054,1.061A.99989.99989,0,0,0,19.778,18.36426ZM22.00018,11h-1.5a1,1,0,0,0,0,2h1.5a1,1,0,0,0,0-2ZM18.01044,6.98975a.996.996,0,0,0,.707-.293l1.06055-1.061A.99989.99989,0,0,0,18.364,4.22168l-1.06054,1.061a1,1,0,0,0,.707,1.707ZM12.00018,6a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,12.00018,6Zm0,10a4,4,0,1,1,4-4A4.00458,4.00458,0,0,1,12.00018,16Z' />
                    </svg>
                  ) : (
                    <svg
                      aria-label='主題圖示'
                      fill='rgb(0, 0, 0)'
                      stroke='currentColor'
                      height='24'
                      role='img'
                      width='24'
                      className='stroke-0'
                    >
                      <title>主題圖示</title>
                      <path d='M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z' />
                    </svg>
                  )}
                </div>

                {/* right text */}
                <div className='flex flex-1 justify-center'>
                  <ToggleSwitch
                    onSetIsDark={onSetIsDark}
                    isDark={isDark}
                    onSetOpenPanel={onSetOpenPanel}
                  />
                </div>
              </div>
            </>
          </PopoverPanel>
        </div>
      </nav>
    </header>
  );
});

export default NavBar;
