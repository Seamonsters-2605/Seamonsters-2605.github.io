# Setup Instructions

You should have a laptop for writing robot code. You can use any OS to write and deploy code, but Windows is required if you want to drive the robot from your computer. Instructions below are for Windows.

## Install Python

All robot code is written in Python. See [this page](../learn-python) for some Python tutorials.

- Go to [python.org/downloads](https://www.python.org/downloads/)
- Download the latest version of **Python 3** (NOT Python 2). The current version (as of July 2018) is 3.7.0.
- Run the installer. On Windows, **check the box to "Add Python 3.7 to PATH.**" Restart your computer before you continue.
- Open Command Prompt (search "cmd"). Type `python` and press Enter. If that doesn't work, try `py` instead.

> This is Python's interactive mode. You can type Python code in and press Enter to run it immediately.

- Verify that the version number listed is Python 3.x.x and NOT Python 2.x.x. Then type `exit()` and press Enter to exit Python.

## Install pyfrc and robotpy-ctre

These are Python packages which give you the necessary libraries to write robot code. `pyfrc` is the Python version of `wpilib`, which is a library for controlling FRC robots. `robotpy-ctre` is the library for controlling Talons, which are motor controllers.

- In Command Prompt, type: `python -m pip install pyfrc robotpy-ctre`

> `pip` is a tool for installing and upgrading packages for Python, to add extra functionality.

## Install Visual Studio Code

Visual Studio Code is our recommended program for writing Python code. (It is different than plain Visual Studio).

- Download it here: [code.visualstudio.com](https://code.visualstudio.com/) and run the installer.
- Start Visual Studio Code. On the right side under the *Customize* header there should be a link to install Python support. Click the link to install it in the background&mdash;the window will refresh when it is finished.


## Install Driver Station

*The installation process for Driver Station is SLOW! While you are working on this you can continue on some of the other sections below.*

Driver Station is used to control the robot from your computer using a joystick or gamepad.

Driver Station only works on Windows. This installation will take some time.

- Download Driver Station [here](http://www.ni.com/download/first-robotics-software-2017/7183/en/). You will need to create an account.
- Unzip the file you downloaded.
- Run setup.exe in the unzipped folder. It will take a *long* time to install.
    - **Uncheck Search for important messages...**
    - The program will ask for a serial number. Ask me and I will give it to you.
    - When the program has installed, **uncheck Run License Manager**
- Once Driver Station is installed, open it. When you first start it, you might receive a Windows Firewall warning. Make sure to check the box that allows communication on private networks.
- In Driver Station, click the gear button on the left side of the bottom window. **Set the Team Number to 2605**, and change the dashboard type to LabVIEW. Without a team number you won't be able to connect to the robot.

## Install Git

Git is software for "version control," which allows us all to collaborate on the code and manage multiple versions and branches of it.

- Download and install Git here: [git-scm.com/downloads](https://git-scm.com/downloads). **Choose the default options for everything, except** on Windows choose to "**Use Git from Git Bash only.**"
- Open Git Bash (which should have been installed), and type:
    - `git config --global user.email "your email goes here"`
    - `git config --global user.name "Your Name"`

You will need to learn how to use Git&mdash;see [this page](../git) for a tutorial.

## Create a GitHub account

All of our robot code will be on GitHub, so anybody can view it, download it, and edit it.

- If you don't already have a GitHub account, create one here: [github.com/join](https://github.com/join)
- Send me your username on Slack, and I will add you to the [Seamonsters team](https://github.com/seamonsters-2605/)
