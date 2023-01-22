import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setIsRunning, updateTask} from '../../redux/taskListSlice';
import {Alert, Button} from 'react-native';
import {Task} from '../../Interface/Models';

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
      Alert.alert(`you can't start a new task when another is running`);
    }
  };
  return <Button title="Start" color="#078955" onPress={handleStart} />;
};

export default StartButton;
