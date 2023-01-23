import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Task} from '../../Interface/Models';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updateTask} from '../../redux/taskListSlice';
import StartButton from '../Buttons/StartButton';
import StopButton from '../Buttons/StopButton';
import TaskModal from '../Modals/TaskModal';
import styles from '../../styles/styles';
import formatTime from '../../hooks/formatTime';
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

  const time = formatTime(item.elapsedTime);

  return (
    <TouchableOpacity onPress={() => setShowModal(true)}>
      <View style={styles.itemContainer}>
        <View style={styles.flex1}>
          <Text style={styles.itemTitle}>{item.name}</Text>
        </View>
        <View style={styles.flex1}>
          <Text style={styles.itemTime}>{time}</Text>
        </View>
        <TaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          item={item}
          index={index}
        />
        <View style={[styles.flex1, styles.alignEnd]}>
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
