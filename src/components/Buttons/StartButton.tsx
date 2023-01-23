import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setIsRunning, updateTask} from '../../redux/taskListSlice';
import {Alert, TouchableOpacity, Text} from 'react-native';
import {Task} from '../../Interface/Models';
import {PlayIcon} from '../Icons/Icons';
import styles from '../../styles/styles';
interface Props {
  item: Task;
  index: number;
}
const StartButton: React.FC<Props> = ({item, index}) => {
  const runningTask = useAppSelector(state => state.taskList.isRunning);
  const dispatch = useAppDispatch();
  const handleStart = () => {
    if (runningTask === '') {
      let newTaskList = {...item};
      if (newTaskList.startTime === 0) {
        let date = Date.now();
        newTaskList.startTime = date;

        dispatch(updateTask({index: index, updatedTask: newTaskList}));
      }
      if (newTaskList.pausedTime !== 0) {
        let date = Date.now();
        newTaskList.totalPausedTime =
          newTaskList.totalPausedTime + (date - newTaskList.pausedTime);

        dispatch(updateTask({index: index, updatedTask: newTaskList}));
      }

      dispatch(setIsRunning(item.id));
    } else {
      // eslint-disable-next-line quotes
      Alert.alert(`you can't start a new task when another is running`);
    }
  };
  return (
    <TouchableOpacity style={styles.rowCenter} onPress={handleStart}>
      {item.startTime === 0 ? (
        <Text style={styles.startButton}>Start</Text>
      ) : (
        <Text style={styles.startButton}>Resume</Text>
      )}
      <PlayIcon />
    </TouchableOpacity>
  );
};

export default StartButton;
