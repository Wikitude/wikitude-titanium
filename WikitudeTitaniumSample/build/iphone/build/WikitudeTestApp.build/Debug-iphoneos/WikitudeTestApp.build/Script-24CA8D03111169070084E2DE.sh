#!/bin/sh
echo 'Xcode Post-Compile Phase: Touching important files'
touch -c Classes/ApplicationRouting.h Classes/ApplicationRouting.m Classes/ApplicationDefaults.m Classes/ApplicationMods.m Classes/defines.h
