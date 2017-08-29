jQuery(document).ready(function($){

	$('.mgl_twitter_vertical .mgl_tweets').each(function(){
		var parametersString = $(this).data('mgl-slider-parameters');

		//alert(parametersString);

		// Convert parametersString to object
		var parameters = JSON.parse('{"' + decodeURI(parametersString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

		// Call slider
		$(this).bxSlider( buildParameters(parameters) );

	});

	function buildParameters(givenParameters) {
		
		var parameters = {}

		parameters['mode'] = 'vertical';
		parameters['adaptiveHeight'] = false;
		parameters['nextText'] = '';
		parameters['prevText'] = '';

		var availableParameters = { 
			'slides' 	: 'minSlides', 
			'autoplay' 	: 'auto', 
			'pager' 	: 'pager', 
			'controls' 	: 'controls',
			'pause' 	: 'pause',
			'speed'		: 'speed'
		};

		// Iterate over givenParameters
		$.each(givenParameters, function(index, item) {
		    // Check if is in availabe
		    if( index in availableParameters ) {
		    	// If not empty, do something
		    	if(item != '') {
		    		var value;
		    		switch(index) {

					    case 'pause':
					    case 'speed':
					    case 'slides':
					    	// Convert to int
					        value = parseInt(item);
					        break;

					    case 'autoplay':
					    case 'pager':
					    case 'controls':
					    	// Convert to bool
					        value = (item === 'true');
					        break;

					    default:
					    	// Do nothing
					        value = item;
					} 
					// Add to array
		    		parameters[ availableParameters[index] ] = value;
		    	}
		    	
		    }

		});
		
		// Is rtl?
		if(givenParameters.direction == 'rtl') {
			parameters['rtl'] = true;
		}

		console.log(givenParameters);
		console.log(parameters);

		return parameters;
	}
	
});