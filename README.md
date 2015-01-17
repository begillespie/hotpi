#HotPi
Environmental data logging and graphing. There are two components to this project: the Python script and the Couchapp.

##Software
###Python script
Copy the Python directory to wherever you want to run it from. Set up a CRON job to run the script every 5 minutes (or more, or less - your choice).

###Couchapp
With a running CouchDB installation and Couchapp installed, create an empty database and use the ```couchapp push``` command to install.

###Libraries
HotPi uses these open source components

- [CouchDB](http://couchdb.apache.org/)
- [CouchApp](https://github.com/couchapp/couchapp)
- [Mustache](http://mustache.github.io/)
- [jQuery](http://jquery.com)
- [Moment.js](http://momentjs.com/)

##Hardware
A Raspberry Pi (Model B, rev 1) reads the sensors and runs the database. The first iteration is tracking 4 sensors:

1. TMP36 temperature sensor
2. Photoresistor
3. [Adafruit BMP180 Digital Temperature](http://www.adafruit.com/product/1603)
4. [Adafruit BMP180 Digital Barometric Pressure](http://www.adafruit.com/product/1603)

I'm using a CAT 5 cable to tether an outside module holding the BMP180 and photoresistor. A [MCP3008 Analog-Digital Converter](http://www.adafruit.com/product/856) converts the analog sensors to digital.
