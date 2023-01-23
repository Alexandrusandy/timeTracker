import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setIsRunning, updateTask} from '../../redux/taskListSlice';
import {TouchableOpacity, Text} from 'react-native';
import {Task} from '../../Interface/Models';
import {ResetIcon} from '../Icons/Icons';
import styles from '../../styles/styles';
interface Props {
  item: Task;
  index: number;
}
const ResetButton: React.FC<Props> = ({item, index}) => {
  const runningTask = useAppSelector(state => state.taskList.isRunning);
  const dispatch = useAppDispatch();

  // useCallback hook to make sure the handleReset function only gets recreated when one of the dependencies changes.
  const handleReset = useCallback(() => {
    if (runningTask === item.id) {
      dispatch(setIsRunning(''));
    }
    const updatedTask = {
      ...item,
      startTime: 0,
      elapsedTime: 0,
      endTime: 0,
      pausedTime: 0,
      totalPausedTime: 0,
    };
    dispatch(updateTask({index, updatedTask}));
  }, [dispatch, item, index, runningTask]);

  return (
    <TouchableOpacity style={styles.rowCenter} onPress={handleReset}>
      <ResetIcon />
      <Text style={styles.resetButton}>Reset Time</Text>
    </TouchableOpacity>
  );
};

export default ResetButton;
