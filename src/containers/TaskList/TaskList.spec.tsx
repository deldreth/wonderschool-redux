import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

import { Task as TaskType } from 'app/types';

import TaskList from './index';

const mockStore = createMockStore();

it( 'should render a TaskList component', async () => {
  const store = mockStore(
    {
      tasks: [
        {
          id: '1',
          group: 'Purchases',
          task: 'Go to the bank',
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: '2',
          group: 'Airplanes',
          task: 'Fly One',
          dependencyIds: [1],
          completedAt: null,
        },
      ],
    },
  );

  const wrapper = shallow(
    <Provider store={ store }>
      <TaskList/>
    </Provider>,
  );

  expect( wrapper ).toMatchSnapshot();
} );
