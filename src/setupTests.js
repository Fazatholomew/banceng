/*

Enzyme setup adapter so we don't need to configure it in every
test file.

https://pusher.com/tutorials/react-jest-enzyme

*/

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });