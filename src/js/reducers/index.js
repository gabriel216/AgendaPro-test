import { cancel_reservation, delete_reservation } from "../constants/action-types"; 

const initialState = {
	reservations: [],
	remoteReservations:[],
	CanceledQuantity:0,
	NoAttendQuantity:0,
	ReservedQuantity:0,
	AttendQuantity:0,
	ConfirmedQuantity:0
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
		console.log(action.payload)
		const indexValue = state.remoteReservations.findIndex(i => i.id === action.payload.id) 
		let newList = state.remoteReservations.splice(indexValue, 1)
		return Object.assign({}, state, {
			reservations: newList
		})
	}
	return state;
}

export default rootReducer;