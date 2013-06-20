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

#import "ComWikitudeTiWikitudeView.h"
#import "TiUtils.h"

@implementation ComWikitudeTiWikitudeView

-(void)dealloc
{
	NSLog(@"[VIEW LIFECYCLE EVENT] dealloc");

	// Release objects and memory allocated by the view

    if (arview != nil) {
        [arview callJavaScript:@"stopArWorld()"];
        [arview stop];
        // RELEASE_TO_NIL(arview); // currently raises an error
    }

    [super dealloc];
}

-(void)willMoveToSuperview:(UIView *)newSuperview
{
	NSLog(@"[VIEW LIFECYCLE EVENT] willMoveToSuperview");
}

-(void)initializeState
{
	// This method is called right after allocating the view and
	// is useful for initializing anything specific to the view

	[super initializeState];

	NSLog(@"[VIEW LIFECYCLE EVENT] initializeState");
}

-(void)configurationSet
{
	// This method is called right after all view properties have
	// been initialized from the view proxy. If the view is dependent
	// upon any properties being initialized then this is the method
	// to implement the dependent functionality.

	[super configurationSet];

	NSLog(@"[VIEW LIFECYCLE EVENT] configurationSet");
}

-(UIView*)arview:(NSString*)key
{
	if (arview == nil && [WTArchitectView isDeviceSupportedForARMode:WTARMode_Geo]) {

		NSLog(@"[VIEW LIFECYCLE EVENT] arview");

        CGRect screenSize = [[UIScreen mainScreen] bounds];

        arview = [[WTArchitectView alloc] initWithFrame:screenSize];
        [arview initializeWithKey:key motionManager:nil];
		[self addSubview:arview];

        arview.delegate = self;

        [arview start];
	}

	return arview;
}

-(void)frameSizeChanged:(CGRect)frame bounds:(CGRect)bounds
{
	// You must implement this method for your view to be sized correctly.
	// This method is called each time the frame / bounds / center changes
	// within Titanium.

	NSLog(@"[VIEW LIFECYCLE EVENT] frameSizeChanged");

	if (arview != nil) {

		// You must call the special method 'setView:positionRect' against
		// the TiUtils helper class. This method will correctly layout your
		// child view within the correct layout boundaries of the new bounds
		// of your view.

		[TiUtils setView:arview positionRect:bounds];
	}
}

- (void)didMoveToSuperview
{
    NSLog(@"[VIEW LIFECYCLE EVENT] didMoveToSuperview");
}

- (void)didMoveToWindow
{
    NSLog(@"[VIEW LIFECYCLE EVENT] didMoveToWindow");
}

#pragma mark Public APIs

- (void)setLicenseKey_:(id)key
{
    NSLog(@"[VIEW LIFECYCLE EVENT] setKey_");

    [self arview:[TiUtils stringValue:key]];
}

- (void)setArchitectWorldUri_:(id)url
{
    NSLog(@"[VIEW LIFECYCLE EVENT] setUrl_");

    if (arview != nil)

        [arview loadArchitectWorldFromUrl:[NSURL URLWithString:[TiUtils stringValue:url]]];
}

- (void)setJs_:(id)code
{
    NSLog(@"[VIEW LIFECYCLE EVENT] setJs_");

    if (arview != nil)
        [arview callJavaScript:[TiUtils stringValue:code]];
}

- (void)setLocation_:(id)location
{
    // TODO: implement this method if needed
}

- (void)setCullingDistance_:(id)value
{
    NSLog(@"[VIEW LIFECYCLE EVENT] setCullingDistance_");

    if (arview != nil)
        [arview setCullingDistance:[TiUtils floatValue:value]];
}

#pragma mark - WTArchitectView delegate methods

- (void)urlWasInvoked:(NSString*)url
{
    NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
    [data setValue:url forKey:@"url"];

    if ([self.proxy _hasListeners:@"URL_WAS_INVOKED"])
        [self.proxy fireEvent:@"URL_WAS_INVOKED" withObject:data];
}

@end
