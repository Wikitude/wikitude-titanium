
# Augmented Reality - Wikitude SDK Module
by Wikitude GmbH - [www.wikitude.com](http://www.wikitude.com)


## Supported mobile operating systems
* Android 
* iOS

**Important: Modules run on [Titanium 3.1+](http://www.appcelerator.com/platform/titanium-platform) only**


For detailed documentation please see the README files in the respective Android or iOS Module folder

## Tested Titanium versions
* Titanium SDK 3.1


## DESCRIPTION 


The Wikitude Titanium Module enables you to embed an augmented reality view in your Titanium project. One can create a fully featured app with advanced augmented reality features purely using HTML, CSS and Javascript.
All you need to do is pasting the Android and iOS module into your Titanium project (compare [WikitudeTitaniumSample](WikitudeTitaniumSample/)) and add the AR-View as demoed.
In case you want to adjust iOS or Android Module's source code feel free to have a closer look at the implementation and send us a pull-request.

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
* [Full documentation and additional tutorials](http://developer.wikitude.com/documentation)
* [Developer Forum](http://developer.wikitude.com/developer-forum)
* [Wikitude SDK Download](http://developer.wikitude.com/download)
* [Google+ Page for News](https://plus.google.com/u/0/103004921345651739447/posts)
* [Developer Newsletter](http://www.wikitude.com/developer/newsletter)



##PREREQUISITES
* Having set-up [Titanium Studio](http://www.appcelerator.com/platform/titanium-platform/)
* Download [Wikitude SDK](http://developer.wikitude.com/download)
* Import the provided Module and ensure class path and all build.properties are set-up properly. Be aware that the Wikitude SDK runs only on Android 2.2+ devices (=Android SDK v8); you must not call the module on devices with a lower Android SDK version.


## JAVASCRIPT INTERFACE
	
It is straightforward to use the Wikitude Module within your existing Titanium project.

Have a look at the `ArWindow.js` sample implementation. You can for example create a fullscreen ARView declaring

	arview = wikitude.createWikitudeView({
			licenseKey : '',
			bottom : 0, left : 0, right : 0, top : 0
		});
		
and then use

```arview.architectWorldUri = 'http://yourserver/your-ar-experience.html'```

Interaction between AR-View and Titanium is possible via predefined `document.location` changes. Any `document.location = 'architectsdk://...'` will fire an event in the so called UrlListener. To register as UrlListener use the `addEventListener`-method.

e.g.

	arview.addEventListener('URL_WAS_INVOKED', onUrlWasInvoked);

	var onUrlWasInvoked = function(event) {
		alert('invoked url: ' + event.url)
		// TODO handle if used insude your AR experience
	};


to load your AR-World. You can find details on how to create so called 'AR World' on [our website](http://developer.wikitude.com/download) 

## WATERMARK

The free trial version of the Wikitude SDK shows a start-up animation and a trial watermark in the camera-view. To get rid of this please register as a developer at the [Wikitude](www.wikitude.com) website and have a look at the store and [pricing plan](http://www.wikitude.com/developer/download-sdk/pricing/).

Enter the SDK-key when creating the WikitudeView:

	arview = wikitude.createWikitudeView({
			licenseKey: 'YOUR-KEY' , 
			bottom: 0,
			left: 0,
			right: 0,
			top: 0
		});
		
Please use the id listed in `tiapp.xml` as package-identifier when requesting the license key

	<id>com.wikitude.titaniumsample</id>

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
   
## Need help?
Interested in advanced usage of the module and need assistance? 
[Register as a Wikitude developer](http://developer.wikitude.com) and get support in our [forum](http://developer.wikitude.com/developer-forum).

For further questions visit us on [www.wikitude.com](www.wikitude.com) or contact us via `titanium <at> wikitude.com`



