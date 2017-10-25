# Robot Simulator

Pyfrc has a built in robot simulator&mdash;it lets you drive a virtual robot with real joysticks. This is useful if you want to test your code, and don't have access to a robot.

## Installation instructions
- Open Command Prompt, type `python -m pip install pygame`.
- Download [this](simulator.zip) file I created and unzip it. Put both the `physics.py` file and the `sim` folder in the same folder as your `robot.py`.
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

- Open the folder with `robot.py` and the 2 other things you added. Hold shift and right click, and choose Open Command Prompt here. Then type `python robot.py sim`.
