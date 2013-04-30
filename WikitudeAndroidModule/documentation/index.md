# Wikitude Android Module

## Description

The module integrates the power of Wikitude's ARchitect tools within a Titanium mobile application.

## Configuration

In order to correctly pack the module, you have to follow these steps:

1. include the Wikitude SDK (1.1) and QCAR java libraries (jar files) within your project; put files under the lib folder;

2. include the native Wikitude SDK, Vuforia Extension and QCAR libraries within your project; put files under libs/armeabi and libs/armeabi-v7a folders;

3. edit the build.properties file to match your Android SDK and Android NDK locations.

See the CHANGELOG.txt file for issues concerning the ARchitect world resources location.

## Testing

The module was tested with Wikitude SDK 1.1, Titanium SDK 2.1.4.GA and Android 2.2.

## Changelog

### Version 0.1

This version provides a very basic implementation of the Wikitude integration module.

#### KNOWN ISSUES

- whenever a Wikitude view which makes use of trackers for image recognition purposes gets destroyed, the process may be freezed for several seconds
- whenever a Wikitude view temporarily loses focus, some resources should to be released, in order to reduce computation, memory and power consumption

### Version 0.1.1

- added a cullingDistance property, such that every object off this range is not visible
- added a userLocation property, that is forcedly used in place of the user locations provided by the LocationManager; useful for debugging purpose

#### KNOWN ISSUES

- whenever a Wikitude view which makes use of trackers for image recognition purposes gets destroyed, the process may be freezed for several seconds
- whenever a Wikitude view temporarily loses focus, some resources should to be released, in order to reduce computation, memory and power consumption
- ARchitect world resources must be currently put into the module assets folder in order to let the application load them properly

## Accessing the Wikitude Module

To access this module from JavaScript, you would do the following:

	var wikitude = require("com.wikitude.ti");

The wikitude variable is a reference to the Module object.	

## Functions

### com.wikitude.ti.createWikitudeView

Creates an instance of the Wikitude view. 

## Properties

The following properties can be passed as arguments to the view.

### licenseKey

The Wikitude license key.

### architectWorldUri

The (ARchitect) world file uri.

### userLocation

A location to be used as current user location, in place of the one caught by the location provider. 

### cullingDistance

Sets the culling distance (in meters). Objects that are further away won't be rendered.

### js

Runs a piece of Javascript code within the Wikitude view context.

## Events

### URL_WAS_INVOKED

## Usage

Please refer to the app.js file.

## Author

Alessandro Zolet @ Interplay Software SRL

## License

This module is written under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html).
