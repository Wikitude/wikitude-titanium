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

@interface ComWikitudeTiWikitudeView ()

@property (nonatomic, strong) WTArchitectView           *architectView;

@property (nonatomic, strong) KrollCallback             *screenshotSuccessCallback;
@property (nonatomic, strong) KrollCallback             *screenshotErrorCallback;

@end

@implementation ComWikitudeTiWikitudeView

-(void)dealloc
{
	NSLog(@"[VIEW LIFECYCLE EVENT] dealloc");

	// Release objects and memory allocated by the view
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
    if (_architectView != nil) {
        
        [_architectView release];
    }

    [super dealloc];
}


-(void)initializeState
{
	// This method is called right after allocating the view and
	// is useful for initializing anything specific to the view

	[super initializeState];

	NSLog(@"[VIEW LIFECYCLE EVENT] initializeState");
    
    if (_architectView == nil && [WTArchitectView isDeviceSupportedForARMode:WTARMode_Geo]) {
        
		NSLog(@"[VIEW LIFECYCLE EVENT] _architectView");
        
        CGRect screenSize = [[UIScreen mainScreen] bounds];
        
        _architectView = [[WTArchitectView alloc] initWithFrame:screenSize];
        
        _architectView.delegate = self;
	}
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceivedApplicationDidResignActiveNotification:) name:UIApplicationWillResignActiveNotification object:[UIApplication sharedApplication]];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceivedApplicationDidBecomeActiveNotification:) name:UIApplicationDidBecomeActiveNotification object:[UIApplication sharedApplication]];
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

-(void)startARWithLicenseKey:(NSString*)key
{
    NSLog(@"[VIEW LIFECYCLE EVENT] startAR");
    
    if ([self.architectView respondsToSelector:@selector(setSDKOrigin:)]) {
        [self.architectView performSelector:@selector(setSDKOrigin:) withObject:@"ORIGIN_TITANIUM"];
    }
    
    if (key) {
        [_architectView initializeWithKey:key motionManager:nil];
    }
    
    if (!_architectView.superview) {
        [self addSubview:_architectView];
    }

    [_architectView start];
}

- (void)stopAR
{
    NSLog(@"[VIEW LIFECYCLE EVENT] stopAR: %@", self);
    
    if ( _architectView ) {
        [_architectView stop];
    }
}

-(void)frameSizeChanged:(CGRect)frame bounds:(CGRect)bounds
{
	// You must implement this method for your view to be sized correctly.
	// This method is called each time the frame / bounds / center changes
	// within Titanium.

	NSLog(@"[VIEW LIFECYCLE EVENT] frameSizeChanged");

	if (_architectView != nil) {

		// You must call the special method 'setView:positionRect' against
		// the TiUtils helper class. This method will correctly layout your
		// child view within the correct layout boundaries of the new bounds
		// of your view.

		[TiUtils setView:_architectView positionRect:bounds];
	}
}

#pragma mark - View Lifecycle

-(void)willMoveToSuperview:(UIView *)newSuperview
{
	NSLog(@"[VIEW LIFECYCLE EVENT] willMoveToSuperview: %@ (self.superview: %@)", newSuperview, self.superview);
}

- (void)didMoveToSuperview
{
    NSLog(@"[VIEW LIFECYCLE EVENT] didMoveToSuperview: %@", self.superview);
    
    if (!self.superview) {
        [self stopAR];
    }
}

- (void)willMoveToWindow:(UIWindow *)newWindow
{
    NSLog(@"[VIEW LIFECYCLE EVENT] willMoveToWindow: %@ (self.window: %@)", newWindow, self.window);
}

- (void)didMoveToWindow
{
    NSLog(@"[VIEW LIFECYCLE EVENT] didMoveToWindow: %@", self.window);
}

- (void)didReceivedApplicationDidResignActiveNotification:(NSNotification *)aNotification
{
    [self stopAR];
}

- (void)didReceivedApplicationDidBecomeActiveNotification:(NSNotification *)aNotification
{
    [self startARWithLicenseKey:nil];
}

#pragma mark Public APIs

- (void)setLicenseKey_:(id)key
{
    NSLog(@"[VIEW LIFECYCLE EVENT] setKey_");

    [self startARWithLicenseKey:[TiUtils stringValue:key]];
}

