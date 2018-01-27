# Robot Programming Reference

You will need to import various libraries before you can use them.

```
import wpilib
import ctre
import seamonsters as sea
```

If you want to use the seamonsters library or the robot simulator, you will need to clone with Git or download [SeamonstersTemplate](https://github.com/seamonsters-2605/SeamonstersTemplate), and make your `robot.py` file in this folder. [Here](../robot-sim) is a tutorial on using the robot simulator.

- [Deploying Code](#deploying-code)
- [`wpilib.IterativeRobot`](#wpilibiterativerobot): All of your robot code goes here
- [`sea.GeneratorBot`](#seageneratorbot): An alternative to IterativeRobot, for more complex sequences
- [Making a Generator](#making-a-generator)
- [Combining Robot Modules](#combining-robot-modules)
- [`ctre.WPI_TalonSRX`](#ctrewpi_talonsrx) to drive motors
- [`wpilib.Joystick`](#wpilibjoystick) to get joystick input
- [`AHRS`](#ahrs): The NavX, to detect rotation and motion of the robot
- [Vision](#vision)

## Deploying Code

To deploy your robot: shift + right click in the folder with robot.py, "Open Command Prompt Here," and type: `python robot.py deploy --builtin --nc`. If that doesn't work, try `py` instead of `python`.

SeamonstersTemplate has a script which makes this simpler: `.\deploy.bat robot.py`

## `wpilib.IterativeRobot`

This is where all of your robot code will go.

Define an IterativeRobot:

```python
import wpilib

class MyRobot (wpilib.IterativeRobot):

    # put robot functions here

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

You can include special functions which are called at different points in your IterativeRobot. These include:

- `def robotInit(self)`: Called when the robot turns on.
- `def teleopInit(self)`: Called when the robot is enabled in teleop mode.
- `def teleopPeriodic(self)`: Called 50 times per second in teleop mode.
- `def autonomousInit(self)`: Called when the robot is enabled in autonomous mode.
- `def autonomousPeriodic(self)`: Called 50 times per second in autonomous mode.

[Complete reference](http://robotpy.readthedocs.io/projects/wpilib/en/latest/wpilib/IterativeRobot.html)

## `sea.GeneratorBot`

An alternative to IterativeRobot, for more complex sequences.

Define a GeneratorBot:

```python
import wpilib
import seamonsters as sea

class MyRobot (sea.GeneratorBot):

    # put robot functions here

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

GeneratorBot supports a different set of robot functions. See the next section for how to make a generator.

- `def robotInit(self)`: Called when the robot turns on.
- `def teleop(self)`: The teleop Generator. Use `yield` to wait for 1/50th of a second.
- `def autonomous(self)`: The autonomous Generator. Use `yield` to wait for 1/50th of a second.

## Making a Generator

[This page](../generators) has more detailed information on what Generators are and how they work.

Any function with the `yield` command is a generator. You can define a function, outside of a class, like this:

```
def myGeneratorFunction(arguments...):
    # code goes here
```

Arguments go between the parentheses and they will include parameters to control the generator (like a speed, direction, or time limit), and objects that the generator will use (like Talons and Joysticks).

## Combining Robot Modules

A common technique is splitting the functionality of your robot into small pieces and later combining them together. This section will go over ways of accomplishing this.

At the lowest level are [Generator Functions](#making-a-generator) or [Iterative Robots](#wpilibiterativerobot). You can use either to build the basic pieces of your robot. Generators may be more convenient for autonomous sequences, but use whichever makes the most sense to you.

### Sequential

You can combine generators *sequentially*, so they run one after the other, like this:

```
def generatorSequence():
    yield from generator1()
    yield from generator2()
    yield from generator3()
```

### Parallel

You can combine generators in *parallel*, so they all run at the same time, by using a feature of the Seamonsters library:

```
def generatorsInParallel():
    yield from sea.parallel(generator1(), generator2(), generator3())
```

You can find more Generator tricks [here](../generators/#seamonsters-features)

## `ctre.WPI_TalonSRX`

*NOTE: This is the new `ctre.CANTalon`. You can read about more fun changes [here](https://github.com/CrossTheRoadElec/Phoenix-Documentation/blob/master/Migration%20Guide.md).*

Talons are motor controllers. You can send messages to them to drive the motors.

Create a Talon in `robotInit`: `self.talon = ctre.WPI_TalonSRX(0)`. The number identifies the Talon.

- 0: Back left
- 1: Front right
- 2: Front left
- 3: Back right

`talon.set(speed)`: Drive the motor. Speed is any number between -1 (full speed backwards) and 1 (full speed forwards).

### Using Encoders

Encoders track the rotation and speed of the motor. They count upwards continuously as the motor rotates forwards and downwards as it rotates backwards. The Talon can try to approach a target position or velocity using encoders.

Encoders will *not* work in the simulator.

- `talon.configSelectedFeedbackSensor(ctre.FeedbackDevice.QuadEncoder)`: Required before using encoders. Tells the talon what type of encoder to check for.
- `talon.getSelectedSensorPosition(0)`: Get the position of the encoder.
- `talon.getSelectedSensorVelocity(0)`: Get the velocity of the encoder, in ticks per 100ms.

The `talon.set` function has an optional first argument that allows different control modes:

- `talon.set(ctre.ControlMode.PercentOutput, speed)`: The default. Drive in voltage mode. Speed is any number between -1 (full speed backwards) and 1 (full speed forwards).
- `talon.set(ctre.ControlMode.Position, position)`: move to an encoder position.
- `talon.set(ctre.ControlMode.Velocity, speed)`:  move at a target speed, in encoder ticks per 100ms.
- `talon.config_kP/I/D/F(0, value, 0)`: The PID values control how the talon tries to approach a position or speed. These take experimentation to figure out. Try an I value of 0 and a D value between 3 and 6, and adjust the P value to control how strongly the talon tries to approach a position (in our competition robot we used P values anywhere from 0.15 to 30).

[Complete reference](http://robotpy.readthedocs.io/projects/ctre/en/latest/api.html)

## `wpilib.Joystick`

Create a Joystick in `robotInit`: `self.joystick = wpilib.Joystick(0)`. The number identifies the joystick.

- `self.joystick.getX()`: Returns the position of the joystick on the X axis. -1 (left) to 1 (right).
- `self.joystick.getY()`: Returns the position of the joystick on the Y axis. -1 (down) to 1 (up).
- `self.joystick.getMagnitude()`: Returns the distance from the center. 0 to 1.
- `self.joystick.getDirectionDegrees()` or `joystick.getDirectionRadians()`: Returns direction the joystick moves in. 0 is up, positive numbers move clockwise.
- `self.joystick.getRawButton(number)`: Returns whether the button is pressed. Each button has a number. 1 is the trigger. Other numbers can be found from the labels on the joystick, or with Driver Station.
- `self.joystick.getRawAxis(number)`: Get an axis of the joystick, from -1 to 1. Axes include X/Y movement, twist, throttles, and anything else on the joystick that isn't just on or off. The axes are numbered, and you can figure out which is which using Driver Station.

[Complete reference](http://robotpy.readthedocs.io/projects/wpilib/en/latest/wpilib/Joystick.html)

## `AHRS`

The NavX is a device which detects movement and rotation of the robot. An "AHRS" object represents a reference to the NavX.

The NavX *will* work in the simulator!

You will need to import AHRS: `from robotpy_ext.common_drivers.navx import AHRS`

Create an AHRS in `robotInit`: `self.ahrs = AHRS.create_spi()`

- `self.ahrs.getAngle()`: Returns the *total* rotation of the robot in degrees. For example, if the robot rotates clockwise for 2 full rotations, this will be 720.

[Complete reference](http://robotpy.readthedocs.io/projects/utilities/en/latest/robotpy_ext.common_drivers.navx.html#robotpy_ext.common_drivers.navx.ahrs.AHRS)

## Vision

We will use a device called the "Limelight" this year for vision. It has a bright green light which shines at retroreflective tape, and a camera to detect the reflections. It does all the vision processing for us, and produces information about the position of a target in the camera view.

A web interface for the limelight is availible at `10.26.5.6:5801`. Here you can view the camera feed and adjust parameters.

Vision will *not* work in the simulator.

We communicate with the Limelight using NetworkTables, which allow values to be shared over the network, organized into Tables.

You will need to import NetworkTables: `from networktables import NetworkTables`

Get the limelight table, in `robotInit`: `self.vision = NetworkTables.getTable('limelight')`

- `self.vision.getNumber('tx', None)`: Returns the horizontal offset of the target in degrees. -27 to 27 degrees, 0 is centered.
- `self.vision.getNumber('ty', None)`: Returns the vertical offset of the target in degrees. -20.5 to 20.5 degrees, 0 is centered.
- `self.vision.getNumber('ta', None)`: Returns the area of the target as a percentage of the total area of the camera image (0 to 100).
- `self.vision.getNumber('ts', None)`: Returns the rotation or "skew" of the target. -90 degrees to 0 degrees.

The second argument for all these functions is the default value if no data is availible. For these examples it's `None`, but it could be whatever's useful for you.

[Complete reference](http://docs.limelightvision.io/en/latest/getting_started.html#basic-programming)
