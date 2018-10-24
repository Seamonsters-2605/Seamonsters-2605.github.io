# Teleop Challenge Solutions

Solutions to [these challenges](..)

**Fix the wheels so they drive in the same direction:**

```python
import wpilib
import ctre

class MyRobot (wpilib.IterativeRobot):

    def robotInit(self):
        self.leftFront = ctre.WPI_TalonSRX(2)
        self.rightFront = ctre.WPI_TalonSRX(1)
        self.leftBack = ctre.WPI_TalonSRX(0)
        self.rightBack = ctre.WPI_TalonSRX(3)

        self.leftJoystick = wpilib.Joystick(0)
        self.rightJoystick = wpilib.Joystick(1)

    def teleopPeriodic(self):
        leftSpeed = -self.leftJoystick.getY()
        rightSpeed = self.rightJoystick.getY()

        self.leftFront.set(leftSpeed)
        self.leftBack.set(leftSpeed)
        self.rightFront.set(rightSpeed)
        self.rightBack.set(rightSpeed)

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

**Slow down the maximum speed:**

```python
import wpilib
import ctre

class MyRobot (wpilib.IterativeRobot):

    def robotInit(self):
        self.leftFront = ctre.WPI_TalonSRX(2)
        self.rightFront = ctre.WPI_TalonSRX(1)
        self.leftBack = ctre.WPI_TalonSRX(0)
        self.rightBack = ctre.WPI_TalonSRX(3)

        self.leftJoystick = wpilib.Joystick(0)
        self.rightJoystick = wpilib.Joystick(1)

    def teleopPeriodic(self):
        leftSpeed = -self.leftJoystick.getY() * .4
        rightSpeed = self.rightJoystick.getY() * .4

        self.leftFront.set(leftSpeed)
        self.leftBack.set(leftSpeed)
        self.rightFront.set(rightSpeed)
        self.rightBack.set(rightSpeed)

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

**Fast mode button:**

```python
import wpilib
import ctre

class MyRobot (wpilib.IterativeRobot):

    def robotInit(self):
        self.leftFront = ctre.WPI_TalonSRX(2)
        self.rightFront = ctre.WPI_TalonSRX(1)
        self.leftBack = ctre.WPI_TalonSRX(0)
        self.rightBack = ctre.WPI_TalonSRX(3)

        self.leftJoystick = wpilib.Joystick(0)
        self.rightJoystick = wpilib.Joystick(1)

    def teleopPeriodic(self):
        leftSpeed = -self.leftJoystick.getY() * .4
        rightSpeed = self.rightJoystick.getY() * .4

        if self.leftJoystick.getRawButton(1):
            leftSpeed *= 2
            rightSpeed *= 2

        self.leftFront.set(leftSpeed)
        self.leftBack.set(leftSpeed)
        self.rightFront.set(rightSpeed)
        self.rightBack.set(rightSpeed)

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

**Slow mode button:**

```python
import wpilib
import ctre

class MyRobot (wpilib.IterativeRobot):

    def robotInit(self):
        self.leftFront = ctre.WPI_TalonSRX(2)
        self.rightFront = ctre.WPI_TalonSRX(1)
        self.leftBack = ctre.WPI_TalonSRX(0)
        self.rightBack = ctre.WPI_TalonSRX(3)

        self.leftJoystick = wpilib.Joystick(0)
        self.rightJoystick = wpilib.Joystick(1)

    def teleopPeriodic(self):
        leftSpeed = -self.leftJoystick.getY() * .4
        rightSpeed = self.rightJoystick.getY() * .4

        if self.leftJoystick.getRawButton(1):
            # fast
            leftSpeed *= 2
            rightSpeed *= 2
        elif self.leftJoystick.getRawButton(2):
            # slow
            leftSpeed *= 0.5
            rightSpeed *= 0.5

        self.leftFront.set(leftSpeed)
        self.leftBack.set(leftSpeed)
        self.rightFront.set(rightSpeed)
        self.rightBack.set(rightSpeed)

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

**Single joystick control:**

```python
import wpilib
import ctre

class MyRobot (wpilib.IterativeRobot):

    def robotInit(self):
        self.leftFront = ctre.WPI_TalonSRX(2)
        self.rightFront = ctre.WPI_TalonSRX(1)
        self.leftBack = ctre.WPI_TalonSRX(0)
        self.rightBack = ctre.WPI_TalonSRX(3)

        self.leftJoystick = wpilib.Joystick(0)
        #self.rightJoystick = wpilib.Joystick(1)

    def teleopPeriodic(self):
        leftSpeed = self.leftJoystick.getX() - self.leftJoystick.getY()
        rightSpeed = self.leftJoystick.getX() + self.leftJoystick.getY()

        self.leftFront.set(leftSpeed)
        self.leftBack.set(leftSpeed)
        self.rightFront.set(rightSpeed)
        self.rightBack.set(rightSpeed)

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
```

**Reverse button:**

```python
import wpilib
import ctre

class MyRobot (wpilib.IterativeRobot):

    def robotInit(self):
        self.leftFront = ctre.WPI_TalonSRX(2)
        self.rightFront = ctre.WPI_TalonSRX(1)
        self.leftBack = ctre.WPI_TalonSRX(0)
        self.rightBack = ctre.WPI_TalonSRX(3)

        self.leftJoystick = wpilib.Joystick(0)
        self.rightJoystick = wpilib.Joystick(1)

    def teleopPeriodic(self):
        leftSpeed = -self.leftJoystick.getY()
        rightSpeed = self.rightJoystick.getY()

        if self.leftJoystick.getRawButton(2):
            # reverse
            leftSpeed = -leftSpeed
            rightSpeed = -rightSpeed

        self.leftFront.set(leftSpeed)
        self.leftBack.set(leftSpeed)
        self.rightFront.set(rightSpeed)
        self.rightBack.set(rightSpeed)

if __name__ == "__main__":
    wpilib.run(MyRobot, physics_enabled=True)
