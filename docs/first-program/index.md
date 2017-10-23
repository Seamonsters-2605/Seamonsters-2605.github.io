# Writing your first program for the robot

Make sure you have followed all of the [Setup Instructions](../setup) to install Python 3, pyfrc, PyCharm, and Driver Station.

Open PyCharm and create a new project. Give it a name with no spaces, and make sure the selected Python version is Python36, not some other number.

If the left panel with a list of files isn't shown, press <kbd>Alt</kbd>-<kbd>1</kbd>. Right click your project in the left panel, choose New > File, and name it "robot.py". It's important that you use that name, with no capital letters.

We will be writing code for last year's robot ("Leviathan"). This example is an overview of some basic robot code for "Tank Drive," which involves using a separate joystick for the left and right sides of the robot. Type in your own version of the following code. *Please don't copy and paste!*

```python
import wpilib
import ctre

class TestRobot (wpilib.IterativeRobot):

    def robotInit(self):
        self.leftFront = ctre.CANTalon(2)
        self.rightFront = ctre.CANTalon(1)
        self.leftBack = ctre.CANTalon(0)
        self.rightBack = ctre.CANTalon(3)

        self.leftJoystick = wpilib.Joystick(0)
        self.rightJoystick = wpilib.Joystick(1)

    def teleopPeriodic(self):
        leftSpeed = self.leftJoystick.getY()
        rightSpeed = self.rightJoystick.getY()

        self.leftFront.set(leftSpeed)
        self.leftBack.set(leftSpeed)
        self.rightFront.set(rightSpeed)
        self.rightBack.set(rightSpeed)

if __name__ == "__main__":
    wpilib.run(TestRobot)
```

## Explanation

```python
import wpilib
import ctre
```
This includes Python libraries for you to use in your program. "wpilib" is the library for programming FRC robots, and "ctre" allows you to drive the motors with the "Talon" motor controllers.

```python
class TestRobot (wpilib.IterativeRobot):
```

This line creates your robot *class*, which contains all the code for your robot. In parentheses is `wpilib.IterativeRobot`, which is the base that all robot code is built off of.

```python
def robotInit(self):
```

