import React, {Component} from "react";
import { Draggable } from "react-beautiful-dnd";
import "@atlaskit/css-reset";
// import uuidv1 from "uuid";
import "../../statics/css/reservation-component.css" 

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#b7b3b3",

  // styles we need to apply on draggables
  ...draggableStyle
});

class Reservation extends Component {
    render() {
        let initDate = new Date(this.props.info.start)
        let endDate = new Date(this.props.info.end)
        return(
					<Draggable draggableId={this.props.info.id} index={this.props.index}>
						{(provided, snapshot)=> (
							<div className="container-reservation" 
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								style={getItemStyle(
									snapshot.isDragging,
									provided.draggableProps.style
								)}
							>
								<h4>Reservation #{this.props.index+1}</h4>
								{/* {console.log(this.props.info.id)} */}
								<ul className="reservation-list">
									<li>Name: {this.props.info.client.first_name + " " + this.props.info.client.last_name}</li>
									<li>Email: {this.props.info.client.email}</li>
									<li>Fecha de inicio: {initDate.getDate() + "/"+initDate.getMonth()+"/"+initDate.getFullYear()}</li>
									<li>Fecha de fin: {endDate.getDate() + "/"+endDate.getMonth()+"/"+endDate.getFullYear()}</li>
									<li>Status: <span className={this.props.info.status === "Asiste"? "asiste":"noAsiste"}>{this.props.info.status}</span></li>
								</ul>
							</div>
						)}
					</Draggable>	
        );
    }
}

export default Reservation;

