var alertsClean = [];

function Alert (aType, aStart, aStop, aStat, aCat, aUrg, aSev, aCert, aTitle, aSum, aArea, aPoly){

	this.type = aType;
	this.effective = aStart;
	this.expires = aStop;
	this.status = aStat;
	this.category = aCat;
	this.urgency = aUrg;
	this.severity = aSev;
	this.certainty = aCert;
	this.title = aTitle;
	this.summary = aSum;
	this.areaDesc = aArea;
	this.polygon = aPoly;

}

function alertSort (a,b) {

	if (a.urgency > b.urgency) return -1;
	if (a.urgency < b.urgency) return 1;
	else return 0;

}

var severity_extreme = 3;
var severity_severe = 2;
var severity_moderate = 1;
var severity_minor = 0;
var severity_unknown = -1;

function severityToVariable (severity) {

	switch(severity) {
		case "Extreme":
			return severity_extreme;
		case "Severe":
			return severity_severe;
		case "Moderate":
			return severity_moderate;
		case "Minor":
			return severity_minor;
		default:
			return severity_unknown;
	}
}

function severityToText (severity) {

	switch(severity) {
		case severity_extreme:
			return "Extreme";
		case severity_severe:
			return "Severe";
		case severity_moderate:
			return "Moderate";
		case severity_minor:
			return "Minor";
		default:
			return "Unknown";
	}
}
var urgency_immediate = 3;
var urgency_expected = 2;
var urgency_future = 1;
var urgency_past = 0;
var urgency_unknown = -1;

function urgencyToVariable (urgency) {

	switch(urgency) {
		case "Immediate":
			return urgency_immediate;
		case "Expected":
			return urgency_expected;
		case "Future":
			return urgency_future;
		case "Past":
			return urgency_past;
		default:
			return urgency_unknown;
	}
}

function urgencyToText (urgency) {

	switch(urgency) {
		case urgency_immediate:
			return "Immediate";
		case urgency_expected:
			return "Expected";
		case urgency_future:
			return "Future";
		case urgency_past:
			return "Past";
		default:
			return "Unknown";
	}
}

