import { FC, createContext } from 'react';

import Loading from 'components/common/Loading';

import { useMeQuery, Maybe, UserFragmentFragment } from 'generated/graphql';

export const UserContext = createContext<Maybe<UserFragmentFragment>>(null);

const UserProvider: FC = ({ children }) => {
  const { data: { me = null } = {}, loading } = useMeQuery();

  if (loading) return <Loading />;

  return <UserContext.Provider value={me}>{children}</UserContext.Provider>;
};

export default UserProvider;
