import React from 'react';
import logo512 from 'assets/images/logo512.png';
import { navLinks } from 'constants/index';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <header className='absolute top-0 z-50 w-full bg-white dark:bg-black'>
      <nav className='box-border flex h-[60px] items-center justify-between px-2 lg:mx-auto lg:max-w-[1024px] lg:px-0'>
        <Link to='/' className='flex items-center'>
          <img src={logo512} alt='logo' width={48} height={48} />
          <span className='px-2 text-xl font-bold text-black dark:text-white max-lg:hidden'>
            吾境設計
          </span>
        </Link>
        <ul className='flex flex-1 items-center justify-end gap-14 max-lg:hidden'>
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
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
