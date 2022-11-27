import { FC, memo, useCallback } from 'react';

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { UseNavigation } from 'routes/types';

import Button from 'components/common/Button';

import useHerdFromProvider from 'hooks/herds/useHerdFromProvider';

import colors from 'styles/colors';

import PencilEditIcon from 'assets/images/icons/pencil-edit.svg';

type EditButton = FC<{ type: 'herd' | 'animal' }>;

const EditButton: EditButton = ({ type }) => {
  const herd = useHerdFromProvider();
  const { navigate } = useNavigation<UseNavigation<'HomeRouter'>>();

  const onPress = useCallback(() => {
    const isHerd = type === 'herd';

    if (herd) {
      return navigate(
        isHerd ? 'EditHerd' : 'EditAnimal',
        isHerd ? { herdId: herd.id } : { animalId: 'id_not_set' },
      );
    }
  }, [type, herd, navigate]);

  return (
    <Button style={styles.btn} onPress={onPress}>
      <PencilEditIcon style={styles.icon} />
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.primary.primary500,
    backgroundColor: colors.primary.primary200,
  },
  icon: {
    marginLeft: 3,
  },
});

export default memo(EditButton);
