package com.wikitude.ti;

import java.io.IOException;
import java.util.HashMap;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollProxy;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.titanium.TiC;
import org.appcelerator.titanium.proxy.TiViewProxy;
import org.appcelerator.titanium.util.TiConvert;
import org.appcelerator.titanium.view.TiCompositeLayout;
import org.appcelerator.titanium.view.TiCompositeLayout.LayoutArrangement;
import org.appcelerator.titanium.view.TiUIView;

import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.wikitude.architect.ArchitectUrlListener;
import com.wikitude.architect.ArchitectView;
import com.wikitude.architect.ArchitectView.ArchitectConfig;
import com.wikitude.ti.Constants;

/**
 * Appcelerator Titanium is Copyright (c) 2009-2010 by Appcelerator, Inc.
 * and licensed under the Apache Public License (version 2).
 *
 * This module is written under Apache License, Version 2.0.
 *
 * http://www.apache.org/licenses/LICENSE-2.0.html
 *
 * Version history:
 *
 * @version 0.1.1 First stable version, tested with Wiktiude SDK 2.1
 * 			0.1 Initial Beta version (2012-12; Interplay Software SRL)
 *
 */

public class WikitudeView extends TiUIView implements ArchitectUrlListener, LocationListener {

	private final String TAG = "WikitudeView";

	/**
	 * Wikitude SDK key, please have a look at www.wikitude.com
	 */
	public static final String PROPERTY_LICENSE_KEY = "licenseKey";
	
	/**
	 * uri of the world to launch
	 */
	public static final String PROPERTY_ARCHITECT_WORLD_URI = "architectWorldUri";
	
	/**
	 * cullingDistance = maxDistance to show POIs
	 */
	public static final String PROPERTY_CULLING_DISTANCE = "cullingDistance";
	
	/**
	 * current user lcoation
	 */
	public static final String PROPERTY_USER_LOCATION = "userLocation";
	
	public static final String PROPERTY_JS = "js";

	/**
	 * ARchitectView of Wikitude SDK
	 */
	private ArchitectView architectView;
	
	/**
	 * LocationManager firing events on position changes
	 */
	private LocationManager locationManager;

	/**
	 * TODO: You must enter a valid license key here, which maches your Android-package-identifier (the "id" defined in your apps tiapp.xml)
	 */
	private String licenseKey = "";
	
	/**
	 * url to the ARchitect World html-file, is parsed inside
	 */
	private String architectWorldUri;

	public WikitudeView(TiViewProxy proxy) {

		super(proxy);
		
		LayoutArrangement arrangement = LayoutArrangement.DEFAULT;

		/* create full screen layout*/
		if (proxy.hasProperty(TiC.PROPERTY_LAYOUT)) {
			String layoutProperty = TiConvert.toString(proxy.getProperty(TiC.PROPERTY_LAYOUT));
			if (layoutProperty.equals(TiC.LAYOUT_HORIZONTAL)) {
				arrangement = LayoutArrangement.HORIZONTAL;
			} else if (layoutProperty.equals(TiC.LAYOUT_VERTICAL)) {
				arrangement = LayoutArrangement.VERTICAL;
			}
		}

		TiCompositeLayout layout = new TiCompositeLayout(proxy.getActivity(), arrangement);

		/* create ARchitectView */
		architectView = new ArchitectView(proxy.getActivity());

		
		TiCompositeLayout.LayoutParams layoutParams = new TiCompositeLayout.LayoutParams();
		layoutParams.autoFillsHeight = true;
		layoutParams.autoFillsWidth = true;
		
		/* add view to layout*/
		layout.addView(architectView, layoutParams);

		/* set layout */
		setNativeView(layout);
	}

	@Override
	public void listenerAdded(String type, int count, KrollProxy proxy) {
		super.listenerAdded(type, count, proxy);
		Log.d(TAG, "listenerAdded called (" + type + ", " + count + ")");
	}

	@Override
	public void listenerRemoved(String type, int count, KrollProxy proxy) {
		super.listenerRemoved(type, count, proxy);
		Log.d(TAG, "listenerRemoved called (" + type + ", " + count + ")");
	}

