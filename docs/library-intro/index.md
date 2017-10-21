# Using the Seamonsters Library

The Seamonsters Python library is a collection of useful code for programming robots, based on what we wrote last year. This includes utilities for getting input from joysticks and gamepads, driving with different types of drivetrains, and simulating the robot on your computer without an actual robot, as well as tools to help organize robot code.

Currently the library is kept in the SeamonstersTemplate repository. The code is [here](https://github.com/Seamonsters-2605/SeamonstersTemplate), and the documentation is [here](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/index.html).

In order to use it, you will fork the SeamonstersTemplate repository. This lets you have your own copy of the repository on your own account, where you can make whatever changes you want, and still be able to get updates to the library. Go to the [library on GitHub](https://github.com/Seamonsters-2605/SeamonstersTemplate) and click "Fork" in the top-right corner.

Now you can clone your own fork of the repository to your computer. Open Git Bash (or a Terminal on Mac/Linux) and type:

```
cd Documents
git clone https://github.com/YourGitHubUserName/SeamonstersTemplate.git
```

You will now have a folder in your Documents folder called "SeamonstersTemplate." This has the Seamonsters code library in the "seamonsters" folder. To use this library, you just need to have your robot file in the SeamonstersTemplate folder.

The following parts describe how to use various features of the library. You can read them in any order.

## Deploying

To deploy you can still use `py robot.py deploy --builtin --nc` as usual, but the seamonsters library comes with custom deploy script that is easier to remember and type, and allows you to deploy robots that aren't named "robot.py". So instead, put your robot file in the SeamonstersTemplate folder, open a command prompt and navigate to the folder (`cd`) and type: `deploy.bat nameOfYourRobot.py`.

## Gamepads

One useful thing that the Seamonsters library adds is support for gamepads. We normally use two Logitech gamepads for driving the robot in competitions. Wpilib treats gamepads as a single "joystick" with a single x and y axis, but they actually have 2 joysticks on them, which makes them more confusing to work with. To make things easier, the Seamonsters library has a [Gamepad](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/gamepad.html) class which adds extra features to the `wpilib.Joystick` class, such as distinguishing between the left and right joystick.

Try this code. It’s a variation on the first tank drive code you wrote earlier. Instead of using 2 joysticks, it uses both joysticks on one gamepad.

```python
import wpilib
import ctre
import seamonsters.gamepad

class TestRobot (wpilib.IterativeRobot):

    def robotInit(self):
        self.leftFront = ctre.CANTalon(2)
        self.rightFront = ctre.CANTalon(1)
        self.leftBack = ctre.CANTalon(0)
        self.rightBack = ctre.CANTalon(3)

        # Instead of 2 joysticks, you just need one Gamepad, which has 2
        # joysticks on it.
        self.gamepad = seamonsters.gamepad.Gamepad(0)

    def teleopPeriodic(self):
        # Get the y position for the left and right joysticks on the
        # Gamepad
        leftSpeed = -self.gamepad.getLY()
        rightSpeed = self.gamepad.getRY()

        self.leftFront.set(leftSpeed)
        self.leftBack.set(leftSpeed)
        self.rightFront.set(rightSpeed)
        self.rightBack.set(rightSpeed)

if __name__ == "__main__":
    wpilib.run(TestRobot)
```

Full documentation for the Gamepad class is [here](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/gamepad.html).

## Logging

There is often some sort of data that you need to constantly monitor while driving the robot. For example, you might need to be watching the speed of the flywheels before you shoot, or the position of a target in view of the camera. The easy way to do this is to print the value with every loop of `teleopPeriodic()`. But teleopPeriodic is called 50 times per second, which means your console will be filled up very quickly with logs. We would ideally also like to use the console for more important messages. Also, in a lot of cases the data is redundant&mdash;we don’t need to be constantly notified that the flywheels are spinning at 0%. The seamonsters library has utilities for logging which limit the number of times per second a value is logged, and block duplicate values from being logged.

The class [`seamonsters.logging.LogState`](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/logging.html) represents a value that you would like to update and display to the user. If you have `seamonsters.logging` imported, you can create it with `seamonsters.logging.LogState("name")`&mdash;the name will be displayed to the user along with the value.

Then, whenever the value you are monitoring changes, you call `yourLogState.update(value)`. The value can be anything&mdash;a number, a string, a boolean, or anything else.

## Modular Robots

"Modular" robots allow you to split up your robot into separate robot classes which you can test individually. For example, maybe your robot can drive around, shoot balls, and use an arm to lift things. You might have make one robot file for driving, one for shooting, and one for the arm. Each of these files is an IterativeRobot, so you can deploy them to the robot and test each capability individually. This makes it easier to collaborate, and also to work on a subsystem when you don't have full access to the robot. For example, maybe you’ve already bagged/tagged the robot, but you still need to test the arm&mdash;you can just deploy and test that file without the rest of the code.

When you eventually want to make a single robot program that can do all of those things, the Seamonsters library allows you to combine the different "modules" together to build a final robot that combines the capabilities of each module. You can enable or disable these modules individually.

Adding this capability to your robot is simple. You can make a Python script for each component of your robot, and have a simple `IterativeRobot` class in each to perform a small subset of your robot’s full capabilities. For example, you might have these files:

- `drive.py` with the `RobotDrivetrain` class
- `arm.py` with the `ArmControl` class
- `shooter.py` with the `ShooterControl` class

When you want to combine those files together into a single robot that can do all those things, you would write a `robot.py` file like this:

```python
from seamonsters.modularRobot import Module
from drive import RobotDrivetrain
from arm import ArmControl
from shooter import ShooterControl

class MyRobot(Module):

    def __init__(self):
        super().__init__()
        self.addModule(RobotDrivetrain())
        self.addModule(ArmControl())
        self.addModule(ShooterControl())

if __name__ == "__main__":
    wpilib.run(MyRobot)
```

## Drive Interfaces

There are a few common "drivetrains" used on robots&mdash;these are arrangements of motors and wheels for moving the robot.

- **Tank drive:** The simplest possible drivetrain. Two sets of motors on either side on the robot, which can move in the same direction to go forward and backward or in opposite directions to turn. This type of drivetrain does NOT support strafing (moving sideways).
- **Swerve drive:** Each wheel in a swerve drive can rotate independently to point in any direction, allowing for driving, strafing, and turning, like a motorized shopping cart wheel.
- **Mecanum drive:** Mecanum drives are assembled similar to tank drives, but each mecanum wheel has rollers at 45 degree angles, causing them to put out force diagonally across the ground instead of forwards and backwards when they move. By spinning them in opposite directions on the same side, the robot can move sideways.
- **Omni-wheel drive:** The drivetrain we used on the 2016 competition robot. Driving works similarly to mecanum drives, but instead of having wheels facing forward with rollers at 45 degree angles, the wheels face diagonally and the rollers are perpendicular to the wheels. If the wheels are big enough this allows the robot to go over obstacles and rough terrain.

You can see a demonstration of each type of drivetrain [here](http://seamonsters-2605.github.io/sketches/mecanum/).

The Seamonsters library has built in support for each of these drivetrains, with these classes:

- [`seamonsters.holonomicDrive.HolonomicDrive`](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/holonomicDrive.html) For tank drives, mecanum drives, and omni-wheel drives.
- [`seamonsters.swerveDrive.SwerveDrive`](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/swerveDrive.html) For swerve drives.

These classes allow you to control how the robot moves, without needing to control the individual motors. All of the drivetrains use the same basic interface for driving them, so if you decide to change the drivetrain of your robot, you don’t have to rewrite all of your code:

- To drive, you call `driveTrain.drive(magnitude, direction, turn)` with every loop of teleopPeriodic. "magnitude" is the speed of the robot from 0 to 1; "direction" is the direction, in radians to drive towards; "turn" is the turning speed from -1 (left) to 1 (right). Even if you are not driving, you should still call this every loop with a magnitude of 0.
- Each drivetrain has 3 drive modes: Voltage, Speed, and Position (or "Jeff mode").
    - Voltage mode controls the voltages the motors receive&mdash;it can only guarantee the percentage of full power the motor receives, not exactly how fast it spins.
    - Speed mode uses encoders on the motors to constantly track the speed of the motor, and adjust the voltage until it is at the right speed.
    - Position mode moves the motors to incremental positions fast enough that they move smoothly&mdash;it is as accurate as speed mode and often smoother.
- You can set the drive mode of a drivetrain with `driveTrain.setDriveMode(mode)`. The drive modes are defined in [`seamonsters.drive.DriveInterface.DriveMode`](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/drive.html#seamonsters.drive.DriveInterface.DriveMode)&mdash;they are called VOLTAGE, SPEED, and POSITION.

The built in drive trains make it much simpler to write basic robots. Here is a simple mecanum drive robot:

```
import wpilib
import ctre
import math
from seamonsters.gamepad import Gamepad
from seamonsters.drive import DriveInterface
from seamonsters.holonomicDrive import HolonomicDrive

class DriveTest (wpilib.IterativeRobot):

    def robotInit(self):
        self.gamepad = Gamepad(0)

        fl = ctre.CANTalon(2)
        fr = ctre.CANTalon(1)
        bl = ctre.CANTalon(0)
        br = ctre.CANTalon(3)
        self.driveTrain = HolonomicDrive(fl, fr, bl, br, 4156)
        self.driveTrain.setDriveMode(DriveInterface.DriveMode.POSITION)
        self.driveTrain.invertDrive(True)
        self.driveTrain.setWheelOffset(math.radians(22.5)) # roller angle / 2

    def teleopPeriodic(self):
        turn = -self.gamepad.getRX() * abs(self.gamepad.getRX()) \
            * (scale / 2)
        magnitude = self.gamepad.getLMagnitude()**2 * 0.5
        direction = self.gamepad.getLDirection()

        self.driveTrain.drive(magnitude, direction, turn)
```

For more specific information, look at the documentation for the individual drivetrain classes:

- [HolonomicDrive](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/holonomicDrive.html)
- [SwerveDrive](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/swerveDrive.html)

## Robot Drivetrain Simulation

You can simulate the physics of the drivetrain on your robot, without having access to an actual robot. First [install tkinter](http://tkinter.unpythonic.net/wiki/How_to_install_Tkinter). Then run `py -m pip install pygame`.

Put a robot file in the SeamonstersTemplate folder. Open a command prompt window, navigate to the SeamonstersTemplate folder, and type `py yourRobotFile.py sim`. When the window opens, under Robot choose "Teleoperated." If everything worked, you should be able to use a gamepad to drive around your simulated robot.
