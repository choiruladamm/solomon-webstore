import { Button } from '@/components/ui/button';
import React, { FC } from 'react';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="grid place-items-center min-h-screen">
      <Button>Click me boyyy</Button>
    </div>
  );
};

export default HomePage;
