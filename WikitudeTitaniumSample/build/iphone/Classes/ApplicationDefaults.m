/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"l6PZnA3pQcg7GmJo5xVCS7lTlG3ZSkuQ"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"01wLNTd2UFXzirtp7ovoiaPrS2V1nY5T"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"NQLaesa67aRCe9XJi35Fz5w4FYINTU37"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"5S4aeTuKloTKa9YuPqvLItwpnmZshsoo"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"3FfyYQbAvRovrwM4abKNuOAeqBCZDWD8"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"srVFM0r6iSKx6n6qKbYZXOcjPMo6fJAI"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

+ (NSDictionary*) launchUrl {
    static BOOL launched = NO;
    if (!launched) {
        launched = YES;
        return nil;
    } else { return nil;}
}
 
@end