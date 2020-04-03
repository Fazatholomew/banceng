import React from 'react';
import { mount } from 'enzyme';
import PlayingCards from './';
import Store from 'util/store';

describe('PlayingCards component render tests', () => {
  test('it renders', () => {
    const wrapper = mount(<Store><PlayingCards /></Store>);
    expect(wrapper.exists()).toBe(true);
  });

  test('it renders 2 cards', () => {
    const cards = [
      {displayName: 'jonny', number: '3', face:'♥'},
      {displayName: 'jane', number: '5', face:'♥'},
    ];
    const wrapper = mount(<Store><PlayingCards cards={cards} /></Store>);
    expect(wrapper.find('.cardNumber')).toHaveLength(cards.length);
  });

  test('it shows a 3 card', () => {
    const cards = [
      {displayName: 'jonny', number: '3', face:'♥'},
      {displayName: 'jane', number: '5', face:'♥'},
    ];
    const wrapper = mount(<Store><PlayingCards cards={cards} /></Store>);
    const card = mount(wrapper.find('.cardNumber').get(0))
    expect(card.text()).toEqual('3')
  })

  test('it has Cuss and Lawan action', () => {
    const cards = [
      {displayName: 'jonny', number: '3', face:'♥'},
      {displayName: 'jane', number: '5', face:'♥'},
    ];
    const wrapper = mount(<Store><PlayingCards cards={cards} /></Store>);
    const cuss = mount(wrapper.find('.btn').get(0))
    const lawan = mount(wrapper.find('.btn').get(1))
    expect(cuss.text()).toEqual('Cuss')
    expect(lawan.text()).toEqual('Lawan')
  })
});