import React from 'react';
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

  const handleReset = () => {
    if (runningTask === item.id) {
      dispatch(setIsRunning(''));
    }

    let newTaskList = {...item};
    newTaskList.startTime = 0;
    newTaskList.elapsedTime = 0;
    newTaskList.endTime = 0;
    newTaskList.pausedTime = 0;
    newTaskList.totalPausedTime = 0;
    dispatch(updateTask({index: index, updatedTask: newTaskList}));
  };

  return (
    <TouchableOpacity style={styles.rowCenter} onPress={handleReset}>
      <ResetIcon />
      <Text style={styles.resetButton}>Reset Time</Text>
    </TouchableOpacity>
  );
};

export default ResetButton;
