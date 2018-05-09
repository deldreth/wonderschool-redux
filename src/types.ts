import { DateTime } from 'luxon';

export interface Task {
  id: number;
  group: string;
  task: string;
  dependencyIds: number[];
  completedAt: string | null;
}
