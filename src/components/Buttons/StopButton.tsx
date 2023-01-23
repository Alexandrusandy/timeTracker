import React from 'react';
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

  const handleStop = () => {
    if (runningTask === item.id) {
      let newTaskList = {...item};
      let date = Date.now();
      newTaskList.endTime = date;
      // newTaskList.elapsedTime = elapsedTime;
      newTaskList.pausedTime = date;
      dispatch(updateTask({index: index, updatedTask: newTaskList}));
      dispatch(setIsRunning(''));
    }
  };

  return (
    <TouchableOpacity style={styles.rowCenter} onPress={handleStop}>
      <Text style={styles.stopButton}>Stop</Text>
      <StopIcon />
    </TouchableOpacity>
  );
};

export default StopButton;
