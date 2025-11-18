@echo off
echo Checking for Visual Studio Build Tools...
where cl.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo MSVC found!
    echo Running Tauri dev...
    call npm run tauri dev
) else (
    echo.
    echo ERROR: Visual Studio C++ Build Tools not found!
    echo.
    echo Please install Visual Studio Build Tools from:
    echo https://visualstudio.microsoft.com/visual-cpp-build-tools/
    echo.
    echo Make sure to select "Desktop development with C++" workload
    echo.
    pause
)
