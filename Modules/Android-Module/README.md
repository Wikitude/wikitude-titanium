# Augmented Reality - Wikitude SDK Module
by Wikitude GmbH - [www.wikitude.com](http://www.wikitude.com)

Interested in advanced usage of the module and need assistance? 
[Register as a Wikitude developer](http://developer.wikitude.com) and get support in our forum.

For further questions visit us on [www.wikitude.com](www.wikitude.com) or contact us via `titanium <at> wikitude.com`

#### Important: This module runs on latest [Titanium 3.0+](http://www.appcelerator.com/platform/titanium-platform) only


## DESCRIPTION 


The Wikitude Titanium Module enables you to embed an augmented reality view in your Titanium project. One can create a fully featured app with advanced augmented reality features purely using HTML, CSS and Javascript.

###The Wikitude Titanium Module

* Simple and seamless native Titanium integration
* Fully customizable augmented reality (AR) view
* Full feature set of the Wikitude SDK
* AR content is purely written in HTML and JavaScript

![image](http://www.wikitude.com/wp-content/uploads/2012/12/Module_Titanium.png)

###The Augmented Reality View
From a technical point of view the SDK adds a UI component called **AR View**, similar to a web view. In contrast to a standard web view the AR View can render augmented reality content.

Content developed for the AR View is written in JavaScript and HTML. The .html and .js files for the AR view are different from the Titanium .js and .html files.

###Further developer resources
* [Full documentation and additional tutorials](http://forum.wikitude.com/documentation)
* [Developer Forum](http://forum.wikitude.com/home)
* [Wikitude SDK Download](http://forum.wikitude.com/download)
* [Google+ Page for News](https://plus.google.com/u/0/103004921345651739447/posts)
* [Developer Newsletter](http://www.wikitude.com/developer/newsletter)



##Prerequisites
* Having set-up [Titanium Studio](http://www.appcelerator.com/platform/titanium-platform/)
* Download [Wikitude SDK](http://www.wikitude.com/developer/download-sdk)
* Import the provided Module and ensure class path and all build.properties are set-up properly. Be aware that the Wikitude SDK runs only on Android 2.2+ devices (=Android SDK v8); you must not call the module on devices with a lower Android SDK version.

## SETUP - Sample Project

1. Import the Sample Project and adjust class path and build properties are set properly
2. Right click Wikitude's Android Module, press publish and apply the module to your sample project.
3. You now see the generated module files inside your Sample Project.
4. Modify `Resources/ui/windows/MainWindow.js` to change the AR-Experience's source (have a look at the `ArWindow` sample implementation)
5. Run Sample Project on Android device (Emulator currently not supported)

6. Visit [Wikitude Developer Site](http://developer.wikitude.com) to find samples and how to [license] (http://www.wikitude.com/store/buy-sdk?pcategory=buysdk) your app to remove the watermark in the camera


## JAVASCRIPT INTERFACE
	
It is straightforward to use the Wikitude Module within your existing Titanium project.

Have a look at the `ArWindow.js` sample implementation. You can for example create a fullscreen ARView declaring

	arview = wikitude.createWikitudeView({
			licenseKey : '',
			bottom : 0, left : 0, right : 0, top : 0
		});
		
and then use

```arview.architectWorldUri = 'http://yourserver/your-ar-experience.html'```

to load your AR-World. You can find details on how to create so called 'AR World' on [our website](http://www.wikitude.com/developer/documentation) 


## LICENSE

   Copyright 2013 [Wikitude GmbH](http://www.wikitude.com)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   

