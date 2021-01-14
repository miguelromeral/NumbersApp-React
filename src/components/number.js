import React from 'react'
import trimDateValue from './trimDateValue'
import 'bootstrap/dist/css/bootstrap.css'

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



/*

{4 items
"text":"the number of steps in the gallows"
"number":13
"found":true
"type":"trivia"
}

*/

