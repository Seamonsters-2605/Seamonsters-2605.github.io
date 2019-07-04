# Robot Programming Reference

You will need to import various libraries before you can use them.

```
import wpilib
import ctre
import seamonsters as sea
```

If you want to use the seamonsters library or the robot simulator, you will need to clone with Git or download [SeamonstersTemplate](https://github.com/seamonsters-2605/SeamonstersTemplate), and make your `robot.py` file in this folder. [Here](../robot-sim) is a tutorial on using the robot simulator.

- [Deploying Code](#deploying-code)
- [`sea.GeneratorBot`](#seageneratorbot): All of your robot code goes here
- [Making a Generator](#making-a-generator)
- [Building an Autonomous Sequence](#building-an-autonomous-sequence)
- [`sea.SuperHolonomicDrive`](#seasuperholonomicdrive)
- [`ctre.WPI_TalonSRX`](#ctrewpi_talonsrx) to drive motors
- [`wpilib.Joystick`](#wpilibjoystick) to get joystick input
- [RoboRIO I/O](#roborio-io)
- [`navx.AHRS`](#navxahrs): The NavX, to detect rotation and motion of the robot
- [Vision](#vision)

## Deploying Code

Open your code in VS Code, switch to the Debug tab on the left, select the "Deploy" configuration, and click the green play button.

## `sea.GeneratorBot`

This is where all of your robot code will go.

Define a GeneratorBot:

```python
import wpilib
import seamonsters as sea

class MyRobot (sea.GeneratorBot):

    # put robot functions here

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

You can include special functions which are called at different points in your GeneratorBot. These include:

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

## Building an Autonomous Sequence

You can build an autonomous sequence by combining simple parts, in the form of Generators and other functions, into a larger generator function.

For these examples we'll use a hypothetical generators called `shoot()`, `drive()`, and `alignToTarget()`.

- `yield from shoot()`: Run the generator until it's complete, then continue to the next step.
- `yield from sea.parallel(shoot(), drive())`: Run multiple generators simultaneously (in parallel). Once all of the generators have completed, move on to the next step.
- `yield from sea.watch(shoot(), drive())`: This is similar to `sea.parallel`, but once the first generator in the list is done, all of the rest will be stopped and it will continue to the next step. In this example, when `shoot` completes `drive` will stop.
- `yield from sea.wait(count)`: Wait for a certain time, in 50ths of a second. `yield from sea.wait(50)` will wait one second.
- `yield from sea.timeLimit(shoot(), time)`: Run the generator. If it's still running after a certain amount of time (in 50ths of a second) stop it and continue.
- `yield from sea.untilTrue(alignToTarget())`: Generators can produce a value when they yield (for example, `yield True` or `yield False`). This will run a generator until it yields True, then continue.
- `yield from sea.ensureTrue(alignToTarget(), time)`: This is similar to `untilTrue`, but it will only end when the generator has returned True for a certain number of *consecutive* iterations. We used a similar feature last year to make sure the robot had aligned to a target with vision. Often the robot would briefly be in alignment but then move past that point. This function could be used to make sure the robot stays in alignment over a period of time.

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

## `sea.SuperHolonomicDrive`

A universal drivetrain controller. Works on all types of drivetrains.

To use the SuperHolonomicDrive you need to `import seamonsters as sea`. Create a SuperHolonomicDrive in `robotInit` : `self.drivetrain = sea.SuperHolonomicDrive()`. Add wheels to the drivetrain with `self.drivetrain.addWheel(leftFrontWheel)`.

### Wheel types

- `AngledWheel`: A wheel oriented in a fixed direction
- `MechanumWheel`: An angled Mechanum wheel
- `SwerveWheel`: An `AngledWheel` that can rotate (like a shopping cart)

```
for wheel in self.drivetrain.wheels:
    wheel.driveMode = ctre.ControlMode.PercentOutput
```
It is important to set all the wheels to the same control mode before driving. The modes are `PercentOutput`, `Velocity`, and `Position`. `PercentOutput` is sent a percentage of the total voltage and because of that can be unreliable. `Velocit` and `Position` are given a target velocity/position and try to get to that. They are more reliable.

## `ctre.WPI_TalonSRX`

Talons are motor controllers. You can send messages to them to drive the motors.

To use talons you will need to `import ctre` at the top of your code. Create a Talon in `robotInit`: `self.talon = ctre.WPI_TalonSRX(0)`. The number identifies the Talon.

- 0: Back left
- 1: Front right
- 2: Front left
- 3: Back right

`.set(speed)`: Drive the motor. Speed is any number between -1 (full speed backwards) and 1 (full speed forwards).

### Using Encoders

Encoders track the rotation and speed of the motor. They count upwards continuously as the motor rotates forwards and downwards as it rotates backwards. The Talon can try to approach a target position or velocity using encoders.

Encoders will *not* work in the simulator.

- `.configSelectedFeedbackSensor(ctre.FeedbackDevice.QuadEncoder, 0, 0)`: Required before using encoders. Tells the talon what type of encoder to check for.
- `.getSelectedSensorPosition(0)`: Get the position of the encoder.
- `.getSelectedSensorVelocity(0)`: Get the velocity of the encoder, in ticks per 100ms.

The `talon.set` function has an optional first argument that allows different control modes:

- `.set(ctre.ControlMode.PercentOutput, speed)`: The default. Drive in voltage mode. Speed is any number between -1 (full speed backwards) and 1 (full speed forwards).
- `.set(ctre.ControlMode.Position, position)`: move to an encoder position.
- `.set(ctre.ControlMode.Velocity, speed)`:  move at a target speed, in encoder ticks per 100ms.
- `.config_kP/I/D/F(0, value, 0)`: The PID values control how the talon tries to approach a position or speed. These take experimentation to figure out. Try an I value of 0 and a D value between 3 and 6, and adjust the P value to control how strongly the talon tries to approach a position (in our competition robot we used P values anywhere from 0.15 to 30).

[Complete reference](http://robotpy.readthedocs.io/projects/ctre/en/latest/api.html)

## `wpilib.Joystick`

Create a Joystick in `robotInit`: `self.joystick = wpilib.Joystick(0)`. The number identifies the joystick.

- `.getX()`: Returns the position of the joystick on the X axis. -1 (left) to 1 (right).
- `.getY()`: Returns the position of the joystick on the Y axis. -1 (down) to 1 (up).
- `.getMagnitude()`: Returns the distance from the center. 0 to 1.
- `.getDirectionDegrees()` or `joystick.getDirectionRadians()`: Returns direction the joystick moves in. 0 is up, positive numbers move clockwise.
- `.getRawButton(number)`: Returns whether the button is pressed. Each button has a number. 1 is the trigger. Other numbers can be found from the labels on the joystick, or with Driver Station.
- `.getRawAxis(number)`: Get an axis of the joystick, from -1 to 1. Axes include X/Y movement, twist, throttles, and anything else on the joystick that isn't just on or off. The axes are numbered, and you can figure out which is which using Driver Station.

[Complete reference](http://robotpy.readthedocs.io/projects/wpilib/en/latest/wpilib/Joystick.html)

## RoboRIO I/O

- [`wpilib.DigitalInput(channel)`](https://robotpy.readthedocs.io/projects/wpilib/en/latest/wpilib/DigitalInput.html#wpilib.digitalinput.DigitalInput)
    - `.get()`: Returns True or False
- [`DigitalOutput(channel)`](https://robotpy.readthedocs.io/projects/wpilib/en/latest/wpilib/DigitalOutput.html#wpilib.digitaloutput.DigitalOutput)
    - `.set(value)`: Value is True or False
- [`AnalogInput(channel)`](https://robotpy.readthedocs.io/projects/wpilib/en/latest/wpilib/AnalogInput.html#wpilib.analoginput.AnalogInput)
    - `.getVoltage()`: Returns volts as a Float

## `navx.AHRS`

The NavX is a device which detects movement and rotation of the robot. An "AHRS" object represents a reference to the NavX.

The NavX *will* work in the simulator!

You will need to import navx: `import navx`

Create an AHRS in `robotInit`: `self.ahrs = navx.AHRS.create_spi()`

- `self.ahrs.getAngle()`: Returns the *total* rotation of the robot in degrees. For example, if the robot rotates clockwise for 2 full rotations, this will be 720.

[Complete reference](https://robotpy.readthedocs.io/projects/navx/en/latest/api.html)

## Vision

We will use a device called the "Limelight" this year for vision. It has a bright green light which shines at retroreflective tape, and a camera to detect the reflections. It does all the vision processing for us, and produces information about the position of a target in the camera view.

A web interface for the limelight is availible at `10.26.5.6:5801`. Here you can view the camera feed and adjust parameters.

Vision can work in the simulator with some additional configuration.

We communicate with the Limelight using NetworkTables, which allow values to be shared over the network, organized into Tables.

You will need to import NetworkTables: `from networktables import NetworkTables`

Get the limelight table, in `robotInit`: `self.vision = NetworkTables.getTable('limelight')`

- `self.vision.getNumber('tx', None)`: Returns the horizontal offset of the target in degrees. -27 to 27 degrees, 0 is centered.
- `self.vision.getNumber('ty', None)`: Returns the vertical offset of the target in degrees. -20.5 to 20.5 degrees, 0 is centered.
- `self.vision.getNumber('ta', None)`: Returns the area of the target as a percentage of the total area of the camera image (0 to 100).
- `self.vision.getNumber('ts', None)`: Returns the rotation or "skew" of the target. -90 degrees to 0 degrees.

The second argument for all these functions is the default value if no data is availible. For these examples it's `None`, but it could be whatever's useful for you.

[Complete reference](http://docs.limelightvision.io/en/latest/getting_started.html#basic-programming)
