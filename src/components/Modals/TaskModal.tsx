import {Button, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Task} from '../../Interface/Models';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {removeTask, setIsRunning} from '../../redux/taskListSlice';
import ResetButton from '../Buttons/ResetButton';
import styles from '../../styles/styles';
interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  item: Task;
  index: number;
}

const TaskModal: React.FC<Props> = ({showModal, setShowModal, item, index}) => {
  const dispatch = useAppDispatch();
  const runningTask = useAppSelector(state => state.taskList.isRunning);
  var startTime = ' No Starting Time';
  var endTime = ' Not finish yet';

  if (item.startTime > 0) {
    startTime = new Date(item.startTime).toLocaleString();
  }
  if (item.endTime > 0) {
    endTime = new Date(item.endTime).toLocaleString();
  }

  const seconds = Math.floor(item.elapsedTime / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const time = `${hours}:${minutes % 60}:${seconds % 60}`;

  const handleRemove = () => {
    if (runningTask === item.id) {
      dispatch(setIsRunning(''));
    }
    dispatch(removeTask(index));
    setShowModal(false);
  };
  return (
    <View>
      <Modal isVisible={showModal} style={styles.modal}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Task name: {item.name}</Text>
          <Text style={styles.modalText}>Starting time:{startTime}</Text>
          <Text style={styles.modalText}>Tracked time: {time}</Text>
          <Text style={styles.modalText}>Ending time: {endTime}</Text>
          <ResetButton item={item} index={index} />
          <View style={styles.rowCenter}>
            <Button
              onPress={() => {
                setShowModal(false);
              }}
              title="Close"
              color="#005d38"
            />
            <Button
              onPress={() => {
                handleRemove();
              }}
              title="Remove Task"
              color="#c53b00"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskModal;
