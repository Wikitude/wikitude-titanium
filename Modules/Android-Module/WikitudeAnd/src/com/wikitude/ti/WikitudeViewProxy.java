package com.wikitude.ti;

import java.util.HashMap;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.kroll.common.AsyncResult;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.kroll.common.TiMessenger;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.proxy.TiViewProxy;
import org.appcelerator.titanium.view.TiUIView;

import android.app.Activity;
import android.os.Handler;
import android.os.Message;

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
 * @version 0.1 Initial Beta version (2012-12; Interplay Software SRL)
 *
 * @author Alessandro Zolet for Interplay Software SRL
 *
 */

@Kroll.proxy(creatableInModule=WikitudeandModule.class)
public class WikitudeViewProxy extends TiViewProxy 
{
	private static final String TAG = "WikitudeViewProxy";

	public WikitudeViewProxy()
	{
		super();
		Log.d(TAG, "constructor called");
	}

	@Override
	public TiUIView createView(Activity activity)
	{
		Log.d(TAG, "createView called");

		TiUIView view = new WikitudeView(this);
		view.getLayoutParams().autoFillsHeight = true;
		view.getLayoutParams().autoFillsWidth = true;
		return view;
	}

	@Override
	public void handleCreationDict(KrollDict options)
	{
		super.handleCreationDict(options);
		Log.d(TAG, "handleCreationDict called");
	}

	private static final int MSG_SET_ARCHITECT_WORLD_URI = 10000;
	private static final int MSG_SET_JS = 10001;
	private static final int MSG_SET_USER_LOCATION = 10002;
	private static final int MSG_SET_CULLING_DISTANCE = 10003;

	@Kroll.setProperty(retain=false)
	public void setArchitectWorldUri(final String uri) 
	{
		Log.d(TAG, "setArchitectWorldUri called");

		if (view != null) {
			if (!TiApplication.isUIThread()) {
				TiMessenger.sendBlockingMainMessage(new Handler(TiMessenger.getMainMessenger().getLooper(), new Handler.Callback() {
					public boolean handleMessage(Message message) {
						switch (message.what) {
							case MSG_SET_ARCHITECT_WORLD_URI: {
								AsyncResult result = (AsyncResult) message.obj;
								WikitudeView wikitudeView = (WikitudeView) view;
								wikitudeView.setArchitectWorldUri(uri);
								result.setResult(null);
								return true;
							}
						}
						return false;
					}
				}).obtainMessage(MSG_SET_ARCHITECT_WORLD_URI), uri);
			} else {
				WikitudeView wikitudeView = (WikitudeView) view;
				wikitudeView.setArchitectWorldUri(uri);
			}
		}

		setProperty(WikitudeView.PROPERTY_ARCHITECT_WORLD_URI, uri, true);
	}

	@Kroll.setProperty(retain=false)
	public void setCullingDistance(final float cullingDistance)
	{
		Log.d(TAG, "invoked setCullingDistance(" + cullingDistance + ")");

		if (view != null) {
			if (!TiApplication.isUIThread()) {
				TiMessenger.sendBlockingMainMessage(new Handler(TiMessenger.getMainMessenger().getLooper(), new Handler.Callback() {
					public boolean handleMessage(Message message) {
						switch (message.what) {
							case MSG_SET_CULLING_DISTANCE: {
								AsyncResult result = (AsyncResult) message.obj;
								WikitudeView wikitudeView = (WikitudeView) view;
								wikitudeView.setCullingDistance(cullingDistance);
								result.setResult(null);
								return true;
							}
						}
						return false;
					}
				}).obtainMessage(MSG_SET_CULLING_DISTANCE), cullingDistance);
			} else {
				WikitudeView wikitudeView = (WikitudeView) view;
				wikitudeView.setCullingDistance(cullingDistance);
			}
		}

		setProperty(WikitudeView.PROPERTY_CULLING_DISTANCE, cullingDistance, true);
	}	

	@Kroll.setProperty(retain=false)
	public void setUserLocation(final HashMap location)
	{
		Log.d(TAG, "setUserLocation called");

		if (view != null) {
			if (!TiApplication.isUIThread()) {
				TiMessenger.sendBlockingMainMessage(new Handler(TiMessenger.getMainMessenger().getLooper(), new Handler.Callback() {
					public boolean handleMessage(Message message) {
						switch (message.what) {
							case MSG_SET_USER_LOCATION: {
								AsyncResult result = (AsyncResult) message.obj;
								WikitudeView wikitudeView = (WikitudeView) view;
								wikitudeView.setUserLocation(location);
								result.setResult(null);
								return true;
							}
						}
						return false;
					}
				}).obtainMessage(MSG_SET_USER_LOCATION), location);
			} else {
				WikitudeView wikitudeView = (WikitudeView) view;
				wikitudeView.setUserLocation(location);
			}
		}

		setProperty(WikitudeView.PROPERTY_USER_LOCATION, location, true);
	}

	@Kroll.setProperty(retain=false)
	public void setJs(final String code)
	{
		Log.d(TAG, "setJs called");

		if (view != null) {
			if (!TiApplication.isUIThread()) {
				TiMessenger.sendBlockingMainMessage(new Handler(TiMessenger.getMainMessenger().getLooper(), new Handler.Callback() {
					public boolean handleMessage(Message message) {
						switch (message.what) {
							case MSG_SET_JS: {
								AsyncResult result = (AsyncResult) message.obj;
								WikitudeView wikitudeView = (WikitudeView) view;
								wikitudeView.setJs(code);
								result.setResult(null);
								return true;
							}
						}
						return false;
					}
				}).obtainMessage(MSG_SET_JS), code);
			} else {
				WikitudeView wikitudeView = (WikitudeView) view;
				wikitudeView.setJs(code);
			}
		}

		setProperty(WikitudeView.PROPERTY_JS, code, true);
	}

	@Override
	public void release() {
		super.release();
		Log.d(TAG, "release called");
	}

	@Override
	public void releaseViews() {
		super.releaseViews();
		Log.d(TAG, "releaseViews called");
	}
	
}