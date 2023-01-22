import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setIsRunning, updateTask} from '../../redux/taskListSlice';
import {TouchableOpacity, Text} from 'react-native';
import {Task} from '../../Interface/Models';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStop} from '@fortawesome/free-solid-svg-icons';
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
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={handleStop}>
      <Text style={{fontSize: 20, color: '#b42400'}}>Stop</Text>
      <FontAwesomeIcon icon={faStop} size={30} color="#b42400" />
    </TouchableOpacity>
  );
};

export default StopButton;
