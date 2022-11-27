import { useContext } from 'react';

import { HerdContext } from 'providers/HerdProvider';

import { HerdMainFragmentFragment, Maybe } from 'generated/graphql';

const useHerdFromProvider = (): Maybe<HerdMainFragmentFragment> => useContext(HerdContext);

export default useHerdFromProvider;
