import createReducer, { Handlers } from 'app/redux/utils';
import { Task } from 'app/types';

import { TaskActionCreators, TaskActionTypes, UpdateTaskAction } from 'app/redux/actions';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      group: 'Purchases',
      task: 'Go to the bank',
      dependencyIds: [],
      completedAt: null,
    },
    {
      id: 2,
      group: 'Purchases',
      task: 'Buy hammer',
      dependencyIds: [1],
      completedAt: null,
    },
    {
      id: 3,
      group: 'Purchases',
      task: 'Buy wood',
      dependencyIds: [1],
      completedAt: null,
    },
    {
      id: 4,
      group: 'Purchases',
      task: 'Buy nails',
      dependencyIds: [1],
      completedAt: null,
    },
    {
      id: 5,
      group: 'Purchases',
      task: 'Buy paint',
      dependencyIds: [1],
      completedAt: null,
    },
    {
      id: 6,
      group: 'Build Airplane',
      task: 'Hammer nails into wood',
      dependencyIds: [2, 3, 4],
      completedAt: null,
    },
    {
      id: 7,
      group: 'Build Airplane',
      task: 'Paint wings',
      dependencyIds: [5, 6],
      completedAt: null,
    },
    {
      id: 8,
      group: 'Build Airplane',
      task: 'Have a snack',
      dependencyIds: [11],
      completedAt: null,
    },
  ],
};

function updateTaskReducer ( state: TaskState = initialState, action: UpdateTaskAction ) {
  return {
    ...state,
    tasks: state.tasks.map( task => {
      if ( task.id === action.payload.id ) {
        task.completedAt = action.payload.completedAt;
      }

      return task;
    } ),
  };
}

const HANDLERS: Handlers = {
  [ TaskActionTypes.UPDATE_TASK ]: updateTaskReducer,
};

export default createReducer( initialState, HANDLERS );
