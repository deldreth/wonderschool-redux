import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TaskActionCreators, TaskActionTypes } from 'app/redux/actions';
import { TaskState } from 'app/redux/reducers';

export default <TPropsExternal, TPropsInjected>
  ( Component: React.ComponentType ) => 
    ( props: TPropsExternal & TPropsInjected ) => {
      const ComponentWithRedux = connect<any, typeof TaskActionCreators, TPropsExternal, TaskState>(
        state => ( {
          tasks: state.tasks,
        } ),
        dispatch => bindActionCreators( TaskActionCreators, dispatch ),
      )( Component );

      return <ComponentWithRedux { ...props } />;
    };
