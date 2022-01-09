import type { NextPage } from 'next';
import { HomeTabs } from '@/components/homeTabs';

const Home: NextPage = () => {
  return (
      <main className="pt-20 md:pt-10 lg:pt-5 font-ibm-plex-sans xl:mx-auto max-w-screen-xl">
        <HomeTabs />
      </main>
  );
};

export default Home;
