import React, { Component } from "react";
import { connect } from "react-redux";
import Reservation from "../../components/reservation";
import { getReservations} from "../../actions/index";
import "../../../statics/css/reservation-list-page.scss";

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
		CanceledQuantity: canceled,
		NoAttendQuantity: noAttend,
		ReservedQuantity: reserved,
		AttendQuantity: attend,
		ConfirmedQuantity: confirmed
	}
}

class ReservationList extends Component {
	componentDidMount() {
		this.props.getReservations();
	}
  render() {
    return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-1 col-md-1 col-lg-1 col-xl-1">
						<img src="https://get.agendapro.com/hs-fs/hubfs/Logos/logo.png?width=150&name=logo.png" 
									alt="AgendaPro"/>
					</div>				
					<div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
						<h2>Reservation list</h2>
					</div>				
				</div>
				<br/>
				<div className="row">
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 canceled-reservations" >
						<h4>{this.props.CanceledQuantity} Canceled reservations</h4>
							{this.props.reservations.map((el, i) =>
								(
									<div key={el.id}>
										{el.status === "Cancelado" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							)}												
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 no-attend-reservations" >
						<h4>{this.props.NoAttendQuantity} No attend reservations</h4>							
							{this.props.reservations.map((el, i) => 
								(
									<div key={el.id}>
										{el.status === "No Asiste" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							)}												
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 reserved-reservations" >
						<h4>{this.props.ReservedQuantity} Reserved reservations</h4>							
							{this.props.reservations.map((el, i) => 
								(
									<div key={el.id}>
										{el.status === "Reservado" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							)}												
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 attend-reservations" >
						<h4>{this.props.AttendQuantity} Attend reservations</h4>							
							{this.props.reservations.map((el, i) => 
								(
									<div key={el.id}>
										{el.status === "Asiste" ? <Reservation info={el} index={i}/>:''}
									</div>
								)
							)}												
					</div>
					<div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 attend-reservations" >
						<h4>{this.props.ConfirmedQuantity} Confirmed reservations</h4>							
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

export default connect(mapStateToProps,{ getReservations })(ReservationList);
