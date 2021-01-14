import React from 'react'
import trimDateValue from '../classes/trimDateValue'
import 'bootstrap/dist/css/bootstrap.css'

/**
 * Number Functional component
 * @param {*} props Properties
 */
function Number(props) {
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">
					{props.type != 'date' ? props.number : new String(`${props.year}/${trimDateValue(props.date)}`)}

				</h5>
				<p className="card-text">{props.text}</p>
			</div>
		</div>
	)
}

export default Number