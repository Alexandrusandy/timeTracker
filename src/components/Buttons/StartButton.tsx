import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setIsRunning, updateTask} from '../../redux/taskListSlice';
import {Alert, TouchableOpacity, Text} from 'react-native';
import {Task} from '../../Interface/Models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
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
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={handleStart}>
      {item.startTime === 0 ? (
        <Text style={{fontSize: 20, color: '#078955'}}>Start</Text>
      ) : (
        <Text style={{fontSize: 18, color: '#078955'}}>Resume</Text>
      )}

      <FontAwesomeIcon icon={faPlay} size={30} color="#078955" />
    </TouchableOpacity>
  );
};

export default StartButton;