function alertsParse(alerts)
{

if(alerts[0].getElementsByTagName("title")[0].childNodes[0].nodeValue == "There are no active watches, warnings or advisories") {return false;}
else{

for (var i=0;i<alerts.length;i++)
	{ 
		//alertType = alerts[i].getElementsByTagName("cap:event")[0].childNodes[0].nodeValue;
		alertType = alerts[i].getElementsByTagName("event")[0].childNodes[0].nodeValue;
		//effective = new Date(alerts[i].getElementsByTagName("cap:effective")[0].childNodes[0].nodeValue);
		effective = new Date(alerts[i].getElementsByTagName("effective")[0].childNodes[0].nodeValue);
		//expires = new Date(alerts[i].getElementsByTagName("cap:expires")[0].childNodes[0].nodeValue);
		expires = new Date(alerts[i].getElementsByTagName("expires")[0].childNodes[0].nodeValue);
		//status = alerts[i].getElementsByTagName("cap:status")[0].childNodes[0].nodeValue;
		status = alerts[i].getElementsByTagName("status")[0].childNodes[0].nodeValue;
		//category = alerts[i].getElementsByTagName("cap:category")[0].childNodes[0].nodeValue;
		category = alerts[i].getElementsByTagName("category")[0].childNodes[0].nodeValue;
		//urgency = urgencyToVariable(alerts[i].getElementsByTagName("cap:urgency")[0].childNodes[0].nodeValue);
		urgency = urgencyToVariable(alerts[i].getElementsByTagName("urgency")[0].childNodes[0].nodeValue);
		//severity = severityToVariable(alerts[i].getElementsByTagName("cap:severity")[0].childNodes[0].nodeValue);
		severity = severityToVariable(alerts[i].getElementsByTagName("severity")[0].childNodes[0].nodeValue);
		//certainty = alerts[i].getElementsByTagName("cap:certainty")[0].childNodes[0].nodeValue;
		certainty = alerts[i].getElementsByTagName("certainty")[0].childNodes[0].nodeValue;
		title = alerts[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
		summary = alerts[i].getElementsByTagName("summary")[0].childNodes[0].nodeValue;
		//areaDesc = alerts[i].getElementsByTagName("cap:areaDesc")[0].childNodes[0].nodeValue;
		areaDesc = alerts[i].getElementsByTagName("areaDesc")[0].childNodes[0].nodeValue;
		//if (typeof alerts[i].getElementsByTagName("cap:polygon")[0].childNodes[0] !== 'undefined') 
		//	polygon = alerts[i].getElementsByTagName("cap:polygon")[0].childNodes[0].nodeValue;
		if (typeof alerts[i].getElementsByTagName("polygon")[0].childNodes[0] !== 'undefined') 
			polygon = alerts[i].getElementsByTagName("polygon")[0].childNodes[0].nodeValue;
		else
			polygon = null;

		//document.write("Before: " + alerts[i].getElementsByTagName("cap:effective")[0].childNodes[0].nodeValue + "<br/>After: " + effective + "<hr/>");

		alert = new Alert(alertType, effective, expires, status, category, urgency, severity, certainty, title, summary, areaDesc, polygon);
		alertsClean.push(alert);

		/*
		document.write("<div>");
		document.write("Event type: " + alerts[i].getElementsByTagName("cap:event")[0].childNodes[0].nodeValue);
		document.write("<br />");
 		document.write("Title: " + alerts[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
		document.write("<br />");
 		document.write("Summary: " + alerts[i].getElementsByTagName("summary")[0].childNodes[0].nodeValue);
		document.write("<br />");
 		document.write("Effective: " + alerts[i].getElementsByTagName("cap:effective")[0].childNodes[0].nodeValue);
		document.write("<br />");
 		document.write("Expires: " + alerts[i].getElementsByTagName("cap:expires")[0].childNodes[0].nodeValue);
		document.write("<br />");
 		document.write("Status: " + alerts[i].getElementsByTagName("cap:status")[0].childNodes[0].nodeValue); // Actual seems to be of the only concern
		document.write("<br />");
 		document.write("Category: " + alerts[i].getElementsByTagName("cap:category")[0].childNodes[0].nodeValue); // "Met" since this is Wx alerts, but expansion for others is a choice
		document.write("<br />");
 		document.write("Urgency: " + alerts[i].getElementsByTagName("cap:urgency")[0].childNodes[0].nodeValue); // Filtering out Past and/or Unknown? Otherwise primary sorting type
		document.write("<br />");
 		document.write("Severity: " + alerts[i].getElementsByTagName("cap:severity")[0].childNodes[0].nodeValue); // Possible sorting as well
		document.write("<br />");
 		document.write("Certainty: " + alerts[i].getElementsByTagName("cap:certainty")[0].childNodes[0].nodeValue); // Possible sorting as well
		document.write("<br />");
 		document.write("Area description: " + alerts[i].getElementsByTagName("cap:areaDesc")[0].childNodes[0].nodeValue); // Needed?
		//document.write("<br />");
 		//document.write("Polygon: " + alerts[i].getElementsByTagName("cap:polygon")[0].childNodes[0].nodeValue);
		//Store as raw text for now. Eventually will be a Polygon object
		//Need to test for "if empty/null"
		document.write("</div><hr />");*/
	}
	alertsClean.sort(alertSort);
	//Log.log(this.name + " alerts.js:  " + alertsClean.length + " alerts.");
	return alertsClean;
}
}

function dowString(dayIndex) {
  return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dayIndex];
}

//Need to know if outputting just time, or also Day as well.
function dateTest(date)
{
	//Set time to 12 Hr standard
	var hours = date.getHours();
	var ampm = hours >=12 ? 'pm' : 'am';
	var hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
	
	var now = new Date();
	//Testing Day
	if (date.getDay() == now.getDay()) {return hours+":"+minutes+" "+ampm;}
	else {return dowString(date.getDay())+", "+hours+":"+minutes+" "+ampm;}
	
}
