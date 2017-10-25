# Code Examples

- [Basic Robot Template](#basic-robot-template)
- [Motors](#motors)
- [Joysticks](#joysticks)
- [Gamepad Right Joystick](#gamepad-right-joystick)
- [Joystick Buttons](#joystick-buttons)

## Basic Robot Template

```python
import wpilib
import ctre

class MyRobot (wpilib.IterativeRobot):

    def robotInit(self):
        # code here runs when the program starts

    def teleopPeriodic(self):
        # code here runs 50 times per second while the robot is enabled

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

You can change `MyRobot` to whatever name you want.

## Motors

In `robotInit`:

```python
self.motor = wpilib.CANTalon(0)
```

The 0 is the number of the Talon. Each motor has a number. On the 2017 "Leviathan" robot, these are:

- 0: Back left
- 1: Front right
- 2: Front left
- 3: Back right
- 4: Climber
- 5: Shooter flywheel
- 6: Unused
- 7: Shooter feeder

Then in `teleopPeriodic`:

```python
self.motor.set(1)
```

to drive the motor. You can have any value between -1 (full speed reverse) and 1 (full speed forward).

## Joysticks

In `robotInit`:

```python
self.joystick = wpilib.Joystick(0)
```

You can create multiple joysticks&mdash;change the number in parentheses to `1` for the second joystick, `2` for the third joystick.

In `teleopPeriodic`:

```python
joystickX = self.joystick.getX()
joystickY = self.joystick.getY()
```

For the X values, -1 is left and 1 is right. For the Y values, -1 is down and 1 is up.

## Gamepad Right Joystick

You can get input from a gamepad the same way you use a regular joystick. A gamepad is treated as a single joystick, even though it has 2 joysticks on it. The functions `getX()` and `getY()` give you the X and Y position of the *left* joystick.

If you want to read the *right* joystick, use this:

```python
rightJoystickX = self.getRawAxis(4)
rightJoystickY = self.getRawAxis(5)
```

## Joystick Buttons

In `teleopPeriodic`:

```python
if self.leftJoystick.getRawButton(1):
    # do something...
```

The indented code will be run when the button is held. Button 1 is the trigger ("A" button on gamepads), but you can change this number for any other button on the joystick.

Remember that the code inside the if statement will still run 50 times per second while the button is held.
