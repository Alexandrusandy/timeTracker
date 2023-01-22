import {Button, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import InputModal from './src/components/Modals/InputModal';
import {useAppSelector} from './src/hooks/hooks';
interface Props {}

const App: React.FC<Props> = () => {
  const reduxStore = useAppSelector(state => state.taskList.tasks);
  console.log('reduxStore', reduxStore);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <Button
        onPress={() => setShowModal(true)}
        title="Add Task"
        color="#005d38"
      />
      <InputModal showModal={showModal} setShowModal={setShowModal} />
    </SafeAreaView>
  );
};

export default App;
