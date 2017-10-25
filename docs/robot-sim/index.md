# Robot Simulator

Pyfrc has a built in robot simulator&mdash;it lets you drive a virtual robot with real joysticks. This is useful if you want to test your code, and don't have access to a robot.

## Installation instructions
- Open Command Prompt, type `python -m pip install pygame`.
- Download [this](simulator.zip) file I created and unzip it.
- In PyCharm, Right click `robot.py` in the left panel and click "Show in explorer." This will open the project folder which has your robot.py file. Put both the `physics.py` file and the `sim` folder from the zipped file, in the same folder as your `robot.py`.
- At the bottom of your `robot.py`, you should already have these 2 lines:

    ```
if __name__ == '__main__':
    wpilib.run(MyRobot)
    ```
    
    Change it to:
    
    ```
if __name__ == '__main__':
    wpilib.run(MyRobot, physics_enabled=True)
    ```

- Before starting the simulator, plug in 2 joysticks.
- In the folder with robot.py and the 2 new files, hold shift and right click in an empty space in the window, and choose "Open command window here." Then type `python robot.py sim`.
- You have a robot simulator! The joystick movement should show feedback in the window. Click the "Teleoperated" option to enable your robot and drive it around. If you don't have joysticks, click in the X/Y axis boxes below Stick 0 and Stick 1.