# Subsystem Controller Classes

A *subsystem* is a collection of motors/sensors on the robot that has a specific purpose. Each year our robot has a few subsystems. Last year we had 3:

- Drivetrain (for movement)
- Conveyor (for manipulating cubes)
- Wings (for lifting other robots)
- Bonus #4: LED light display on the wings

Each subsystem will live in its own `.py` file and have its own Controller class. Controller classes are responsible for managing all of the resources associated with the subsystem (motors, sensors, etc.), and have functions/generators for all of the basic actions of the subsystem. The Controller class does **not** know about driver controls like joysticks, or any other subsystems. A Controller class is **not** a robot.

Here's what a controller class looks like.

```python
class SubsystemController:

    def __init__(self):
        # this function is called when the controller object is created by the robot. initialize resources here
    
    def doSomething(self, arg1, arg2, arg3):
        # do something...
```

Here's how you might use this controller class in your robot:

```python
# import the things
import my_subsystem

class MyRobot(sea.GeneratorBot):

    def robotInit(self):
        self.subsystem = my_subsystem.SubsystemController()
    
    def teleop(self):
        self.subsystem.doSomething(1, 2, 3)

# etc.
```

## Activity

Your task is to write a subsystem controller for the conveyor on our 2018 robot.

The conveyor subsystem has 4 motors:
- A left and right conveyor motor
- A left and right intake motor

Your controller should include these functions:
- Load the cube by running the conveyor and intake slowly
- Drop the cube (reverse of loading cube)
- Shoot the cube by running the conveyor quickly
- Stop all motors

It should also include these autonomous generators:
- Shoot the cube for 1 second and stop
- Drop the cube for 1 second and stop
- Pulse the intake (move back and forth forever)

All of these generators should have a **stop** condition so that the motors properly stop if the generators are interrupted early. You can use a try/finally block for this:

```python
try:
    # do the thing
finally:
    # stop the thing
```

Finally, write a robot class *in a separate file* which attaches joystick controls to each of these actions.
