# Wikitude iOS Module

## Description

The module integrates the power of Wikitude's ARchitect tools within a Titanium mobile application.

## Configuration

In order to correctly pack the module, you have to follow these steps:

1. include the native Wikitude SDK (1.1 or 1.2), Vuforia Extension and QCAR static libraries within your project, for instance by respectively copying them under the local folders:

	Libraries/WikitudeSDK/SDK/SDK/lib/Release-iphoneos
	Libraries/WikitudeSDK/SDK/Extensions/VuforiaExtension/lib
	Libraries/WikitudeSDK/SDK/Extensions/QCAR/Library/lib/arm

2. link to those libraries in the module.xcconfig file.

You may encounter some compilation issues, due to the fact that both armv6 and i386 architectures are not supported; please also take a look at https://github.com/pegli/ti_touchdb/wiki. Note that an armv7 device is required. 

## Testing

The module was tested with Wikitude SDK 1.1 and 1.2, Titanium SDK 3.0.0.GA and iOS SDK 5.1 and 6.0.

## Changelog

### Version 0.1

This version provides a very basic implementation of the Wikitude integration module.

#### KNOWN ISSUES

- whenever a Wikitude view which makes use of trackers for image recognition purposes gets destroyed, the process may be freezed for several seconds
- whenever a Wikitude view temporarily loses focus, some resources should to be released, in order to reduce computation, memory and power consumption

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
