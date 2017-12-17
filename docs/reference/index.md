# Robot Programming Reference

You don't need to memorize any of this.

## `wpilib.IterativeRobot`

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

## `ctre.CANTalon`

*NOTE: This will be renamed this year to `ctre.TalonSRX`*

Create a CANTalon: `talon = ctre.CANTalon(0)`. The number identifies the Talon.

- `talon.set(speed)`: Drive the motor. Speed is any number between -1 (full speed backwards) and 1 (full speed forwards).

### Using Encoders
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

## Vision
