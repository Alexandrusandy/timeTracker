import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Task {
  id: string | number[];
  name: string;
  elapsedTime: number;
  startTime: number;
  pausedTime: number;
  endTime: number;
  totalPausedTime: number;
}

interface TaskListState {
  tasks: Task[];
  isRunning: string | number[];
}

const initialState: TaskListState = {
  tasks: [],
  isRunning: '',
};

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
    },
    updateTask: (
      state,
      action: PayloadAction<{index: number; updatedTask: Task}>,
    ) => {
      state.tasks[action.payload.index] = action.payload.updatedTask;
    },
    setIsRunning: (state, action: PayloadAction<string | number[]>) => {
      state.isRunning = action.payload;
    },
  },
});
export const {addTask, removeTask, updateTask, setIsRunning} =
  taskListSlice.actions;

export default taskListSlice.reducer;
