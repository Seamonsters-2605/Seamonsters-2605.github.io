# Teleop Challenge Solutions

Solutions to [these challenges](..)

**Slow down the maximum speed:**

```python
import wpilib
import rev
import seamonsters as sea 
import math

class PracticeBot(sea.GeneratorBot):

    def robotInit(self):
        self.joystick = wpilib.Joystick(0)

        self.initDrivetrain()
    
    def initDrivetrain(self):
        leftSpark = rev.CANSparkMax(1, rev.MotorType.kBrushless)
        rightSpark = rev.CANSparkMax(2, rev.MotorType.kBrushless)

        for spark in [leftSpark, rightSpark]:
            spark.restoreFactoryDefaults()
            spark.setIdleMode(rev.IdleMode.kBrake)

        leftWheel = sea.AngledWheel(leftSpark, -1, 0, math.pi/2, 1, 16)
        rightWheel = sea.AngledWheel(rightSpark, 1, 0, math.pi/2, 1, 16)

        self.drivetrain = sea.SuperHolonomicDrive()
        self.drivetrain.addWheel(leftWheel)
        self.drivetrain.addWheel(rightWheel)

        for wheel in self.drivetrain.wheels:
            wheel.driveMode = rev.ControlType.kVelocity

        sea.setSimulatedDrivetrain(self.drivetrain)

    def teleop(self):
        while True:
            mag = sea.deadZone(self.joystick.getY())
            mag *= 5 * 0.4 # multiplied by 0.4 to slow it down
            turn = sea.deadZone(self.joystick.getX())
            turn *= math.radians(300) * 0.4 # multiplied by 0.4 to slow it down

            self.drivetrain.drive(mag, math.pi/2, turn)
            
            yield

if __name__ == "__main__":
    wpilib.run(PracticeBot)
```

**Fast mode button:**

```python
import wpilib
import rev
import seamonsters as sea 
import math

class PracticeBot(sea.GeneratorBot):

    def robotInit(self):
        self.joystick = wpilib.Joystick(0)

        self.initDrivetrain()
    
    def initDrivetrain(self):
        leftSpark = rev.CANSparkMax(1, rev.MotorType.kBrushless)
        rightSpark = rev.CANSparkMax(2, rev.MotorType.kBrushless)

        for spark in [leftSpark, rightSpark]:
            spark.restoreFactoryDefaults()
            spark.setIdleMode(rev.IdleMode.kBrake)

        leftWheel = sea.AngledWheel(leftSpark, -1, 0, math.pi/2, 1, 16)
        rightWheel = sea.AngledWheel(rightSpark, 1, 0, math.pi/2, 1, 16)

        self.drivetrain = sea.SuperHolonomicDrive()
        self.drivetrain.addWheel(leftWheel)
        self.drivetrain.addWheel(rightWheel)

        for wheel in self.drivetrain.wheels:
            wheel.driveMode = rev.ControlType.kVelocity

        sea.setSimulatedDrivetrain(self.drivetrain)

    def teleop(self):
        while True:
            mag = sea.deadZone(self.joystick.getY())
            mag *= 5 
            turn = sea.deadZone(self.joystick.getX())
            turn *= math.radians(300)

            if self.joystick.getRawButton(1):
                mag *= 2
                turn *= 2

            self.drivetrain.drive(mag, math.pi/2, turn)
            
            yield

if __name__ == "__main__":
    wpilib.run(PracticeBot)
```

**Slow mode button:**

```python
import wpilib
import rev
import seamonsters as sea 
import math

class PracticeBot(sea.GeneratorBot):

    def robotInit(self):
        self.joystick = wpilib.Joystick(0)

        self.initDrivetrain()
    
    def initDrivetrain(self):
        leftSpark = rev.CANSparkMax(1, rev.MotorType.kBrushless)
        rightSpark = rev.CANSparkMax(2, rev.MotorType.kBrushless)

        for spark in [leftSpark, rightSpark]:
            spark.restoreFactoryDefaults()
            spark.setIdleMode(rev.IdleMode.kBrake)

        leftWheel = sea.AngledWheel(leftSpark, -1, 0, math.pi/2, 1, 16)
        rightWheel = sea.AngledWheel(rightSpark, 1, 0, math.pi/2, 1, 16)

        self.drivetrain = sea.SuperHolonomicDrive()
        self.drivetrain.addWheel(leftWheel)
        self.drivetrain.addWheel(rightWheel)

        for wheel in self.drivetrain.wheels:
            wheel.driveMode = rev.ControlType.kVelocity

        sea.setSimulatedDrivetrain(self.drivetrain)

    def teleop(self):
        while True:
            mag = sea.deadZone(self.joystick.getY())
            mag *= 5 
            turn = sea.deadZone(self.joystick.getX())
            turn *= math.radians(300)

            if self.joystick.getRawButton(1):
                # fast
                mag *= 2
                turn *= 2
            elif self.joystick.getRawButton(2):
                # fast
                mag *= 0.5
                turn *= 0.5

            self.drivetrain.drive(mag, math.pi/2, turn)
            
            yield

if __name__ == "__main__":
    wpilib.run(PracticeBot)
```

**Reverse button:**

```python
import wpilib
import rev
import seamonsters as sea 
import math

class PracticeBot(sea.GeneratorBot):

    def robotInit(self):
        self.joystick = wpilib.Joystick(0)

        self.initDrivetrain()
    
    def initDrivetrain(self):
        leftSpark = rev.CANSparkMax(1, rev.MotorType.kBrushless)
        rightSpark = rev.CANSparkMax(2, rev.MotorType.kBrushless)

        for spark in [leftSpark, rightSpark]:
            spark.restoreFactoryDefaults()
            spark.setIdleMode(rev.IdleMode.kBrake)

        leftWheel = sea.AngledWheel(leftSpark, -1, 0, math.pi/2, 1, 16)
        rightWheel = sea.AngledWheel(rightSpark, 1, 0, math.pi/2, 1, 16)

        self.drivetrain = sea.SuperHolonomicDrive()
        self.drivetrain.addWheel(leftWheel)
        self.drivetrain.addWheel(rightWheel)

        for wheel in self.drivetrain.wheels:
            wheel.driveMode = rev.ControlType.kVelocity

        sea.setSimulatedDrivetrain(self.drivetrain)

    def teleop(self):
        while True:
            mag = sea.deadZone(self.joystick.getY())
            mag *= 5 
            turn = sea.deadZone(self.joystick.getX())
            turn *= math.radians(300)

            # reverses the magnitude and direction
            if self.joystick.getRawButton(2):
                mag = -mag
                turn = -turn

            self.drivetrain.drive(mag, math.pi/2, turn)
            
            yield

if __name__ == "__main__":
    wpilib.run(PracticeBot)
```
