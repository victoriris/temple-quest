// Testing reference: https://testing-library.com/
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../Routes';
import { shallow } from 'enzyme';

afterEach(cleanup);

describe ('Aplication startup', () => {

    it ('renders without crashing', () => {
        shallow(<App />);
    });

});