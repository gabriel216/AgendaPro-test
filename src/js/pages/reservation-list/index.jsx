import React, { Component } from "react";
import { connect } from "react-redux";
import Reservation from "../../components/reservation";
import { getReservations} from "../../actions/index";
import "../../../statics/css/reservation-list-page.css";

class ReservationList extends Component {
	componentDidMount() {
		this.props.getReservations();
	}

  render() {
    return (
			<div className="container-fluid">
				<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
					<h2>Reservation list</h2>
				</div>				
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 canceled-reservations" >
						<h4>{this.props.reservationsCanceledQuantity} Canceled reservations</h4>
							{this.props.reservations.map((el, i) =>{
								return (
									<div key={el.id}>
										{el.status === "Cancelado" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							} 
							)}												
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 no-attend-reservations" >
						<h4>{this.props.reservationsNoAttendQuantity} No attend reservations</h4>							
							{this.props.reservations.map((el, i) => 
								(
									<div key={el.id}>
										{el.status === "No Asiste" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							)}												
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 reserved-reservations" >
						<h4>{this.props.reservationsReservedQuantity} Reserved reservations</h4>							
							{this.props.reservations.map((el, i) => 
								(
									<div key={el.id}>
										{el.status === "Reservado" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							)}												
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 attend-reservations" >
						<h4>{this.props.reservationsAttendQuantity} Attend reservations</h4>							
							{this.props.reservations.map((el, i) => 
								(
									<div key={el.id}>
										{el.status === "Asiste" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							)}												
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 attend-reservations" >
						<h4>{this.props.reservationsConfirmedQuantity} Confirmed reservations</h4>							
							{this.props.reservations.map((el, i) => 
								(
									<div key={el.id}>
										{el.status === "Confirmado" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							)}												
					</div>
				</div>
			</div>
    );
  }
}


function mapStateToProps(state) {
	let canceled = 0;
	let noAttend = 0;
	let reserved = 0;
	let attend = 0;
	let confirmed = 0;
	state.remoteReservations.map(r=> {
		switch(r.status) {
			case 'Cancelado':
				canceled += 1;
			break;
			case 'No Asiste':
				noAttend += 1;
			break;
			case 'Reservado':
				reserved += 1;
			break;
			case 'Asiste':
				attend += 1;
			break;
			case 'Confirmado':
				confirmed += 1;
			break;
			default:
			break;
		}
	})
	return {
		reservations:state.remoteReservations.slice(),
		reservationsCanceledQuantity: canceled,
		reservationsNoAttendQuantity: noAttend,
		reservationsReservedQuantity: reserved,
		reservationsAttendQuantity: attend,
		reservationsConfirmedQuantity: confirmed
	}
}

export default connect(mapStateToProps,{ getReservations })(ReservationList);
