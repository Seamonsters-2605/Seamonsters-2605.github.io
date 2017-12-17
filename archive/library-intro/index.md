# Using the Seamonsters Library

This page is old. I've removed the parts that are no longer relevant or duplicated on other pages, but there are still some useful things here.

## Logging

There is often some sort of data that you need to constantly monitor while driving the robot. For example, you might need to be watching the speed of the flywheels before you shoot, or the position of a target in view of the camera. The easy way to do this is to print the value with every loop of `teleopPeriodic()`. But teleopPeriodic is called 50 times per second, which means your console will be filled up very quickly with logs. We would ideally also like to use the console for more important messages. Also, in a lot of cases the data is redundant&mdash;we don’t need to be constantly notified that the flywheels are spinning at 0%. The seamonsters library has utilities for logging which limit the number of times per second a value is logged, and block duplicate values from being logged.

The class [`seamonsters.logging.LogState`](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/logging.html) represents a value that you would like to update and display to the user. If you have `seamonsters.logging` imported, you can create it with `seamonsters.logging.LogState("name")`&mdash;the name will be displayed to the user along with the value.

Then, whenever the value you are monitoring changes, you call `yourLogState.update(value)`. The value can be anything&mdash;a number, a string, a boolean, or anything else.

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

    You can set the drive mode of a drivetrain with `driveTrain.setDriveMode(mode)`. The drive modes are defined in [`seamonsters.drive.DriveInterface.DriveMode`](https://rawgit.com/Seamonsters-2605/SeamonstersTemplate/master/seamonsters/docs/_build/html/drive.html#seamonsters.drive.DriveInterface.DriveMode)&mdash;they are called VOLTAGE, SPEED, and POSITION.

The built in drive trains make it much simpler to write basic robots. Here is a simple mecanum drive robot:

```python
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
        self.driveTrain.setWheelOffset(math.radians(45.0))

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
