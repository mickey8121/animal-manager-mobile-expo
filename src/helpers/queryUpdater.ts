import { UpdateQueryFn } from '@apollo/client/core/watchQueryOptions';

import { updateItemInArray } from 'helpers/updateArray';

import { Animal, Exact, Herd } from 'generated/graphql';

import set from 'lodash/set';
import get from 'lodash/get';

type Entity = Herd | Animal;
type QueryUpdater = (
  entityName: string,
  wrappedWithNodes?: boolean,
) => UpdateQueryFn<any, Exact<{ [key: string]: any }>, any> | undefined;

const queryUpdater: QueryUpdater = (entityName, wrappedWithNodes = false) => {
  const pluralEntityName = `${entityName}s`;
  const prevPath = `${pluralEntityName}${wrappedWithNodes ? '.nodes' : ''}`;

  const getModifiedPrev = (prev: any, newArray: any): any => {
    const modifiedNodes: { [key: string]: any } = set({}, prevPath, newArray);

    return {
      ...prev,
      ...modifiedNodes,
      [pluralEntityName]: { ...prev[pluralEntityName], ...modifiedNodes[pluralEntityName] },
    };
  };

  return (prev, { subscriptionData }) => {
    const { data } = subscriptionData;

    if (!data) return prev;

    const mutationType = data?.[pluralEntityName]?.mutationType;
    const entity = data?.[pluralEntityName]?.[entityName];
    const prevNodes = get(prev, prevPath) ?? [];

    switch (mutationType) {
      case 'CREATED':
        return getModifiedPrev(prev, [
          entity,
          ...prevNodes.filter((e: Entity) => e.id !== entity?.id),
        ]);
      case 'UPDATED':
        return getModifiedPrev(prev, updateItemInArray(prevNodes, entity));
      case 'DELETED':
        return getModifiedPrev(prev, [...prevNodes.filter((e: Entity) => e.id !== entity?.id)]);

      default:
        return prev;
    }
  };
};

export default queryUpdater;
