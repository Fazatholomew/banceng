import React from 'react';
import { mount, shallow } from 'enzyme';
import OpponentCards from './';

describe('OpponentCards component render tests', () => {
  test('it renders', () => {
    const wrapper = shallow(<OpponentCards />);
    expect(wrapper.exists()).toBe(true);
  });

  test('it renders 3 cards', () => {
    const data = [
      {name: 'jonny'},
      {name: 'jane'},
      {name: 'doe'},
    ];
    const wrapper = shallow(<OpponentCards data={data} width={1} />);
    expect(wrapper.find('.column')).toHaveLength(data.length);
  });

  test('it shows a cardback image', () => {
    const data = [
      {name: 'jonny'},
      {name: 'jane'},
    ];
    const wrapper = mount(<OpponentCards data={data} width={1} />);
    expect(wrapper.find('img')).toHaveLength(2);
  })
});