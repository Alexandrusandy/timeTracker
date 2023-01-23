import React, {useState, useCallback} from 'react';
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

  // useCallback hook to make sure the handleSave function only gets recreated when one of the dependencies changes.
  const handleSave = useCallback(() => {
    // check if name is not empty
    if (!name) {
      Alert.alert('enter a name for task');
      return;
    }
    // create new task with unique id and default values
    const newTask: Task = {
      id: uuid.v4(),
      name: name,
      elapsedTime: 0,
      startTime: 0,
      pausedTime: 0,
      endTime: 0,
      totalPausedTime: 0,
    };
    // add task to the state
    dispatch(addTask(newTask));
    // close the modal and clear the input fiel
    setShowModal(false);
    setName('');
  }, [dispatch, name, setShowModal, setName]);

  // useCallback hook to make sure the closeModal function only gets recreated when one of the dependencies changes.
  const closeModal = useCallback(() => {
    setShowModal(false);
    setName('');
  }, [setShowModal, setName]);
  return (
    <View style={styles.flex1}>
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
