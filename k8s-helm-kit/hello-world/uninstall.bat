echo off

set RELEASE_NAME=pre-alpha

set uninstallCommand=helm uninstall %RELEASE_NAME%
set delCommand=helm delete %RELEASE_NAME%

echo %uninstallCommand%
%uninstallCommand%

echo %delCommand%
%delCommand%