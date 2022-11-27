import { useContext } from 'react';

import { UserContext } from 'providers/UserProvider';

import { Maybe, UserFragmentFragment } from 'generated/graphql';

const useCurrentUser = (): Maybe<UserFragmentFragment> => useContext(UserContext);

export default useCurrentUser;
