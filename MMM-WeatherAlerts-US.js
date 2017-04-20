Module.register("MMM-WeatherAlerts-US",{
    // Default module config.
    defaults: {
		updateInterval: 10*60*1000, // 10 minutes
		initialLoadDelay: 2500,
		animationSpeed: 1000,
		location: 'OKZ029', //Cleveland Co, Oklahoma
        text: "TO WORK SOON"
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
	
		if (!this.loaded) {
	      wrapper.innerHTML = this.translate('LOADING');
	      return wrapper;
		}
        wrapper.innerHTML = this.config.text;
        return wrapper;
    },

	getScripts: function () {
		return [
    		'moment.js'.
			'alert.js'
		];
	},

	getStyles: function () {
		return ["weather-icons.css", "MMM-WeatherAlerts-US.css"];
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.scheduleUpdate(this.config.initialLoadDelay);
	},


	loaded: function(callback) {
		this.finishLoading();
		Log.log(this.name + ' is loaded!');
  		callback();
	},
	
	updateAlerts: function () {

	var url = "https://alerts.weather.gov/cap/wwaatmget.php?x=" + this.config.location;
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, true);
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				this.requestComplete = true;
				this.processAlert(this.responseXML);
				Log.log(this.name + ": GOT IT!");
				this.updateDom(this.config.animationSpeed);
			}
			else {
				Log.log(this.name + ": failed!");
				this.failureFlag = true;
				this.status = this.status;
				self.updateDom(self.config.animationSpeed);
			}
			if (retry) {
				self.scheduleUpdate((self.loaded) ? -1 : self.confg.retryDelay);
			}
		}
		xhttp.send();
	}},

	processAlerts: function (data) {
		alerts = data.getElementsByTagName("event");
		alertsClean = alertsParse(alerts);
	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		clearTimeout(this.updateTimer);
		this.updateTimer = setTimeout(function() {
			this.updateRequest();
		}, nextLoad);
	}
});
