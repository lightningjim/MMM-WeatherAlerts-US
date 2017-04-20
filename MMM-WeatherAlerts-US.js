Module.register("MMM-WeatherAlerts-US",{
    // Default module config.
    defaults: {
		updateInterval: 10*60*1000, // 10 minutes
		initialLoadDelay: 250,
		retryDelay: 2500,
		animationSpeed: 1000,
		location: 'OKZ029', //Cleveland Co, Oklahoma
        text: "Loading..."
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = this.config.text;
        return wrapper;
    },

	getScripts: function () {
		return [
		'alerts.js',
    		'moment.js'
		];
	},

	getStyles: function () {
		return ["weather-icons.css", "MMM-WeatherAlerts-US.css"];
	},

	start: function () {
		Log.info("Starting module:D " + this.name);
		this.scheduleUpdate(this.config.initialLoadDelay);
	},


	loaded: function(callback) {
		this.finishLoading();
		Log.log(this.name + ' is loaded!');
  		callback();
	},
	
	updateAlerts: function () {
		self = this;
		retry = true;

		var url = "https://alerts.weather.gov/cap/wwaatmget.php?x=" + this.config.location;
		//Log.log(this.name +": url " + url);	
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					self.requestComplete = true;
					self.processAlerts(this.responseText);
					self.updateDom(self.config.animationSpeed);
				}
				else {
					self.failureFlag = true;
					self.status = this.status;
					self.updateDom(self.config.animationSpeed);
				}
				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
			}
		};		
		xhttp.send();
	},

	processAlerts: function (data) {
		var xmlDoc = new DOMParser().parseFromString(data,'text/xml');
		alerts = xmlDoc.getElementsByTagName("event");
		alertsClean = alertsParse(alerts);
		this.config.text = alertsClean.length + " alerts";
		Log.log(this.name + ": " + alertsClean.length + " alerts.");
		for(i=0; i<alertsClean.length; i++)
		{

			this.config.text += alertsClean[i].type;
		}

	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		self = this;
		setTimeout(function() {
			self.updateAlerts();
		}, nextLoad);
	}
});
