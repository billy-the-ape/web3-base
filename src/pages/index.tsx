import type { GetStaticProps, NextPage } from 'next';
import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPage = () => {
  return <Layout>Home!</Layout>;
};

const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};

export { getStaticProps };
export default Home;
