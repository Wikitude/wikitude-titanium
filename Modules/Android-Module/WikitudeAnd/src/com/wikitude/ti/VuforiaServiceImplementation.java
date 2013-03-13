package com.wikitude.ti;

import android.app.Activity;

import com.qualcomm.QCAR.QCAR;
import com.wikitude.architect.VuforiaInterface;

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

public class VuforiaServiceImplementation implements VuforiaInterface {

	@Override
	public void deInit() {
		QCAR.deinit();
	}

	@Override
	public int init() {
		return QCAR.init();
	}

	@Override
	public void onPause() {
		QCAR.onPause();
	}

	@Override
	public void onResume() {
		QCAR.onResume();
	}

	@Override
	public void onSurfaceChanged(int width, int height) {
		QCAR.onSurfaceChanged(width, height);
	}

	@Override
	public void onSurfaceCreated() {
		QCAR.onSurfaceCreated();
	}

	@Override
	public void setInitParameters(Activity activity, int nFlags) {
		QCAR.setInitParameters(activity, nFlags);
	}

}
