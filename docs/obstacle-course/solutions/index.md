```python
import seamonsters as sea 
import wpilib
import rev
import math

TIME_TO_DRIVE_A_SECTION = 110
TIME_TO_TURN = 31

class PracticeBot(sea.GeneratorBot):

    def robotInit(self):
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

    def autonomous(self):
        turnList = [-1,1,1,-1,-1,1,1]
        for turnDir in turnList:
            yield from self.driveASection()
            yield from self.turn(turnDir)
        yield from self.driveASection()
        yield from self.stop()

    def turn(self, speed):
        self.drivetrain.drive(0, math.pi/2, math.radians(150) * speed)
        yield from sea.wait(TIME_TO_TURN)

    def stop(self):
        yield self.drivetrain.drive(0,0,0)

    def driveASection(self):
        self.drivetrain.drive(5, math.pi/2, 0)
        yield from sea.wait(TIME_TO_DRIVE_A_SECTION)

if __name__ == "__main__":
    wpilib.run(PracticeBot)
```