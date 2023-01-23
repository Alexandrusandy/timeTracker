import React, {useState} from 'react';
import {Button, TextInput, View, Alert, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useAppDispatch} from '../../hooks/hooks';
import {Task} from '../../Interface/Models';
import {addTask} from '../../redux/taskListSlice';
import uuid from 'react-native-uuid';
import styles from '../../styles/styles';

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}
const InputModal: React.FC<Props> = ({showModal, setShowModal}) => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if (name.length > 0) {
      const newTask: Task = {
        id: uuid.v4(),
        name: name,
        elapsedTime: 0,
        startTime: 0,
        pausedTime: 0,
        endTime: 0,
        totalPausedTime: 0,
      };
      dispatch(addTask(newTask));
      setShowModal(false);
      setName('');
    } else {
      Alert.alert('enter a name for task');
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setName('');
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Modal isVisible={showModal} style={styles.modal}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add new task</Text>
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="task name"
            style={styles.textInput}
          />
          <View style={styles.rowCenter}>
            <Button title="Save" color="#3367f6" onPress={() => handleSave()} />
            <Button
              title="Cancel"
              color="#474747"
              onPress={() => closeModal()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InputModal;
