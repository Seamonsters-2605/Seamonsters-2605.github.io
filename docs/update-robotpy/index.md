# How to update RobotPy

## On your computer

Run this command: `python -m pip install --upgrade pyfrc robotpy-rev robotpy-navx robotpy-rev-color remi`

## On the robot

While connected to the internet, run the following commands:

```
py -3 -m pip install robotpy-installer
py -3 -m robotpy_installer download-robotpy
py -3 -m robotpy_installer download-opkg robotpy-navx robotpy-rev robotpy-rev-color
py -3 -m robotpy_installer download remi
```

Connect to the robot WiFi and run the following commands:

```
py -3 -m robotpy_installer install-robotpy
py -3 -m robotpy_installer install-opkg robotpy-navx robotpy-rev robotpy-rev-color
py -3 -m robotpy_installer install remi
```
