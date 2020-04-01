import React from 'react';
import { shallow } from 'enzyme';
import Card from './';

describe('Card component render tests', () => {
  test('it renders', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.exists()).toBe(true);
  });

  test('it contains a card title and emoji symbol when given a card object', () => {
    const wrapper = shallow(<Card isShown face='♦' number='A' />);
    expect(wrapper.find('.cardNumber').text()).toEqual('A');
    expect(wrapper.find('.cardFace').text()).toEqual('♦');
  });

  test('it shows a cardback image when shown prop is false', () => {
    const wrapper = shallow(<Card/>);
    expect(wrapper.find('.cardNumber')).toHaveLength(0);
    expect(wrapper.find('.cardFace')).toHaveLength(0);
    expect(wrapper.find('img')).toHaveLength(1);
  })
});