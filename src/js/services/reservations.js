import { takeEvery, call, put } from "redux-saga/effects";
import { cancel_reservation, delete_reservation } from "../constants/action-types"; 

var url = "https://bambucalendar.cl/api/public/v1/";
var username = "4fjf146";
var password = "6hcah19dgu9vu48m7nxqgrmb4wt9twl7xjhinhdm216l0";
var headers = new Headers();
headers.set("Authorization", "Basic " + window.btoa(username + ":" + password));

export default function* watcherSaga() {
	yield takeEvery("CLIENT_RESERVATIONS_REQUESTED", fetchReservations);
	yield takeEvery(cancel_reservation, updateReservation);
	yield takeEvery(delete_reservation, deleteReservation);
	// yield delay(5000)
}

function* fetchReservations() {
	try {
		const payload = yield call(getReservations);
		yield put({ type: "CLIENT_RESERVATIONS_LOADED", payload });
	} catch (e) {
		yield put({ type:"ERROR", payload:e });
	}
}

function* updateReservation(data) {
	try {	
		const payload = yield call(modifyStatusReservation(data.payload));
		yield put({ type: "reservation_updated", payload });
	} catch (e) {
		yield put({ type:"ERROR", payload:e });
	}
}

function* deleteReservation(data) {
	try {	
		const payload = yield call(deleteBooking(data.payload));
		yield put({ type: "reservation_deleted", payload });
	} catch (e) {
		yield put({ type:"ERROR", payload:e });
	}
}

function getReservations() {
	return fetch(url + "clients/69196/bookings", {
		method:'GET', 
		headers:headers
	})
	.then(
		response => response.json()
	);
}

function modifyStatusReservation(data) {
	return fetch( url + "bookings/" + data.id, {
		method:'PATCH', 
		body: JSON.stringify(data), 
		headers:headers
	})
	.then(response => {
		response.json()
	});
}

function deleteBooking(data) {
	return fetch( url + "bookings/" + data.id, {
		method:'DELETE', 
		body: JSON.stringify(), 
		headers:headers
	})
	.then(response => {
		response.json()
	});
}