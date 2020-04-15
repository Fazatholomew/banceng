import React from 'react';
import { mount } from 'enzyme';

import OpponentCards from './';
import Store from 'util/store';

describe('OpponentCards component render tests', () => {
  test('it renders', () => {
    const wrapper = mount(<Store><OpponentCards /></Store>);
    expect(wrapper.exists()).toBe(true);
  });

  test('it renders 3 cards', () => {
    const data = [
      {name: 'jonny'},
      {name: 'jane'},
      {name: 'doe'},
    ];
    const wrapper = mount(<Store><OpponentCards data={data}/></Store>);
    expect(wrapper.find('.column')).toHaveLength(data.length);
  });

  test('it shows a cardback image', () => {
    const data = [
      {name: 'jonny'},
      {name: 'jane'},
    ];
    const wrapper = mount(<Store><OpponentCards data={data}/></Store>);
    expect(wrapper.find('img')).toHaveLength(2);
  })
});