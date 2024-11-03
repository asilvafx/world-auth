import React, { useState } from 'react'; 
import { Helmet } from 'react-helmet-async'; 
import { useTranslation } from 'react-i18next';
import IDKit from '../components/IDKit';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>

    <Helmet>
    <title>{t('seo_title')}</title>
    <meta name='description' content={t('seo_description')} />
    </Helmet>
      <div className="min-w-full min-h-screen flex flex-col gap-4 justify-center items-center">

        <h1 className="text-4xl">World Auth</h1>
        <IDKit/>

      </div>

    </>
  );
};

export default Home;
