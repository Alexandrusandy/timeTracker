import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
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
  // useEffect to set an interval and update the elapsed time for the running task
  useEffect(() => {
    if (runningTask === item.id) {
      const intervalId = setInterval(() => {
        // get current time
        let date = new Date();
        // create a new object with the current task data
        let updatedTask = {...item};
        const {startTime, totalPausedTime} = updatedTask;
        // calculate new elapsedTime
        updatedTask.elapsedTime = date.getTime() - startTime - totalPausedTime;
        //dispatch to update the task
        dispatch(updateTask({index: index, updatedTask: updatedTask}));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [runningTask, item, dispatch, index]);

  // useMemo to only recalculate time if item.elapsedTime changes
  const time = useMemo(() => formatTime(item.elapsedTime), [item.elapsedTime]);

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

export default React.memo(ListItem);
