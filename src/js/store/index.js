import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from '../reducers/index';
import createSagaMiddleware from "redux-saga";
import ReservationService from "../services/reservations";

const initialiseSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer, 
	storeEnhancers(
		applyMiddleware(initialiseSagaMiddleware)
	)
);

initialiseSagaMiddleware.run(ReservationService);
export default store;