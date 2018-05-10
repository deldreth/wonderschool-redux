import React from 'react';

import { DateTime } from 'luxon';
import compose from 'recompose/compose';
import styled from 'styled-components';

import withRedux from 'app/redux/withRedux';

import { TaskActionCreators } from 'app/redux/actions';
import { Icon, ListItem, Loading } from 'app/styles';
import { Task as TaskType } from 'app/types';

interface ExternalProps {
  task: TaskType;
}

export interface InjectedProps {
  tasks: TaskType[];
  updateTask: typeof TaskActionCreators['updateTask'];
}

type Props = ExternalProps & InjectedProps;

function Task ( { task, tasks, updateTask }: Props ) {
  const locked = resolveLocks( task.dependencyIds, tasks );
  
  return (
    <TaskItem
      locked={ locked }
      completed={ task.completedAt !== null }
      onClick={ () => {
        if ( !locked ) {
          updateTask(
            task.id,
            task.completedAt ? null : DateTime.local().toISO(),
          );

          resolveParentLocks( task.id, tasks, updateTask );
        }
      } }>
      <Icon>{ renderTaskIcon( task, locked ) }</Icon>
      { task.task }
    </TaskItem>
  );
}

/**
 * resolveParentLocks - Iterate over all tasks and determine
 * parent relationship. If a parent is being placed in a locked state
 * then the task needs to be updated to reflect that.
 * 
 * This probably isn't the most performant approach... maybe offload
 * batch writes to cache?
 */
function resolveParentLocks ( id: number,
                              tasks: TaskType[],
                              updateTask: Props['updateTask'] ) {
  const depends: number[] = [];
  // Recurse the dependency graph
  const parentIds = ( treeId: number ) => {
    tasks.forEach( task => {
      if ( task.dependencyIds.includes( treeId ) && !depends.includes( task.id ) && task.completedAt ) {
        depends.push( task.id );
        return parentIds( task.id );
      }
    } );
  };
  
  parentIds( id );

  depends.forEach( depend => {
    updateTask( depend, null );
  } );
}

function resolveLocks ( dependencies: number[], tasks: TaskType[] ): boolean {
  let locked = false;
  tasks.forEach( depends => {
    if ( dependencies.includes( depends.id ) && !depends.completedAt ) {
      locked = true;
    }
  } );

  return locked;
}

function renderTaskIcon ( task: TaskType, taskIsLocked: boolean ) {
  if ( taskIsLocked ) {
    return <img src={ require( 'static/Locked.svg' ) }/>;
  }

  if ( task.completedAt ) {
    return <img src={ require( 'static/Completed.svg' ) }/>;
  } else {
    return <img src={ require( 'static/Incomplete.svg' ) }/>;
  }
}

export default compose<InjectedProps, ExternalProps>(
  withRedux,
)( Task );

interface TaskItemProps {
  locked: boolean;
  completed: boolean;
}
const TaskItem = styled<TaskItemProps, any>( ListItem )`
  color: ${ props => {
    if ( props.locked ) {
      return '#BBBBBB';
    }

    return '#000000';
  } }

  text-decoration: ${ props => props.completed ? 'line-through' : 'none' };

  &:hover {
    cursor: ${ props => props.locked ? 'default' : 'pointer' };
  }
`;
