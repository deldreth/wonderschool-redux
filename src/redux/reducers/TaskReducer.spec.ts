import { TaskActionCreators, TaskActionTypes } from 'app/redux/actions';
import Reducers, { TaskState } from 'app/redux/reducers';

it( 'should toggle Task completedAt field', () => {
  let state: TaskState = {
    tasks: [
      {
        id: 1,
        group: 'Purchases',
        task: 'Go to the bank',
        dependencyIds: [],
        completedAt: null,
      },
    ],
  };

  expect( state.tasks[0].completedAt ).toBe( null );
  
  state = Reducers( state, TaskActionCreators.updateTask( 1, 'Some Date' ) );
  expect( state.tasks[0].completedAt ).toBe( 'Some Date' );

  state = Reducers( state, TaskActionCreators.updateTask( 1, null ) );
  expect( state.tasks[0].completedAt ).toBe( null );
} );
