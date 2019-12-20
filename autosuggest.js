import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

const persons = [
	{
		name : 'Tia Sharma',
		age : 18
	},
	{
		name : 'Nia Verma',
		age : 20
	}
];

class GetPerson extends Component{
	constructor(){
		super();
		this.state = {
			value : '',
			suggestions : []
		}
	}

	getSuggestions = value => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		return inputLength === 0 ? [] : persons.filter(person => {
			person.name.toLowerCase().slice(0,inputLength) === inputValue;
		});
	}

	const getSuggestionValue = suggestion => suggestion.name;

	const renderSuggestion = suggestion => (
		<div>
			{suggestion.name}
		</div>
	);

	onClick = (e , newValue) => {
		this.setState({value : newValue});
	}
    
    onSuggestionsFetchRequested = (value) => {
    	this.setState({suggestions : getSuggestions(value)});
    }

    onSuggestionsClearRequested = () => {
    	this.setState({suggestions : []});
    }

	render(){
		const {value , suggestions} = this.state;

		const inputProps = {
			placeholder : 'Type a name',
			value,
			onChange: this.onChange
		};
		return{
			<Autosuggest 
			suggestions = {suggestions}
			onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
			onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
			getSuggestionValue = {getSuggestionValue}
			renderSuggestion = {renderSuggestion}
			inputProps = {inputProps}
			/>
		}
	}
}

export default GetPerson;