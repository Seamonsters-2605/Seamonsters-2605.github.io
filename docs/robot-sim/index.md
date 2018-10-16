# Robot Simulator

Pyfrc has a built in robot simulator&mdash;it lets you drive a virtual robot with real joysticks. This is useful if you want to test your code, and don't have access to a robot.

## Installation instructions
- Make sure you installed all of the libraries in the [Setup Instructions](../setup#install-python-libraries)
- Open Command Prompt and type these commands:
```
cd Documents
git clone https://github.com/seamonsters-2605/SeamonstersTemplate
```
> This will navigate to your Documents folder and download a repository hosted on GitHub called [SeamonstersTemplate](https://github.com/seamonsters-2605/SeamonstersTemplate). This is a template that we use for robot development, including some Python libraries we have developed over the years.
- Open SeamonstersTemplate in Visual Studio Code and create your `robot.py` file inside. Write some robot code.
- At the bottom of your `robot.py`, modify the last two lines:
```python
if __name__ == '__main__':
    wpilib.run(MyRobot, physics_enabled=True)
```
- Before starting the simulator, plug in 2 joysticks. It is also possible to control the robot without joysticks.
- Open the Terminal in VS Code, and type `python robot.py sim`.
- You have a robot simulator! The joystick movement should show feedback in the window. Click the "Teleoperated" option to enable your robot and drive it around. If you don't have joysticks, click in the X/Y axis boxes below Stick 0 and Stick 1.
