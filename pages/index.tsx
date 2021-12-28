import type { NextPage } from 'next';
import { HomeTabs } from '@/components/homeTabs';

// TODO: fix main's padding as per design
const Home: NextPage = () => {
  return (
    <main className="px-4 md:px-6 lg:px-12 pt-20 md:pt-10 lg:pt-5 font-ibm-plex-sans">
      <HomeTabs />
    </main>
  );
};

export default Home;
