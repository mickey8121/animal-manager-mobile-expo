import { FC, createContext } from 'react';

import { Maybe, HerdMainFragmentFragment } from 'generated/graphql';

export const HerdContext = createContext<Maybe<HerdMainFragmentFragment>>(null);

const HerdProvider: FC<{ value: Maybe<HerdMainFragmentFragment> }> = ({ children, value }) => (
  <HerdContext.Provider value={value}>{children}</HerdContext.Provider>
);

export default HerdProvider;
