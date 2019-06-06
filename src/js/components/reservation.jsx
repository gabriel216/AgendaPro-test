import React, { Component } from "react";
import { connect } from "react-redux";
import "../../statics/css/reservation-component.scss" 
import { cancelReservation, deleteReservation } from "../actions/index";

class Reservation extends Component {
	constructor(props) {
		super(props);
		this.cancelReservation = this.cancelReservation.bind(this);
		this.deleteBooking = this.deleteBooking.bind(this);
	}
	
	cancelReservation(reservation) {
		reservation['status'] = "Cancelado";		
		reservation['status_id'] = 5;		
		this.props.cancelReservation(reservation);
	}

	deleteBooking(reservation) {
		this.props.deleteReservation(reservation);
	}

    render() {
        let initDate = new Date(this.props.info.start);
				let endDate = new Date(this.props.info.end);
        return(
					<div className="container-reservation">
						<h4>Reservation #{this.props.index+1}</h4>
						<ul className="reservation-list">
							<li>Name: {this.props.info.client.first_name + " " + this.props.info.client.last_name}</li>
							<li>Email: {this.props.info.client.email}</li>
							<li>Fecha de inicio: {initDate.getDate() + "/"+initDate.getMonth()+"/"+initDate.getFullYear()}</li>
							<li>Fecha de fin: {endDate.getDate() + "/"+endDate.getMonth()+"/"+endDate.getFullYear()}</li>
							<li>Status: <span className={ this.props.info.status === 'Asiste' ? 'attend' : 
																						this.props.info.status === 'Reservado' ? 'reserved' : 
																						this.props.info.status === 'No Asiste' ? 'no-attend' :
																						this.props.info.status === 'Cancelado' ? 'canceled' :''}>
									{this.props.info.status}</span>
							</li>
							<li>
								{this.props.info.status !== "Cancelado"?
									<button className="btn btn-warning" onClick={()=>this.cancelReservation(this.props.info)}>Cancel</button>
								:''}
								<button className="btn btn-danger deleteBtn" onClick={()=>this.deleteBooking(this.props.info)}>Delete</button>
							</li>
						</ul>
					</div>
				)}
}

export default connect(null,{ cancelReservation, deleteReservation })(Reservation);
