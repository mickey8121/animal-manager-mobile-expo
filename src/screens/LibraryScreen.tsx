import { FC } from 'react';

import { LibraryScreenProps } from 'routes/types';

import ScreenLayout from 'components/layout/ScreenLayout';

import ArticlesList from 'components/articles/ArticlesList';

const LibraryScreen: FC<LibraryScreenProps<'Library'>> = () => {
  return (
    <ScreenLayout>
      <ArticlesList />
    </ScreenLayout>
  );
};

export default LibraryScreen;
