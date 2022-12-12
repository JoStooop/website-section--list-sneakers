import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '@/components/header/Header.jsx';


const LayoutPage = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export {LayoutPage};
