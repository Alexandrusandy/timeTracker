import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setIsRunning, updateTask} from '../../redux/taskListSlice';
import {TouchableOpacity, Text} from 'react-native';
import {Task} from '../../Interface/Models';
import {StopIcon} from '../Icons/Icons';
import styles from '../../styles/styles';
interface Props {
  item: Task;
  index: number;
}
const StopButton: React.FC<Props> = ({item, index}) => {
  const runningTask = useAppSelector(state => state.taskList.isRunning);
  const dispatch = useAppDispatch();
  // useCallback hook to make sure the handleStop function only gets recreated when one of the dependencies changes.
  const handleStop = useCallback(() => {
    if (runningTask === item.id) {
      let updatedTask = {...item};
      updatedTask.endTime = Date.now();
      updatedTask.pausedTime = Date.now();
      dispatch(updateTask({index, updatedTask: updatedTask}));
      dispatch(setIsRunning(''));
    }
  }, [dispatch, item, index, runningTask]);

  return (
    <TouchableOpacity style={styles.rowCenter} onPress={handleStop}>
      <Text style={styles.stopButton}>Stop</Text>
      <StopIcon />
    </TouchableOpacity>
  );
};

export default StopButton;
