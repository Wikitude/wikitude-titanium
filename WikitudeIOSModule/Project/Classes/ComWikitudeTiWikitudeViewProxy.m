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

#import "ComWikitudeTiWikitudeViewProxy.h"
#import "TiUtils.h"

@implementation ComWikitudeTiWikitudeViewProxy

-(id)init
{
	// This is the designated initializer method and will always be called
	// when the view proxy is created.
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] init");
	
	return [super init];
}

-(void)_destroy
{
	// This method is called from the dealloc method and is good place to
	// release any objects and memory that have been allocated for the view proxy.
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] _destroy");

	[super _destroy];
}

-(void)dealloc
{
	// This method is called when the view proxy is being deallocated. The superclass
	// method calls the _destroy method.
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] dealloc");
	
	[super dealloc];
}

-(id)_initWithPageContext:(id<TiEvaluator>)context
{
	// This method is one of the initializers for the view proxy class. If the
	// proxy is created without arguments then this initializer will be called.
	// This method is also called from the other _initWithPageContext method.
	// The superclass method calls the init and _configure methods.
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] _initWithPageContext (no arguments)");
	
	return [super _initWithPageContext:context];
}

-(id)_initWithPageContext:(id<TiEvaluator>)context_ args:(NSArray*)args
{
	// This method is one of the initializers for the view proxy class. If the
	// proxy is created with arguments then this initializer will be called.
	// The superclass method calls the _initWithPageContext method without
	// arguments.
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] _initWithPageContext %@", args);
	
	return [super _initWithPageContext:context_ args:args];
}

-(void)_configure
{
	// This method is called from _initWithPageContext to allow for
	// custom configuration of the module before startup. The superclass
	// method calls the startup method.
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] _configure");
	
	[super _configure];
}

-(void)_initWithProperties:(NSDictionary *)properties
{
	// This method is called from _initWithPageContext if arguments have been
	// used to create the view proxy. It is called after the initializers have completed
	// and is a good point to process arguments that have been passed to the
	// view proxy create method since most of the initialization has been completed
	// at this point.
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] _initWithProperties %@", properties);
	
	[super _initWithProperties:properties];
}

-(void)viewWillAttach
{
	// This method is called right before the view is attached to the proxy
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] viewWillAttach");
}

-(void)viewDidAttach
{
	// This method is called right after the view has attached to the proxy

	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] viewDidAttach");
}

-(void)viewDidDetach
{
	// This method is called right before the view is detached from the proxy
	
	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] viewDidDetach");
}

-(void)viewWillDetach
{
	// This method is called right after the view has detached from the proxy

	NSLog(@"[VIEWPROXY LIFECYCLE EVENT] viewWillDetach");
}

@end
