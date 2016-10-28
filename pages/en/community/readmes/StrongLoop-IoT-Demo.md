# StrongLoop IoT Demo

This is a [LoopBack](http://loopback.io) application, developed for demostrating the connection of StrongLoop to the Internet of Things.

## Required Hardware:

* [Intel Edison](https://www.sparkfun.com/products/13024) Module
* [Sparkfun 9-Degrees of Freedom Block](https://www.sparkfun.com/products/13033)
* [Sparkfun Base Block](https://www.sparkfun.com/products/13045)
* [Sparkfun Battery Block](https://www.sparkfun.com/products/13037)
* USB Mini-C cable

## Required Software:

* This Code
* [Sensor Application](https://github.com/strongloop-community/LSM9DS0)
* [MongoDB](http://mongodb.org)
    * [MongoDB C-Libraries](https://github.com/mongodb/mongo-c-driver)

## How it works:

The sensor reading application is a native C program that runs locally on the Intel Edison device and reads the 9-Degrees of Freedom board mentioned above.
It then inserts these values to the Mongo DB instance as JSON objects via the StrongLoop APIs.
The StrongLoop APIs then make this data available to the client application vi a series of web pages that graph and display the sensor readings.
![Data Display](docs/Safari019.jpg "Data Display Page")
Notice the 'Show Live Data' button in the upper left corner. Clicking this button causes the page stream live data from the device to the graph in real-time.

## Installing Demo Software

First, you'll need the hardware above, and be able to log into the device.
once you can log in, you;re ready to install all of the software (this repo included):

* Log into the device...
* Install some core libs:
  * `echo "src all http://iotdk.intel.com/repos/1.1/iotdk/all" >> /etc/opkg/base-feeds.conf`
  * `echo "src x86 http://iotdk.intel.com/repos/1.1/iotdk/x86" >> /etc/opkg/base-feeds.conf`
  * `echo "src i586 http://iotdk.intel.com/repos/1.1/iotdk/i586" >> /etc/opkg/base-feeds.conf`
* Update package manager and install git:
  * opkg update
  * opkg upgrade
  * opkg install git
* Grab the controller script from this repo and install all other software:
  * wget --no-check-certificate https://raw.githubusercontent.com/strongloop-community/StrongLoop-IoT-Demo/master/demo-ctrl.sh
  * chmod +x demo-ctrl.sh
  * ./demo-ctrl.sh install  
  _This could take hours and will install and configure all the software packages required for the demo._
* Calibrate the sensors:
  * cd LSM9DS0
  * ./calibrate-mag  
  (Note that this requires interaction with the device!)
  * ./calibrate-acc-gyro  
  (Note that this is VERY sensitive. Make sure the device is on a flat surface, with absolutely no motion. It can even pick up sound, so turn off any music! Even with these measures it may take a couple tries to succeed.)

## Running the Demo

* Log into the device...
* run `./demo-ctrl.sh start`
* Wait for the output to tell you to connect:  
`Connect to your application at http://192.168.1.13:3000/`  
(Or whatever your IP is)
* Choose a Sensor from the top nav and move the device around!
* Hit the "Live" button to see the charts update dynamically

