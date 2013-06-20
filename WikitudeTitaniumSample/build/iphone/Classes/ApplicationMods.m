#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"wikitudeios",@"name",@"com.wikitude.ti",@"moduleid",@"0.1.1",@"version",@"e90fcd9a-d817-4c71-b3b8-9bd677ad4d2c",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end