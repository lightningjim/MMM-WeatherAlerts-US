var alertsClean = [];
var now = new Date();

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
			break;
		case "Severe":
			return severity_severe;
			break;
		case "Moderate":
			return severity_moderate;
			break;
		case "Minor":
			return severity_minor;
			break;
		default:
			return severity_unknown;
	}
}

function severityToText (severity) {

	switch(severity) {
		case severity_extreme:
			return "Extreme";
			break;
		case severity_severe:
			return "Severe";
			break;
		case severity_moderate:
			return "Moderate";
			break;
		case severity_minor:
			return "Minor";
			break;
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
			break;
		case "Expected":
			return urgency_expected;
			break;
		case "Future":
			return urgency_future;
			break;
		case "Past":
			return urgency_past;
			break;
		default:
			return urgency_unknown;
	}
}

function urgencyToText (urgency) {

	switch(urgency) {
		case urgency_immediate:
			return "Immediate";
			break;
		case urgency_expected:
			return "Expected";
			break;
		case urgency_future:
			return "Future";
			break;
		case urgency_past:
			return "Past";
			break;
		default:
			return "Unknown";
	}
}

function alertsParse(alerts)
{

for (var i=0;i<alerts.length;i++)
	{ 
		alertType = alerts[i].getElementsByTagName("cap:event")[0].childNodes[0].nodeValue;
		title = alerts[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
		summary = alerts[i].getElementsByTagName("summary")[0].childNodes[0].nodeValue;
		effective = new Date(alerts[i].getElementsByTagName("cap:effective")[0].childNodes[0].nodeValue);
		expires = new Date(alerts[i].getElementsByTagName("cap:expires")[0].childNodes[0].nodeValue);
		status = alerts[i].getElementsByTagName("cap:status")[0].childNodes[0].nodeValue;
		category = alerts[i].getElementsByTagName("cap:category")[0].childNodes[0].nodeValue;
		urgency = urgencyToVariable(alerts[i].getElementsByTagName("cap:urgency")[0].childNodes[0].nodeValue);
		severity = severityToVariable(alerts[i].getElementsByTagName("cap:severity")[0].childNodes[0].nodeValue);
		certainty = alerts[i].getElementsByTagName("cap:certainty")[0].childNodes[0].nodeValue;
		title = alerts[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
		summary = alerts[i].getElementsByTagName("summary")[0].childNodes[0].nodeValue;
		areaDesc = alerts[i].getElementsByTagName("cap:areaDesc")[0].childNodes[0].nodeValue;
		if (typeof alerts[i].getElementsByTagName("cap:polygon")[0].childNodes[0] !== 'undefined') 
			polygon = alerts[i].getElementsByTagName("cap:polygon")[0].childNodes[0].nodeValue;
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
	return alertsClean;
}
