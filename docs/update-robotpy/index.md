# How to update RobotPy

## On your computer

Run this command: `python -m pip install --upgrade pyfrc robotpy-rev robotpy-navx robotpy-rev-color remi`

## On the robot

- Download the latest release ZIP file from the [robotpy-wpilib](https://github.com/robotpy/robotpy-wpilib/releases) page.
- Extract and open a command prompt in the extracted folder
- While connected to the internet, run the following commands:

```
py -3 -m pip install robotpy-installer
py -3 -m robotpy_installer download-robotpy
py -3 -m robotpy_installer download-opkg robotpy-navx robotpy-rev robotpy-rev-color
py -3 -m robotpy_installer download remi
```

(NOTE: update the package names / python version numbers when necessary. Package lists are [here](https://www.tortall.net/~robotpy/feeds/))

- Connect to the robot WiFi and run the following commands:

```
py -3 -m robotpy_installer install-robotpy
py -3 -m robotpy_installer install-opkg robotpy-navx robotpy-rev robotpy-rev-color
py -3 -m robotpy_installer install remi
```
