const NodeHelper = require("node_helper");
const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));
const Log = require("logger");
const xpath    = require("xpath");
const { DOMParser } = require("@xmldom/xmldom");
const select = xpath.useNamespaces({
 'atom': "http://www.w3.org/2005/Atom",
 'cap': "urn:oasis:names:tc:emergency:cap:1.2"
});

module.exports = NodeHelper.create({
    start: function() {
        Log.info("Starting node_helper for MMM-WeatherAlerts-US...");
    },

    socketNotificationReceived: async function(notification, payload) {
        if (notification === "GET_NOAA_ALERTS") {
          Log.info("WxAlerts: GET_NOAA_ALERTS")
          const { lat, lon } = payload;
          Log.info("WxAlerts - intermediate payload" + lat + " " + lon); 
          const alerts = await this.getAlerts(lat, lon);
          // Send the results back to your front-end module
          this.sendSocketNotification("ALERTS_RECEIVED", alerts);
        }
    },

    async getAlerts(lat, lon) {
        const alertsUrl = `https://api.weather.gov/alerts/active.atom?point=${lat},${lon}`;
        Log.info("WxAlerts: Alerts URL" + alertsUrl);
        const result = await fetch(alertsUrl);
        //const doc = new DOMParser().parseFromString(result, "text/xml");
        Log.info("WxAlerts: Parsed DOM" + result);
    }
});