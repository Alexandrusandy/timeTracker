import React, {useState} from 'react';
import {Button, TextInput, View, Alert, Text} from 'react-native';
import Modal from 'react-native-modal';
import {useAppDispatch} from '../../hooks/hooks';
import {Task} from '../../Interface/Models';
import {addTask} from '../../redux/taskListSlice';
import uuid from 'react-native-uuid';

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
      Alert.alert(`enter a name for task`);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setName('');
  };
  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={showModal}
        style={{
          backgroundColor: 'white',
          opacity: 0.8,
        }}>
        <View
          style={{
            marginHorizontal: 30,
            borderRadius: 5,
            padding: 10,
            borderColor: 'black',
            borderWidth: 2,
            justifyContent: 'center',
            backgroundColor: '#f2f6db',
          }}>
          <Text style={{textAlign: 'center'}}>Add new task</Text>
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="task name"
            style={{height: 40, margin: 12, borderWidth: 1, padding: 10}}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
