
/**
 * Attaches the calendar behavior to all required fields
 */
Drupal.behaviors.date_popup = function (context) {
  for (var id in Drupal.settings.datePopup) {
    $('#'+ id).bind('focus', Drupal.settings.datePopup[id], function(e) {
      if (!$(this).hasClass('date-popup-init')) {
        var datePopup = e.data;
        // Explicitely filter the methods we accept.
        switch (datePopup.func) {
          case 'datepicker':
            $(this)
              .datepicker(datePopup.settings)
              .addClass('date-popup-init')
            $(this).click(function() {
              $(this).focus();
            });
		  if ($(this).attr('id').indexOf("-value-") >= 0) {
				//We need to initialize value2 as well
				var id2 = $(this).attr('id').replace("-value-", "-value2-");
				$('#'+ id2).each(function (i) {
		            $(this)
		              .datepicker(datePopup.settings)
		              .addClass('date-popup-init')
		            $(this).click(function(){
		              $(this).focus();
		            });
				});				  
				
				//initialize the time so we can update value2 with the difference.
				if( typeof( $.datePopupOldTime ) == 'undefined' ) {
					$.datePopupOldTime = new Object();
				}				  
				$.datePopupOldTime[$(this).attr('id')] = $(this).datepicker("getDate");  
				
				$(this).change(function() {
				  var id2 = $(this).attr('id').replace("-value-", "-value2-");
				  if ($('#'+ id2).val()) { // Only update when second input has a value.
					// Calculate duration.
					var duration = ($('#'+ id2).datepicker("getDate") - $.datePopupOldTime[$(this).attr('id')]);
					var time = $(this).datepicker("getDate");
					// Calculate and update the time in the second input.
					$('#'+ id2).datepicker("setDate", new Date(time.getTime() + duration));
					$.datePopupOldTime[$(this).attr('id')] = time;
				  }
				});				  
			  }
           
            
            break;

          case 'timeEntry':
/* from 6.x-2.9
            $(this)
              .timeEntry(datePopup.settings)
              .addClass('date-popup-init')
            $(this).click(function() {
              $(this).focus();
            });
*/
        	  var timeSettings = e.data.settings;
        	  var timeInit = {show24Hours : timeSettings.show24Hours, step : timeSettings.timeSteps[1]};
			  $(this)
			  	.timePicker(timeInit)
			  	.addClass('date-popup-init');
			  if ($(this).attr('id').indexOf("-value-") >= 0) {
				//We need to initialize value2 as well
				var id2 = $(this).attr('id').replace("-value-", "-value2-");
				$('#'+ id2).each(function (i) {
					if (!$(this).hasClass('date-popup-init')) {	
						$(this)
					  		.timePicker(timeInit)
					  		.addClass('date-popup-init');
					}
				});				  
				
				//initialize the time so we can update value2 with the difference.
				if( typeof( $.datePopupOldTime ) == 'undefined' ) {
					$.datePopupOldTime = new Object();
				}				  
				$.datePopupOldTime[$(this).attr('id')] = $.timePicker(this).getTime();  
				
				$(this).change(function() {
				  var id2 = $(this).attr('id').replace("-value-", "-value2-");
				  if ($('#'+ id2).val()) { // Only update when second input has a value.
					// Calculate duration.
					var duration = ($.timePicker('#'+ id2).getTime() - $.datePopupOldTime[$(this).attr('id')]);
					var time = $.timePicker(this).getTime();
					// Calculate and update the time in the second input.
					$.timePicker('#'+ id2).setTime(new Date(new Date(time.getTime() + duration)));
					$.datePopupOldTime[$(this).attr('id')] = time;
				  }
				});				  
			  }
        

			// Validate.
			/*
			$("#edit-field-date-0-value2-timeEntry-popup-1").change(function() {
			  if($.timePicker("#edit-field-date-0-value-timeEntry-popup-1").getTime() > $.timePicker(this).getTime()) {
				$(this).addClass("error");
			  }
			  else {
				$(this).removeClass("error");
			  }
			});*/
						
            break;
        }
      }
    });
  }
};
