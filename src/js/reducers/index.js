import { cancel_reservation, delete_reservation } from "../constants/action-types"; 

const initialState = {
	reservations: [],
	remoteReservations:[],
	reservationsCanceledQuantity:0,
	reservationsNoAttendQuantity:0,
	reservationsReservedQuantity:0,
	reservationsAttendQuantity:0,
	reservationsConfirmedQuantity:0
}

function rootReducer(state = initialState, action) {
	if (action.type === "CLIENT_RESERVATIONS_LOADED") {
		return Object.assign({}, state, {
				remoteReservations:state.remoteReservations.concat(action.payload)
		});
	}
	if (action.type === cancel_reservation) {
		return Object.assign({}, state, {
			reservations: state.reservations.concat(action.payload)
		})
	}
	if (action.type === delete_reservation) {
		return Object.assign({}, state, {
			reservations: state.reservations.concat(action.payload)
		})
	}
	return state;
}

export default rootReducer;