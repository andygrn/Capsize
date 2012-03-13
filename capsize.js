
/*

	Capsize - Upside-down CSS
	Andy Green
	http://andygrn.co.uk
	March 2012

*/

function Capsize(){}

Capsize.parse = function ( input ){

	var lines = [];
	var output = {};
	var buffer;
	var rule;
	var declaration;
	var selectors;
	var i;
	var j;
	var k;

	input = input
		.replace( /[	\r\n]+/g, '' ) // Remove tabs and newlines
		.replace( /\/\*.*\*\//g, '' ) // Remove comments
		.replace( /;[ ]+/g, ';' ); // Remove spaces between declarations

	lines = input.split( '}' );
	lines.pop();

	for ( i = 0; i < lines.length; i += 1 ){
		rule = lines[i].split( '{' );
		rule[1] = rule[1].split( ';' ); // Split multiple declarations
		
		if ( rule[1][rule[1].length - 1] === '' ){
			rule[1].pop(); // Remove empty value if present
		}

		buffer = {};

		for ( j = 0; j < rule[1].length; j += 1 ){
			declaration = rule[1][j].split( ':' );
			selectors = declaration[0].split( ',' ); // Split multiple selectors
			for ( k = 0; k < selectors.length; k += 1 ){
				selectors[k] = this.trim( selectors[k] );
				buffer[selectors[k]] = this.trim( declaration[1] );
			}
		}

		output[rule[0]] = buffer;
	}

	return this.render( output );

}

Capsize.render = function ( object ){

	var rules = {};
	var buffer = [];
	var i;

	for ( i in object ){
		for ( j in object[i] ){
			rules[j] = rules[j] || [];
			rules[j].push( i + ':' + object[i][j] );
		}
	}

	for ( i in rules ){
		buffer.push( i + '{' + rules[i].join( ';' ) );
	}

	return buffer.join( '}' ) + '}';

}

Capsize.trim = function ( input ){
	return input.replace(/^ +/, '').replace(/ +$/, '');
}