	@Override
	public void processProperties(KrollDict properties)
	{
		super.processProperties(properties);
		Log.d(TAG, "processProperties called");

		if (properties.containsKey(PROPERTY_LICENSE_KEY)) {
			licenseKey = properties.getString(PROPERTY_LICENSE_KEY);
			Log.d(TAG, PROPERTY_LICENSE_KEY + " = " + licenseKey);
		}
		if (properties.containsKey(PROPERTY_ARCHITECT_WORLD_URI)) {
			architectWorldUri = properties.getString(PROPERTY_ARCHITECT_WORLD_URI);
			Log.d(TAG, PROPERTY_ARCHITECT_WORLD_URI + " = " + licenseKey);
		}

		ArchitectConfig config = new ArchitectConfig(licenseKey);

		config.setOrigin(ArchitectConfig.ORIGIN_TITANIUM);

		/* quick & dirty, call all activity life-cycle events in right order at one place. should be in activity states */
		architectView.onCreate(config);
		architectView.onPostCreate();
		
		/* url listener gets notifications as soon as document.href = "architectsdk://..." is called in JS*/
		architectView.registerUrlListener(this);

		setArchitectWorldUri(architectWorldUri);

		architectView.onResume();

		locationManager = (LocationManager) proxy.getActivity().getSystemService(Context.LOCATION_SERVICE);
		
		// TODO: implement smart location service if required
		locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 500, 0, this);
		locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 1000, 0, this);
	}

	@Override
	public void propertyChanged(String key, Object oldValue, Object newValue, KrollProxy proxy)
	{
		super.propertyChanged(key, oldValue, newValue, proxy);
		Log.d(TAG, "propertyChanged called (" + key + ", " + oldValue + " to " + newValue + ")");
	}

	// should return an error value, if world was not loaded
	public void setArchitectWorldUri(String uri)
	{
		try {
			if (uri != null && architectView != null) {
				
				// for loading world from local asset folder (YourProject/Resources/android/assets)
				if (!uri.contains("://")) {
					uri = "Resources/assets/" + uri;
				}
				architectWorldUri = uri;
				architectView.load(architectWorldUri);
			} else {
				Log.w(TAG, "ARchitect World was not loaded");
			}
		} catch (IOException e) {
			Log.e(TAG, Constants.ERROR_WORLD_NOT_LOADED, e);
		}
	}

	public void setCullingDistance(float cullingDistance) 
	{
		if (architectView != null)
			architectView.setCullingDistance(cullingDistance);
	}

	public void setUserLocation(HashMap<String, Object> location) 
	{
		if (architectView != null) {
			KrollDict args = new KrollDict(location);
			double lat = args.getDouble("latitude");
			double lng = args.getDouble("longitude");
			locationManager.removeUpdates(this);
			architectView.setLocation(lat, lng, 0.0f);
		}
	}

	// wouldn't be better to create a callJavascript method in the proxy?
	public void setJs(String code) {
		if (architectView != null)
			architectView.callJavascript(code);
	}

	@Override
	public void hide() {
		super.hide();
		Log.d(TAG, "hide called");
	}

	@Override
	public void show() {
		super.show();
		Log.d(TAG, "show called");
	}

	@Override
	public void blur() {
		super.blur();
		Log.d(TAG, "blur called");
	}

	@Override
	public void focus() {
		super.focus();
		Log.d(TAG, "focus called");
	}

	@Override
	public void release() 
	{
		super.release();
		Log.d(TAG, "release called");

		locationManager.removeUpdates(this);

		if (architectView != null) {
			architectView.onPause();
			architectView.onDestroy();
		}
	}

	@Override
	public boolean urlWasInvoked(String url) 
	{
		HashMap<String, String> data = new HashMap<String, String>();
		data.put("url", url);
		proxy.fireEvent(Constants.URL_WAS_INVOKED, data);
		return true;
	}

	@Override
	public void onLocationChanged(Location location) 
	{
		Log.d(TAG, "onLocationChanged fired (" + location.getLatitude() + ", " + location.getLongitude() + ")");
	
		// inject location to architectView, you may implement a smart location strategy in case you need smoother cam experience
		if (architectView != null && location!=null) {
			final float accuracy = location.hasAccuracy()?location.getAccuracy():1000.0f;
			if (location.hasAltitude()) {
				architectView.setLocation(location.getLatitude(), location.getLongitude(), location.getAltitude(), accuracy);
			} else {
				architectView.setLocation(location.getLatitude(), location.getLongitude(), accuracy);
			}
		}
	}

	@Override
	public void onProviderDisabled(String provider) {
		// do nothing
	}

	@Override
	public void onProviderEnabled(String provider) {
		// do nothing
	}

	@Override
	public void onStatusChanged(String provider, int status, Bundle extras) {
		// do nothing
	}

}