This line defines a *function* inside the robot class (it is indented to show that it's inside the class). Certain functions are special&mdash;in this case, any code in `robotInit` will be called when the program first starts.

```python
self.leftFront = ctre.CANTalon(2)
self.rightFront = ctre.CANTalon(1)
self.leftBack = ctre.CANTalon(0)
self.rightBack = ctre.CANTalon(3)
```

This creates `CANTalon` objects. Talons are controllers connected to each motor&mdash;creating these objects lets us send commands to them (over the "CAN" network), to drive the motors. The numbers in parentheses are numbers that have been assigned to the Talons to identify them.

The `CANTalon` objects are then stored in variables&mdash;prefixing the variable name with `self.` means we can access those variables in other functions, so we can use the CANTalons later.

Notice the `ctre.`&mdash;this is because `CANTalon` is part of the `ctre` library which we imported earlier.

```python
self.leftJoystick = wpilib.Joystick(0)
self.rightJoystick = wpilib.Joystick(1)
```

Here two joysticks are defined, and again stored in `self.` variables so we can access them later. The `wpilib.` means that `Joystick` is part of the `wpilib` library which we imported earlier.

```python
def teleopPeriodic(self):
```

This is another special function. Any code in `teleopPeriodic` will be called *50 times per second* while the robot is enabled. So 50 times a second, we can check the joystick input and update the motor output.

```python
leftSpeed = self.leftJoystick.getY()
rightSpeed = self.rightJoystick.getY()
```

Here we read the **Y** position (the up/down movement) of each joystick. We use the left/right joystick objects we created earlier in `robotInit` and call the `getY()` function (because it's a function, it needs a set of parentheses) which gives the y position. Then that value is stored in a variable (`leftSpeed` and `rightSpeed`).

Y positions are between -1 (fully down) and 1 (fully up).

```python
self.leftFront.set(leftSpeed)
self.leftBack.set(leftSpeed)
self.rightFront.set(rightSpeed)
self.rightBack.set(rightSpeed)
```

Now we use the CANTalon objects we created earlier in `robotInit`, to drive each of the motors. The `set()` function lets you control the speed of each motor. It takes as input a number between -1 (full speed reverse) and 1 (full speed forward), which conveniently is the same range of values that the joystick `getY()` function gave us.

Again, all this code is run 50 times per second. So, 50 times per second, the positions of the left and right joysticks are read, and the speeds of all 4 motors are updated accordingly.

Finally there are these 2 lines:

```python
if __name__ == "__main__":
    wpilib.run(TestRobot)
```

These lines are required at the bottom of a `robot.py` file and they allow you to deploy code to the robot, which we will do next. The first line checks if you are running the file directly, and the second line calls a function in the `wpilib` library to deploy the code.

## Deploy the robot code
To get your code onto the robot you must "deploy" it over WiFi. First check that the robot is on and nobody else is using it (only one person can be connected at a time). When the robot is ready there will be a WiFi network called "2605" (it can take a while to appear). Connect to this and open up Driver Station.

![(screenshot of driver station)](driver-station.png)

Look for this panel in driver station. Check for these things:

- The Team # should be 2605. If it isn't, click the Gear tab on the left and change the team number.
- The Communications light should be green, to show that you are connected to the robot over WiFi. It could take a while. If it doesn't connect, there's a problem&mdash;see the section below.
- There was probably already robot code on the robot, so the Robot Code light will be green. Your own code isn't on the robot yet.
- The Joysticks light will turn green once you plug in the two joysticks.

Right click `robot.py` in the left panel and click "Show in explorer." This will open the folder that has your robot.py file. Hold shift and right click in an empty space in the window, and choose "Open command window here."

Then type: `python robot.py deploy --builtin --nc`. If that doesn't work replace `python` with `py`. The first time you deploy it will ask for the robot hostname. Type: `roborio-2605-frc.local`. If it asks you to "store key in cache," choose Yes.

Once the code has finished deploying, the Robot Code light in Driver Station will turn red as the code starts, then green again. You are now ready to enable the robot. Let everybody in the room know you are about to enable, just in case something goes wrong. Be ready to press Space at any time for an emergency stop.

With the robot enabled, you can use the joysticks to drive the robot. One controls the left motors and one controls the right. Push both forward to drive forward, both backward to drive backward, and move them in opposite directions to turn. This type of control is called Tank Drive.

## If Driver Station can't connect...

If the "Communications" light on Driver Station doesn't turn green when you connect to the robot WiFi:

- Make sure the team number is set to 2605. Click the Gear tab on the left side of the window and check.
- Try disconnecting and reconnecting. You usually have to do this the first time you connect after turning on the robot.
- Click the Gear tab on the left side of the window, and try changing the team number to "10.26.5.22". If this works for you, you'll probably have to do that every time you start Driver Station. This is a problem that seems to affect certain laptops in combination with the new WiFi routers.

## Robot code structure

The above code has the basic outline of robot code. The python file should always be named "robot.py" and it should have:

- `import wpilib`
- `import ctre`
- A robot class that extends from `wpilib.IterativeRobot`.

    Write: `class NameOfYourRobot (wpilib.IterativeRobot):`
- Some of the special robot methods defined in that class, like:
    - `def robotInit(self)`: Called once when the robot code starts.
    - `def autonomousInit(self)`: Called when autonomous mode starts. During each match of the competition, there are 2 stages of play: "Autonomous," where the drive team is not in control of the robot and the robot performs pre-programmed actions; and "Teleop," where the drive team can control the robot.
    - `def autonomousPeriodic(self)`: Called 50 times per second while in autonomous mode.
    - `def teleopInit(self)`: Called when teleop mode (remote control) starts.
    - `def teleopPeriodic(self)`: Called 50 times per second while in teleop mode.
    - `def disabledInit(self)`: Called when robot is disabled.
    - `def disabledPeriodic(self)`: Called 50 times per second while the robot is disabled.
- Declarations for all of your objects: things like Joysticks, Gamepads, CANTalons to control motors, etc. These should go in `robotInit` so they are created when the code starts.
- ```
    if __name__ == "__main__":
        wpilib.run(NameOfYourRobot)
```

## WPILib reference

This code used a few wpilib classes and functions, like IterativeRobot, Joystick and CANTalon. A full reference for all these classes is at [robotpy.readthedocs.io/projects/wpilib/en/latest/api.html](http://robotpy.readthedocs.io/projects/wpilib/en/latest/api.html).

## Next Steps

- Notice that when you push both joysticks forward, the wheels move in opposite directions. How would you fix this?
- Tank Drive is easy to program but hard to drive. Try rewriting your code so it only needs a single joystick&mdash;move it up and down to drive forwards and backwards, and left and right to turn.
- You can read buttons on the joystick with the code `self.leftJoystick.getRawButton(1)` (button 1 is the trigger, you can change this number for any other button on the joystick). Have a button on the joystick activate a *slow mode*, or shake the robot, or something else interesting.
- Other ideas?
