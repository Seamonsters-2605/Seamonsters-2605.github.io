# Generators

This is a new way to build robots!

One difficulty with building a robot program is timing. The program has to synchronize with other important systems, like constantly reading data from the Driver Station or sending data to Talons. That's why we've been writing robot programs the way we have so far, with a function that is called 50 times a second, and saves important state so it will know where it is when it's called again. You can't just have a function that runs continuously for the lifetime of the robot, it has to work around the timing of the robot program.

*...except you actually can!*

We can use a feature of Python called Generators. The original purpose of Generators was to produce sequences, however what makes them useful to us is that they can "pause" themselves at any point, to be returned to later. The important command here is `yield`, which causes the function to temporarily pause. For our purposes, this will be used to wait for the 1/50th second cycle.

The "seamonsters" Python library includes features that allows us to use Generators for our robots. (include more information here about how to use the library, assuming we actually decide to use generators)

We can use the obstacle course challenge we had as an example. Here was the first general way we solved it (based on Warren's solution).

```python
def robotInit(self):
    # [create CANTalons, etc.]

def teleopInit(self):
    self.count = 0

def teleopPeriodic(self):
    self.count = self.count + 1
    if self.count <= 100:
        # [drive forward]
    else if 100 < self.count <= 130:
        # [turn right]
    else if 130 < self.count <= 255:
        # [drive forward]
    else if 255 < self.count <= 285:
        # [turn left]
    # etc...
```

Notice how we use the `self.count` variable as "state" to keep track of where we are in the sequence. This is necessary because the `teleopPeriodic` function constantly starts over 50 times per second.

Here's how you could solve the obstacle course using Generators:

```python
def robotInit(self):
    # create CANTalons, etc.

def teleop(self):
    # [drive forward]
    for i in range(100):
        yield
    # [turn right]
    for i in range(30):
        yield
    # [drive forward]
    for i in range(125):
        yield
    # [turn left]
    # etc...
```

The first thing to notice is that we no longer need `self.count`. There is also no longer `teleopInit` and `teleopPeriodic`, just `teleop`. *The `teleop` function stays "running" throughout the time the robot is enabled.* It just pauses occasionally to create timing and to synchronize with driver station. Remember that `yield` in this case means "wait 1/50th second". The code:
```
for i in range(100):
    yield
```
means "yield 100 times" or "wait 2 seconds." The `seamonsters` library actually includes a function to make this shorter: `yield from sea.wait(100)`.

## Creating Generators

*Any function that has the `yield` command is a Generator*.

Since generators are "pausable," they aren't called by normal functions. The simplest way to call them is to use a for loop.

continue this...