import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {taskListSlice} from './taskListSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistedTaskList = persistReducer(
  {key: 'taskList', storage: AsyncStorage},
  taskListSlice.reducer,
);

const store = configureStore({
  reducer: {
    taskList: persistedTaskList,
  },
  middleware: [],
});

const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
