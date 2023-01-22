import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Task} from '../../Interface/Models';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateTask} from '../../redux/taskListSlice';
import StartButton from '../Buttons/StartButton';
import StopButton from '../Buttons/StopButton';
interface Props {
  item: Task;
  index: number;
}
const ListItem: React.FC<Props> = ({item, index}) => {
  const dispatch = useAppDispatch();
  const runningTask = useAppSelector(state => state.taskList.isRunning);

  useEffect(() => {
    if (runningTask === item.id) {
      const intervalId = setInterval(() => {
        let date = new Date();
        let newTaskList = {...item};
        newTaskList.elapsedTime =
          date.getTime() - newTaskList.startTime - newTaskList.totalPausedTime;
        dispatch(updateTask({index: index, updatedTask: newTaskList}));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [runningTask, item, dispatch, index]);

  const seconds = Math.floor(item.elapsedTime / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const time = `${hours}:${minutes % 60}:${seconds % 60}`;

  return (
    <View style={{margin: 2, borderColor: 'grey', borderWidth: 2}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, padding: 5}}>{item.name}</Text>
        <Text style={{fontSize: 18}}>{time}</Text>
        {runningTask !== item.id ? (
          <StartButton item={item} index={index} />
        ) : (
          <StopButton item={item} index={index} />
        )}
      </View>
    </View>
  );
};

export default ListItem;
