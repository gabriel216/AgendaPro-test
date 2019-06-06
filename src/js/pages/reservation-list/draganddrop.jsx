import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Reservation from "../../components/reservation";
import { getReservations } from "../../actions/index";
import "@atlaskit/css-reset";
import "../../../statics/css/reservation-list-page.css";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;


const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
	}
	
	componentDidMount() {
		this.props.getReservations();
	}

  onDragEnd(result) {
		const { destination, source, draggableId} = result;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

		// const column = this.props.reservations[source.droppableId];
		// const items = Array.from(column.id)
		// items.splice(source.index, 1)
		// items.splice(destination.index, 0, draggableId);

		// const newColumn = {
		// 	...column, 
		// 	id: items
		// };
		// const newState = {
		// 	...this.state,
		// 	columns: {
		// 		...this.state.columns,
		// 		[newColumn.id]:newColumn
		// 	}
		// }
		// this.setState(newState);
    // const items = reorder(
    //   this.props.reservations,
    //   result.source.index,
    //   result.destination.index
    // );

    // this.setState({
    //   items
    // });
  }

  render() {
    return (
				<div className="container-fluid">
					<div className="row">
						<DragDropContext onDragEnd={this.onDragEnd}>
							<div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 canceled-reservations" >
								<Droppable droppableId="canceledReservations">
									{(provided, snapshot)=> (
										<div 
													{...provided.droppableProps}
													ref={provided.innerRef}
													style={getListStyle(snapshot.isDraggingOver)}
													className="row">
												{this.props.reservations.map((el, i) => 
													(
														<div key={el.id}>
														{/* <Reservation info={el} index={i}/> */}
															{el.status === "Cancelado" ? <Reservation info={el} index={i}/>:''}
														</div>
													)
												)}
												
											{provided.placeholder}
										</div>								
									)}
								</Droppable>
							</div>
						</DragDropContext>
					</div>
				</div>
    );
  }
}


function mapStateToProps(state) {
	return {
			reservations:state.remoteReservations.slice()
	}
}

export default connect(mapStateToProps,{ getReservations })(ReservationList);
