import {Button, FlatList, SafeAreaView, Text} from 'react-native';
import React, {useMemo, useState} from 'react';
import InputModal from './src/components/Modals/InputModal';
import {useAppSelector} from './src/hooks/hooks';
import ListItem from './src/components/ListItem/ListItem';
import formatTime from './src/hooks/formatTime';
import styles from './src/styles/styles';

interface Props {}

const App: React.FC<Props> = () => {
  const storeData = useAppSelector(state => state.taskList.tasks);
  const [showModal, setShowModal] = useState<boolean>(false);
  // only recalculates if the storeData changes
  const totalElapsedTime = useMemo(
    () => storeData.reduce((acc, current) => acc + current.elapsedTime, 0),
    [storeData],
  );
  // only recalculates if the totalElapsedTime changes
  const time = useMemo(() => formatTime(totalElapsedTime), [totalElapsedTime]);
  return (
    <SafeAreaView>
      <Button
        onPress={() => setShowModal(true)}
        title="Add Task"
        color="#005d38"
      />
      <InputModal showModal={showModal} setShowModal={setShowModal} />
      <Text style={styles.title}>Total Time:{time}</Text>
      <FlatList
        data={storeData}
        renderItem={({item, index}) => <ListItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default App;
