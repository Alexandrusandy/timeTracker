import React, {useCallback, useMemo} from 'react';
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
  // useCallback hook to make sure the handleStart function only gets recreated when one of the dependencies changes.
  const handleStart = useCallback(() => {
    if (runningTask === '') {
      let updatedTask = {...item};
      if (updatedTask.startTime === 0) {
        updatedTask.startTime = Date.now();
      } else if (updatedTask.pausedTime !== 0) {
        updatedTask.totalPausedTime += Date.now() - updatedTask.pausedTime;
      }
      dispatch(updateTask({index, updatedTask: updatedTask}));
      dispatch(setIsRunning(item.id));
    } else {
      Alert.alert("You can't start a new task when another is running");
    }
  }, [dispatch, item, index, runningTask]);
  // useMemo hook to make sure the text only gets recalculated when the item prop changes
  const text = useMemo(() => {
    return item.startTime === 0 ? 'Start' : 'Resume';
  }, [item]);
  return (
    <TouchableOpacity style={styles.rowCenter} onPress={handleStart}>
      <Text style={styles.startButton}>{text}</Text>
      <PlayIcon />
    </TouchableOpacity>
  );
};

export default StartButton;
