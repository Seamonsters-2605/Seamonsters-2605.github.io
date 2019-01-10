# How to update RobotPy

## On your computer

Run this command: `python -m pip install --upgrade pyfrc robotpy-ctre robotpy-navx`

## On the robot

- Download the latest release ZIP file from the [robotpy-wpilib](https://github.com/robotpy/robotpy-wpilib/releases) page.
- Extract and open a command prompt in the extracted folder
- While connected to the internet, run the following commands:

```
python installer.py download-robotpy
python installer.py download-opkg python37-robotpy-ctre python37-robotpy-cscore
python installer.py download-pip robotpy-navx
```

(NOTE: update the package names / python version numbers when necessary. Package lists are [here](https://www.tortall.net/~robotpy/feeds/))

- Connect to the robot WiFi and run the following commands:

```
python installer.py install-robotpy
python installer.py install-opkg python37-robotpy-ctre python37-robotpy-cscore
python installer.py install-pip robotpy-navx
```
