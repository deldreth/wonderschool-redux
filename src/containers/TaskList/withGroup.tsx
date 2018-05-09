import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TaskActionCreators, TaskActionTypes } from 'app/redux/actions';
import { TaskState } from 'app/redux/reducers';

import { Props as ExternalProps } from 'app/containers/TaskList';

export default <TPropsExternal extends ExternalProps, TPropsInjected>
  ( Component: React.ComponentType<TPropsExternal> ) => 
    ( props: TPropsExternal & TPropsInjected ) => {
      const filteredTasks = props.tasks.filter( task => task.group === props.match.params.group );

      return <Component { ...props } tasks={ filteredTasks } />;
    };
