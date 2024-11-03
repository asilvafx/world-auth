import React, { useState } from 'react'; 
import { Helmet } from 'react-helmet-async'; 
import { useTranslation } from 'react-i18next';   


const Home = () => {
  const { t } = useTranslation(); 

  return (
    <>
    <Helmet>
    <title>{t('seo_title')}</title>
    <meta name='description' content={t('seo_description')} />
    </Helmet> 
    <h1>Hello World!</h1>
    </>
  );
};

export default Home;
