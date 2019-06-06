import React from 'react';
import store from './js/store/index'
import { render } from 'react-dom';
import {Provider} from "react-redux";
import ReservationList from './js/pages/reservation-list/index';

render(
    <Provider store={store}>
        <ReservationList />
    </Provider>, 
    document.getElementById('root'));
