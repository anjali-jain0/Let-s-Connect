//import React, { Component } from 'react';
// import Autosuggest from 'react-autosuggest';

// class GrpAddMembers extends Component{
// 	constructor(){
// 		super();
// 		this.state = {
// 			following:'',
// 			// value : '',
// 			// suggestions : []
// 		}
// 	}

// 	componentWillMount = () => {
// 		fetch('/myfollowing/' + this.props.match.params.usrid)
// 		.then(res => res.json())
//         .then(data => this.setState({following:data}));
// 	}

// 	getSuggestions = value => {
// 		const inputValue = value.trim().toLowerCase();
// 		const inputLength = inputValue.length;
// 		return inputLength === 0 ? [] : this.state.following.filter(person => {
// 			return person.name.toLowerCase().slice(0,inputLength) === inputValue;
// 		});
// 	}

// 	onChange = ( newValue) => {
// 		this.setState({value : newValue});
// 	}
    
//     onSuggestionsFetchRequested = (value) => {
//     	this.setState({suggestions : this.getSuggestions(value)});
//     }

//     onSuggestionsClearRequested = () => {
//     	this.setState({suggestions : []});
//     }

//     handleRequest = (name,grpid) => {
//     	fetch('/grpinvite/' + name + '/' + grpid)
//     	.then(res => res.json())
//     	.then(data => console.log('invite send'));
//     }

// render(){
// 		const {value , suggestions} = this.state;

// 		const getSuggestionValue = suggestion => suggestion.name;

// 		const renderSuggestion = suggestion => (
// 			<div>
// 				{suggestion.name}
// 			</div>
// 		);

// 		const inputProps = {
// 			placeholder : 'Type a name',
// 			value,
// 			onChange: this.onChange
// 		};

// 		if(this.state.following.length!=0){
		// return(
		// <div className='container'>
		// 	<div className="input-field">
		// 		<Autosuggest 
		// 		suggestions = {suggestions}
		// 		onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
		// 		onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
		// 		getSuggestionValue = {getSuggestionValue}
		// 		renderSuggestion = {renderSuggestion}
		// 		inputProps = {inputProps}
		// 		/>
		// 	</div>
		// 	<button onClick={() => {this.handleRequest(this.state.value,this.props.match.params.grpid)}}> Send Invite</button>
	 //    </div>
		// )


// 	} else {
// 		return (
// 			<div>You need to follow someone to send them a request to join your group.</div>
// 			)
// 	}
// 	}
// }

// export default GrpAddMembers ;

// //show pic also to differentiate between same name one


import React, { Component } from 'react';

class GrpAddMembers extends Component{
	constructor(){
		super();
		this.state = {
			following:''
		}
	}

	componentWillMount = () => {
		fetch('/myfollowing/' + this.props.match.params.usrid)
		.then(res => res.json())
        .then(data => this.setState({following:data}));
	}

	handleRequest = (id,gid) => {
		fetch('/grpinvite/' + id + '/' + gid)
		.then(res => res.json());
	}


render(){

	if(this.state.following.length>0){
		var mem=(this.state.following && this.state.following.map(member => {
			return (
				<div className="card" >
                    <div className="card-body">
                        <p>{member.name}</p>
                        <button className='btn btn-success'
						onClick={() => {this.handleRequest(member._id,this.props.match.params.grpid)}}> 
						Send Invite
						</button>
                    </div>
                </div>
				)
		}))
	}

	return(
			<div className="container">
				{mem}
		    </div>
			)

}
}

export default GrpAddMembers;


