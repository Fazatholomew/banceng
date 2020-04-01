import React from 'react';
import { mount, shallow } from 'enzyme';
import PlayingCards from './';

describe('PlayingCards component render tests', () => {
  test('it renders', () => {
    const wrapper = shallow(<PlayingCards />);
    expect(wrapper.exists()).toBe(true);
  });

  test('it renders 2 cards', () => {
    const cards = [
      {displayName: 'jonny', number: '3', face:'♥'},
      {displayName: 'jane', number: '5', face:'♥'},
    ];
    const wrapper = mount(<PlayingCards cards={cards} width={1} />);
    expect(wrapper.find('.cardNumber')).toHaveLength(cards.length);
  });

  test('it shows a 3 card', () => {
    const cards = [
      {displayName: 'jonny', number: '3', face:'♥'},
      {displayName: 'jane', number: '5', face:'♥'},
    ];
    const wrapper = mount(<PlayingCards cards={cards} width={1} />);
    const card = shallow(wrapper.find('.cardNumber').get(0))
    expect(card.text()).toEqual('3')
  })

  test('it has Cuss and Lawan action', () => {
    const cards = [
      {displayName: 'jonny', number: '3', face:'♥'},
      {displayName: 'jane', number: '5', face:'♥'},
    ];
    const wrapper = mount(<PlayingCards cards={cards} width={1} />);
    const cuss = shallow(wrapper.find('.btn').get(0))
    const lawan = shallow(wrapper.find('.btn').get(1))
    expect(cuss.text()).toEqual('Cuss')
    expect(lawan.text()).toEqual('Lawan')
  })
});