export interface Task {
  id: string | number[];
  name: string;
  elapsedTime: number;
  startTime: number;
  endTime: number;
  pausedTime: number;
  totalPausedTime: number;
}
