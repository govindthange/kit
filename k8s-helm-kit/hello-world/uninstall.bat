echo off
set uninstallCommand=helm uninstall pre-alpha
echo %uninstallCommand%
%uninstallCommand%

set delCommand=helm delete pre-alpha
echo %delCommand%
%delCommand%