import { cancel_reservation, delete_reservation } from "../constants/action-types"; 

export function getReservations() {
    return { type: "CLIENT_RESERVATIONS_REQUESTED" };
}

export function cancelReservation(payload) {
    return { type: cancel_reservation, payload}
}
export function deleteReservation(payload) {
    return { type: delete_reservation, payload}
}