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
#import "ComWikitudeTiModule.h"
#import "TiBase.h"
#import "TiHost.h"
#import "TiUtils.h"

@implementation ComWikitudeTiModule

#pragma mark Internal

// this is generated for your module, please do not change it
-(id)moduleGUID
{
	return @"e90fcd9a-d817-4c71-b3b8-9bd677ad4d2c";
}

// this is generated for your module, please do not change it
-(NSString*)moduleId
{
	return @"com.wikitude.ti";
}

#pragma mark Lifecycle

-(void)startup
{
	// This method is called when the module is first loaded
	// you *must* call the superclass
	
	[super startup];

}

-(void)shutdown:(id)sender
{
	// This method is called when the module is being unloaded.
	// Typically this is during application shutdown. Make sure you don't do too
	// much processing here or the app will be quit forceably
	
	// You *must* call the superclass
	[super shutdown:sender];
}

-(id)init
{
	// This is the designated initializer method and will always be called
	// when the proxy is created.

	return [super init];
}

-(void)_destroy
{
	// This method is called from the dealloc method and is good place to
	// release any objects and memory that have been allocated for the module.
	
	[super _destroy];
}

-(void)dealloc
{
	// This method is called when the proxy is being deallocated. The superclass
	// method calls the _destroy method.
	
	[super dealloc];
}

-(void)suspend:(id)sender
{
	// This method is called when the application is being suspended
	
	[super suspend:sender];
}

-(void)resume:(id)sender
{
	// This method is called when the application is being resumed

	[super resume:sender];
}

-(void)resumed:(id)sender
{
	// This method is called when the application has been resumed
	
	[super resumed:sender];
}

-(id)_initWithPageContext:(id<TiEvaluator>)context
{
	// This method is one of the initializers for the proxy class. If the
	// proxy is created without arguments then this initializer will be called.
	// This method is also called from the other _initWithPageContext method.
	// The superclass method calls the init and _configure methods.
	
	return [super _initWithPageContext:context];
}

-(id)_initWithPageContext:(id<TiEvaluator>)context_ args:(NSArray*)args
{
	// This method is one of the initializers for the proxy class. If the
	// proxy is created with arguments then this initializer will be called.
	// The superclass method calls the _initWithPageContext method without
	// arguments.
	
	return [super _initWithPageContext:context_ args:args];
}

-(void)_configure
{
	// This method is called from _initWithPageContext to allow for
	// custom configuration of the module before startup. The superclass
	// method calls the startup method.
	
	[super _configure];
}

-(void)_initWithProperties:(NSDictionary*)properties
{
	// This method is called from _initWithPageContext if arguments have been
	// used to create the proxy. It is called after the initializers have completed
	// and is a good point to process arguments that have been passed to the
	// proxy create method since most of the initialization has been completed
	// at this point.

	[super _initWithProperties:properties];
}

@end