- (void)setArchitectWorldUri_:(id)url
{
    NSLog(@"[VIEW LIFECYCLE EVENT] setUrl_");

    if (_architectView != nil && [url isKindOfClass:[NSString class]]) {

        NSURL *architectWorldURL;
        if ( [url hasPrefix:@"http://"] || [url hasPrefix:@"https://"] ) {
            // remote resource
            
            architectWorldURL = [NSURL URLWithString:url];
            
        } else {
            // local resource
            
            NSString *localFilePath = [url stringByDeletingLastPathComponent];
            NSString *fileName = [url lastPathComponent];
            NSString *fileExtension = [url pathExtension];
            
            fileName = [fileName stringByDeletingPathExtension];
            
            
            if ( fileName && fileExtension ) {

                architectWorldURL = [[NSBundle mainBundle] URLForResource:fileName withExtension:fileExtension subdirectory:localFilePath];
            }
        }
    
        [_architectView loadArchitectWorldFromUrl:architectWorldURL];
    }
}

- (void)setJs_:(id)code
{
    NSLog(@"[VIEW LIFECYCLE EVENT] setJs_");

    if (_architectView != nil)
        [_architectView callJavaScript:[TiUtils stringValue:code]];
}

- (void)setLocation_:(id)location
{
    // TODO: implement this method if needed
}

- (void)setCullingDistance_:(id)value
{
    NSLog(@"[VIEW LIFECYCLE EVENT] setCullingDistance_");

    if (_architectView != nil)
        [_architectView setCullingDistance:[TiUtils floatValue:value]];
}

- (void)captureScreen:(id)args
{    
    if ( _architectView != nil && [args isKindOfClass:[NSArray class]]) {
        
        NSArray *screenshotArgs = args;
        
        if ( 3 == screenshotArgs.count) {
        
            // check capture mode setting (cam - camAndWebView)
            WTScreenshotCaptureMode captureMode = WTScreenshotCaptureMode_Cam;
            if ([[screenshotArgs objectAtIndex:0] boolValue]) {
                captureMode = WTScreenshotCaptureMode_CamAndWebView;
            }
            
            // check bundle path => CaptureMode
            WTScreenshotSaveOptions options = WTScreenshotSaveOption_SavingWithoutOverwriting;
            WTScreenshotSaveMode saveMode;
            NSDictionary *context = nil;
            if ([[screenshotArgs objectAtIndex:1] isKindOfClass:[NSString class]]) {
                
                saveMode = WTScreenshotSaveMode_BundleDirectory;
                NSString *screenshotBundlePath = [screenshotArgs objectAtIndex:1];
                context = @{kWTScreenshotBundleDirectoryKey: [screenshotBundlePath copy]};
            } else {
                saveMode = WTScreenshotSaveMode_PhotoLibrary;
            }

            
            // extract sucess/error callback
            if ([[screenshotArgs objectAtIndex:2] isKindOfClass:[NSDictionary class]]) {
                
                NSDictionary *callbacks = [screenshotArgs objectAtIndex:2];
                KrollCallback *successCallback = [callbacks objectForKey:@"OnSuccess"];
                
                if (successCallback) {
                    self.screenshotSuccessCallback = successCallback;
                    options |= WTScreenshotSaveOption_CallDelegateOnSuccess;
                } else {
                    self.screenshotSuccessCallback = nil;
                }
                
                
                KrollCallback *errorCallback = [callbacks objectForKey:@"OnError"];
                if (errorCallback) {
                    self.screenshotErrorCallback = errorCallback;
                } else {
                    self.screenshotErrorCallback = nil;
                }
                
                NSLog(@"[WIKITUDE EVENT] capture screen");
                [_architectView captureScreenWithMode:captureMode usingSaveMode:saveMode saveOptions:options context:context];
            }
        }
    }
}

#pragma mark - WTArchitectView delegate methods

- (void)architectView:(WTArchitectView *)architectView invokedURL:(NSURL *)url
{
    NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
    [data setValue:[url absoluteString] forKey:@"url"];
    
    if ([self.proxy _hasListeners:@"URL_WAS_INVOKED"])
        [self.proxy fireEvent:@"URL_WAS_INVOKED" withObject:data];

}

- (void)architectView:(WTArchitectView *)architectView didCaptureScreenWithContext:(NSDictionary *)context
{
    NSLog(@"[WIKITUDE EVENT] did capture screen with context: %@", context);
    if (context && self.screenshotSuccessCallback) {
        
        NSArray *result = nil;
        if ( WTScreenshotSaveMode_BundleDirectory == [[context objectForKey:kWTScreenshotSaveModeKey] integerValue] ) {
            result = @[[context objectForKey:kWTScreenshotBundleDirectoryKey]];
        }
    
        [self.screenshotSuccessCallback call:result thisObject:nil];
    }
}

- (void)architectView:(WTArchitectView *)architectView didFailCaptureScreenWithError:(NSError *)error
{
    NSLog(@"[WIKITUDE EVENT] did fail to capture screen with error: %@", [error localizedDescription]);
    if (self.screenshotErrorCallback) {
        
        [self.screenshotErrorCallback call:@[[error localizedDescription]] thisObject:nil];
    }
}

@end
