# Augmented Reality - Wikitude SDK Plugin
by Wikitude GmbH - [www.wikitude.com](http://www.wikitude.com)

Interested in advanced usage of the plugin and need assistance? 
[Register as a Wikitude developer](http://developer.wikitude.com) and get support in our forum.

For further questions visit us on [www.wikitude.com](www.wikitude.com) or contact us via `titanium <at> wikitude.com`

#### Important: This plugin runs on latest [Titanium 3.0+](http://www.appcelerator.com/platform/titanium-platform) only


## DESCRIPTION 


The Wikitude Titanium Module enables you to embed an Augmented Reality in your Titanium project. 
One can create a fully featured app with advanced Augmented Reality features purely using HTML, CSS and Javascript.

###The Wikitude Titanium Module

* Simple and seamless native Titanium integration
* Fully customizable Augmented Realty view
* Includes the full feature set of the Wikitude SDK
* AR content is purely written in HTML and JavaScript

![image](http://www.wikitude.com/wp-content/uploads/2012/12/Plugin_Phonegap.png)

###The Augmented Reality View
From a technical point of view the SDK is a UI component, similar to a web view. In contrast to a standard web view this AR view can render Augmented Reality content.

Note: Content developed for this AR View is written in JavaScript and HTML. The .html and .js files for this view are different from the Titanium .js and .html files. The AR engine working in the background is called ARchitect Engine and is powering the SDK.

###Further developer resources
* [Full documentation and additional tutorials](http://forum.wikitude.com/documentation)
* [Developer Forum](http://forum.wikitude.com/home)
* [Wikitude SDK Download](http://forum.wikitude.com/download)
* [Google+ Page for News](https://plus.google.com/u/0/103004921345651739447/posts)
* [Developer Newsletter](http://www.wikitude.com/developer/newsletter)



##Prerequisites
* Having set-up [Titanium Studio](http://www.appcelerator.com/platform/titanium-platform/)
* Download [Wikitude SDK](http://www.wikitude.com/developer/download-sdk)
* Import provided Module and ensure class path and all build.properties are set-up properly Be aware that the Wikitude SDK runs only on Android 2.2+ devices (=Android SDK v8); you must not call the plugin on devices with lower SDK version.

## SETUP - Sample Project

1. Import Sample Project and adjust class path and build-properties are set properly
2. Right-click Wikitude's Android Module, press publish and apply the module to your sample project.
3. You now see the generated module files inside your Sample Project.
4. Modify `Resources/ui/windows/MainWindow.js` to change the AR-Experience's source (have a look at the `ArWindow` sample implementation)
5. Run SampleProject on Android device (Emulator currently not supported)


[License](http://www.wikitude.com/store/buy-sdk?pcategory=buysdk) your app to get rid of the watermarking


## JAVASCRIPT INTERFACE
	
Its simple to use the Wikitude Module within your existing Titanium project.

Have a look at the `ArWindow.js` sample implementation. You can e.g. create a fullscreen ARView declaring

```arview = wikitude.createWikitudeView({
			licenseKey : '',
			bottom : 0, left : 0, right : 0, top : 0
		});```
		
and then use

```arview.architectWorldUri = 'http://yourserver/your-ar-experience.html'```

to load your AR-World. You can find details on how to create so called 'AR World' on [our website](http://www.wikitude.com/developer/documentation) 


## LICENSE

   Copyright 2012 [Wikitude GmbH ](http://www.wikitude.com)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   

