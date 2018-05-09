import { DateTime } from 'luxon';
import { Action, ActionCreator } from 'redux';

export const enum TaskActionTypes {
  UPDATE_TASK = 'UPDATE_TASK',
}

export const TaskActionCreators = {
  updateTask,
};

export interface UpdateTaskAction extends Action {
  type: TaskActionTypes.UPDATE_TASK;
  payload: {
    id: number,
    completedAt?: string,
  };
}

export function updateTask ( id: number, completedAt?: string ): UpdateTaskAction {
  return {
    type: TaskActionTypes.UPDATE_TASK,
    payload: {
      id,
      completedAt,
    },
  };
}
