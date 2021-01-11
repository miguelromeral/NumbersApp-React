import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function Movie(props) {
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.number}</h5>
				<p className="card-text">{props.text}</p>
			</div>
		</div>
	)
}

export default Movie



/*

{4 items
"text":"the number of steps in the gallows"
"number":13
"found":true
"type":"trivia"
}

*/

