# Setup Instructions

You should have a laptop for writing robot code. Windows is recommended if you want to drive the robot. Instructions below are for Windows.

## Install Python

All robot code is written in Python. See [this page](../learn-python) for some Python tutorials.

- Go to [python.org/downloads](https://www.python.org/downloads/)
- Download the latest version of **Python 3** (NOT Python 2). The current version (as of October 2017) is 3.6.3.
- On Windows, **check the box in the installer to "Add Python 3.6 to PATH.**" Restart your computer before you continue.
- Open Command Prompt (search "cmd"). Type `python` and press Enter. If that doesn't work, try `py` instead. Verify that the version number listed is Python 3.x.x and NOT Python 2.x.x. Then type `exit()` and press Enter to exit Python.

## Install pyfrc and robotpy-ctre

These are Python packages which give you the necessary libraries to write robot code. `pyfrc` is the Python version of wpilib, which is a library for controlling FRC robots. `robotpy-ctre` is required to use Talons, which control motors.

- In Command Prompt, type: `python -m pip install pyfrc robotpy-ctre`

## Install PyCharm

PyCharm is our recommended program for writing Python code. Download it here: [jetbrains.com/pycharm/download](https://www.jetbrains.com/pycharm/download/). Choose the Community Edition. For the installer, choose the default options for everything.

## Install Driver Station

Driver Station is used to control the robot from your computer using a joystick or gamepad.

Driver Station only works on Windows. This installation will take some time.

- Download Driver Station at [ni.com/download/first-robotics-software-2015/5112/en/](http://www.ni.com/download/first-robotics-software-2015/5112/en/). You will need to create an account. Choose the "NI Recommended" installer.
- The installer will ask you where you want to save the zip file. Put it wherever you want. The download will take a while.
- Unzip the file you downloaded. Ask me for the password.
- Run setup.exe in the unzipped folder. This will also take a while.
    - **Uncheck Search for important messages...**
    - The program will ask for a serial number. Ask me and I will send it to you.
    - When the program has installed, **uncheck Run License Manager**
- Once Driver Station is installed, open it. When you first start it, you might receive a Windows Firewall warning. Make sure you check the box that allows communication on private networks. If you forget to do this, communications with the robot might not work, and you will have to fix it in Windows Firewall settings.
- In Driver Station, click the gear button on the left side of the bottom window. **Set the Team Number to 2605**, and change the dashboard type to LabVIEW. Without a team number you won't be able to connect to the robot.

## Install Git

Git is software for "version control," which allows us all to collaborate on the code and manage multiple versions and branches of it. You will need to learn how to use Git&mdash;see [this page](../learn-git) for a tutorial.

- Download and install Git here: [git-scm.com/downloads](https://git-scm.com/downloads). **Choose the default options for everything, except** on Windows choose to "**Use Git from Git Bash only.**"
- Open Git Bash (which should have been installed), and type:
    - `git config --global user.email "your email goes here"`
    - `git config --global user.name "Your Name"`

## Create a GitHub account

All of our robot code will be on GitHub, so anybody can view it, download it, and edit it.

- If you don't already have a GitHub account, create one here: [github.com/join](https://github.com/join)
- Send me your username on Slack, and I will add you to the [Seamonsters team](https://github.com/seamonsters-2605/)
