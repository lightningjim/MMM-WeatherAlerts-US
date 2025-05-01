Module.register("MMM-WeatherAlerts-US",{
    // Default module config.
    defaults: {
		updateInterval: 15*60*1000, // 10 minutes
		retryDelay: 2500,
		animationSpeed: 1000,
    },

	getStyles: function () {
		return ["weather-icons.css", "MMM-WeatherAlerts-US.css"];
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification("GET_NOAA_ALERTS", { lat: this.config.lat, lon: this.config.lon});
	},

	socketNotificationReceived: function (notification, payload) {
		if(notification === "ALERTS_RECEIVED") {
			this.alerts = payload;
			this.updateDom();
		}
	},

	getDom: function () {
		return "YES"
	}
});
