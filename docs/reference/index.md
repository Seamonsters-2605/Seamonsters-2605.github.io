# Robot Programming Reference

You will need to import various libraries before you can use them.

```
import wpilib
import ctre
import seamonsters as sea
```

If you want to use the seamonsters library or the robot simulator, you will need to clone [SeamonstersTemplate](https://github.com/seamonsters-2605/SeamonstersTemplate) using Git, and make your `robot.py` file in this folder.

- [`wpilib.IterativeRobot`](#wpilibiterativerobot): All of your robot code goes here
- [`sea.GeneratorBot`](#seageneratorbot): An alternative to IterativeRobot, for more complex sequences
- [`ctre.CANTalon`](#ctrecantalon) to drive motors
- [`wpilib.Joystick`](#wpilibjoystick) to get joystick input
- [`robotpy_ext.common_drivers.navx.AHRS`](#robotpy_extcommon_driversnavxahrs): The NavX, to detect rotation and motion of the robot
- [Vision](#vision)

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

GeneratorBot supports a different set of robot functions. Read [this](../generators) for more information on Generators.

- `def robotInit(self)`: Called when the robot turns on.
- `def teleop(self)`: The teleop Generator. Use `yield` to wait for 1/50th of a second.
- `def autonomous(self)`: The autonomous Generator. Use `yield` to wait for 1/50th of a second.

## `ctre.CANTalon`

*NOTE: This will be renamed this year to `ctre.TalonSRX`*

Talons are motor controllers. You can send messages to them to drive the motors.

Create a CANTalon: `talon = ctre.CANTalon(0)`. The number identifies the Talon.

- `talon.set(speed)`: Drive the motor. Speed is any number between -1 (full speed backwards) and 1 (full speed forwards).

### Using Encoders

Encoders track the rotation and speed of the motor. They count upwards continuously as the motor rotates forwards and downwards as it rotates backwards. The Talon can try to approach a target position or speed using encoders.

Encoders will *not* work in the simulator.

- `talon.setFeedbackDevice(ctre.CANTalon.FeedbackDevice.QuadEncoder)`: Required before using encoders. Tells the talon what type of encoder to check for.
- `talon.getPosition()`: Get the position of the encoder.
- `talon.getSpeed()`: Get the speed of the encoder, in ticks per 100ms.
- `talon.changeControlMode(ctre.CANTalon.ControlMode.Position)`: Switch to position control. Now you can use `talon.set(position)` to move to an encoder position.
- `talon.changeControlMode(ctre.CANTalon.ControlMode.Speed)`: Switch to speed control. Now you can use `talon.set(speed)` to move at a target speed, in encoder ticks per 100ms.
- `talon.changeControlMode(ctre.CANTalon.ControlMode.PercentVbus)`: Switch back to voltage control (the default). `talon.set(speed)` will take values from -1 to 1 again. 
- `talon.setPID(p, i, d)`: The PID values control how the talon tries to approach a position or speed. These take experimentation to figure out. Try an I value of 0 and a D value between 3 and 6, and adjust the P value to control how strongly the talon tries to approach a position (in our competition robot we used P values anywhere from 0.15 to 30).

[Complete reference](http://robotpy.readthedocs.io/projects/ctre/en/latest/api.html)

## `wpilib.Joystick`

Create a Joystick: `joystick = wpilib.Joystick(0)`. The number identifies the joystick.

- `joystick.getX()`: Returns the position of the joystick on the X axis. -1 (left) to 1 (right).
- `joystick.getY()`: Returns the position of the joystick on the Y axis. -1 (down) to 1 (up).
- `joystick.getMagnitude()`: Returns the distance from the center. 0 to 1.
- `joystick.getDirectionDegrees()` or `joystick.getDirectionRadians()`: Returns direction the joystick moves in. 0 is up, positive numbers move clockwise.
- `joystick.getRawButton(number)`: Returns whether the button is pressed. Each button has a number. 1 is the trigger. Other numbers can be found from the labels on the joystick, or with Driver Station.

[Complete reference](http://robotpy.readthedocs.io/projects/wpilib/en/latest/wpilib/Joystick.html)

## `robotpy_ext.common_drivers.navx.AHRS`

The NavX is a device which detects movement and rotation of the robot. An "AHRS" object represents a reference to the NavX.

The NavX *will* work in the simulator!

Create an AHRS: `ahrs = robotpy_ext.common_drivers.navx.AHRS.create_spi()`

- `ahrs.getYaw()`: Returns the Yaw (rotation) of the robot in degrees, from -180 to 180. Positive is clockwise.
- `ahrs.getAngle()`: Returns the *total* rotation of the robot in degrees. The difference between this and `getYaw` is that as the robot spins, the Angle will continue to count upward forever, whereas the Yaw will always stay between -180 and 180.

[Complete reference](robotpy.readthedocs.io/projects/utilities/en/latest/robotpy_ext.common_drivers.navx.html#robotpy_ext.common_drivers.navx.ahrs.AHRS)

## Vision

We will use a device called the "Limelight" this year for vision. It has a bright green light which shines at retroreflective tape, and a camera to detect the reflections. It does all the vision processing for us, and produces information about the position of a target in the camera view.

Vision will *not* work in the simulator.

We communicate with the Limelight using NetworkTables, which allow values to be shared over the network, organized into Tables.

You will need to import NetworkTables like this: `from networktables import NetworkTables`

Get the limelight table: `vision = NetworkTables.getTable('limelight')`

- `vision.getNumber('tx')`: Returns the horizontal offset of the target in degrees. 0 is centered.
- `vision.getNumber('ty')`: Returns the vertical offset of the target in degrees. 0 is centered.
- `vision.getNumber('ta')`: Returns the area of the target as a percentage of the total area of the camera image (0 to 100).
- `vision.getNumber('ts')`: Returns the rotation or "skew" of the target. This isn't very well documented.

[Complete reference](http://docs.limelightvision.io/en/latest/getting_started.html#basic-programming)
