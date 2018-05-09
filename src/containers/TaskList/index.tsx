import React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import styled from 'styled-components';

import withGroup from 'app/containers/TaskList/withGroup';
import withRedux from 'app/redux/withRedux';

import Task from 'app/components/Task';
import { ListContainer, ListItem, Loading } from 'app/styles';
import { Task as TaskType } from 'app/types';

interface ExternalProps {}

export interface InjectedProps {
  tasks: TaskType[];
}

export type Props = ExternalProps & InjectedProps & RouteComponentProps<any>;

function TaskList ( { tasks, match }: Props ) {
  return (
    <ListContainer>
      
      <ListItem variant="header">{ match.params.group }</ListItem>
      {
        tasks.map(
          ( task: TaskType ) => <Task key={ task.id } task={ task }/>,
        )
      }

    </ListContainer>
  );
}

export default compose<InjectedProps, ExternalProps>(
  withRedux,
  withGroup,
)( TaskList );
