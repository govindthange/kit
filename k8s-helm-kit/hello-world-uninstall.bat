echo off
set uninstallCommand=helm uninstall hello-world
echo %uninstallCommand%
%uninstallCommand%

set delCommand=helm delete hello-world
echo %delCommand%
%delCommand%