import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Task} from '../../Interface/Models';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateTask} from '../../redux/taskListSlice';
import StartButton from '../Buttons/StartButton';
import StopButton from '../Buttons/StopButton';
import TaskModal from '../Modals/TaskModal';
interface Props {
  item: Task;
  index: number;
}
const ListItem: React.FC<Props> = ({item, index}) => {
  const dispatch = useAppDispatch();
  const runningTask = useAppSelector(state => state.taskList.isRunning);

  const [showModal, setShowModal] = useState<boolean>(false);

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
    <TouchableOpacity onPress={() => setShowModal(true)}>
      <View
        style={{
          margin: 2,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, padding: 5, textAlign: 'left'}}>
            {item.name}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, textAlign: 'center'}}>{time}</Text>
        </View>
        <TaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          item={item}
          index={index}
        />
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {runningTask !== item.id ? (
            <StartButton item={item} index={index} />
          ) : (
            <StopButton item={item} index={index} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
