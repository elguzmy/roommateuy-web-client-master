import React from 'react';
import Header from '../';

describe('test:Header', () => {

    test('renders and matches snapshot', () => {
        const wrapper = shallow(
            <Header />
        );

        return expect(wrapper).toMatchSnapshot();
    });

});