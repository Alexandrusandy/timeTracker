import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setIsRunning, updateTask} from '../../redux/taskListSlice';
import {Button} from 'react-native';
import {Task} from '../../Interface/Models';

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

  return <Button title="Stop" color="#8a1e00" onPress={handleStop} />;
};

export default StopButton;
