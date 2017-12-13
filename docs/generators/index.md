# Generators

This is a new way to build robots!

One difficulty with building a robot program is timing. The program has to synchronize with other important systems, like constantly reading data from the Driver Station or sending data to Talons. That's why we've been writing robot programs the way we have so far, with a function that is called 50 times a second, and saves important state so it will know where it is when it's called again. You can't just have a function that runs continuously for the lifetime of the robot, it has to work around the timing of the robot program.

*...except you actually can!*

We can use a feature of Python called Generators. The original purpose of Generators was to produce sequences, however what makes them useful to us is that they can "pause" themselves at any point, to be returned to later. The important command here is `yield`, which causes execution to temporarily leave the function, to return later. (this is built in to Python)

The "seamonsters" Python library includes a feature called `GeneratorBot` that allows us to use Generators for our robots. Instead of defining, for example, `teleopInit` and `teleopPeriodic` function, you define a `teleop` *generator*, which is iterated 50 times per second. So using the `yield` command effectively waits for the 1/50th second cycle.

You can get the seamonsters library using Git. It's at `https://github.com/seamonsters-2605/SeamonstersTemplate`. If you make a robot file in this cloned Git repository, you can import all the functionality of the seamonsters library with `import seamonsters as sea`.

We can use the obstacle course challenge we had as an example. Here was the first general way we solved it (based on Warren's solution).

```python
class Robot(wpilib.IterativeRobot):
    def robotInit(self):
        [create CANTalons, etc.]

    def teleopInit(self):
        self.count = 0

    def teleopPeriodic(self):
        self.count = self.count + 1
        if self.count <= 100:
            [drive forward code]
        else if 100 < self.count <= 130:
            [turn right code]
        else if 130 < self.count <= 255:
            [drive forward code]
        else if 255 < self.count <= 285:
            [turn left code]
        # etc...
```

Notice how we use the `self.count` variable as "state" to keep track of where we are in the sequence. This is necessary because the `teleopPeriodic` function constantly starts over 50 times per second.

Here's how you could solve the obstacle course using Generators:

```python
class Robot(sea.GeneratorBot):
    def robotInit(self):
        # create CANTalons, etc.

    def teleop(self):
        [drive forward code]
        for i in range(100):
            yield
        [turn right code]
        for i in range(30):
            yield
        [drive forward code]
        for i in range(125):
            yield
        [turn left code]
        # etc...
```

The first thing to notice is that we no longer need `self.count`. There is also no longer `teleopInit` and `teleopPeriodic`, just `teleop`. *The `teleop` function stays "running" throughout the time the robot is enabled.* It just pauses occasionally to create timing and to synchronize with driver station. Remember that `yield` in this case means "wait 1/50th second". The code:
```python
for i in range(100):
    yield
```
means "yield 100 times" or "wait 2 seconds." During those two seconds, *only* those two lines in the function are running until 100 iterations are complete. This is unlike the previous model when the entire `teleopPeriodic` function was called repeatedly.

The `seamonsters` library actually includes a function to make these two lines shorter: `yield from sea.wait(100)`. `sea.wait` is also a generator, which runs for a certain number of iterations before stopping. `yield from` is Python code which means: run the generator repeatedly, and yield each time, until it's complete.

## Creating and Using Generators

*Any function that has the `yield` command is a Generator*.

Since generators are "pausable," they aren't called like a normal function. They don't have a single return value, and they stay "active" over a period of time. The simplest way to call them is to use a `for` loop.

For loops are usually used to repeat a block of code for all items in a sequence. So: `for i in range(10):` repeats the following code for all numbers 0 through 9. And `for color in ['red', 'yellow', green']:` repeats the following code with `color` as "red," then again as "yellow," then again as "green."

Generators produce a sequence just like a list or a range. And you can iterate over this sequence. If you have a generator called `generator()`, you can write `for x in generator():` to have code run every time the generator pauses with `yield`. This is essentially what `GeneratorBot` in the seamonsters library is doing, except it has the added feature of synchronizing iterations of your generators with the 50 Hz cycle.

## Combining Generators

Generators especially make autonomous programming simple. You can write simple generators for basic steps of an autonomous sequence, then combine them sequentially or have them run in parallel.

For example, here's a simple generator function that turns a specified motor for a specified number of iterations:

```python
def spinMotor(motor, speed, count):
    motor.set(speed)
    for i in range(count):
        yield
    motor.set(0)
```

You can include this in your autonomous generator function like this:

```python
def autonomous(self):
    for x in spinMotor(self.motor, 1, 100):
        yield
```

So every time `spinMotor` yields, `autonomous` will yield also, causing the 1/50 second delay. Remember that this delay only happens automatically for the special `teleop` and `autonomous` functions of `GeneratorBot`. With a given `count` argument of 100, `spinMotor` will yield 100 times, and so will `autonomous`, so the motor will spin for 2 seconds.

Python has a shortcut for this, called `yield from`. This code does the same thing:

```python
def autonomous(self):
    yield from spinMotor(self.motor, 1, 100)
```

If you want to spin the motor backwards immediately after spinning it forwards, you can just add it to the sequence:

```python
def autonomous(self):
    yield from spinMotor(self.motor, 1, 100)
    yield from spinMotor(self.motor, -1, 100)
```

## Seamonsters features

The seamonsters library has some nice features for making sequences of generators. Here are some of them:

- `sea.parallel`: Run multiple generator functions simultaneously, until all of them are finished. Example:
    ```python
    yield from sea.parallel(spinMotor(self.leftMotor, 1, 100), spinMotor(self.rightMotor, 1, 100))
    ```
- `sea.watch`: Like `parallel`, except all generators will be stopped when the last one that you specified ends. So you can have the end of one action depend on an unrelated event. For example, drive forward until the camera sees a target.
- `sea.wait(count)`: Yield a certain number of iterations. You can use this to wait for a certain amount of time. `yield from sea.wait(50)` will wait 1 second.
- `sea.timeLimit(generator, count)`: Run a generator with a time limit. After a number of iterations it will be stopped.
- `sea.untilTrue(generator)`: Generators can give a value when they yield (so you can write `yield 5` or `yield "hello"`). This function will run a generator until it yields True, then continue. 
- `sea.ensureTrue(generator, requiredCount)`: This is simmilar to `untilTrue`, but it will only end when the generator has returned True for a certain number of *consecutive* iterations. We used a similar feature last year to make sure the robot had aligned to a target with vision. Often the robot would briefly be in alignment but then move past that point. This function could be used to make sure the robot stays in alignment over a period of time.

## Stop Conditions

A few of the above utilities will "stop" a generator at a certain point. If you have code that needed to be called when the generator ends, this might be skipped, which could cause problems. For example, `spinMotor` stops the motor when it's done, but if it was stopped early this might not happen.

The solution is to use a "try/finally" block.

```python
def spinMotor(motor, speed, count):
    motor.set(speed)
    try:
        for i in range(count):
            yield
    finally:
        motor.set(0)
```

The code under `finally` will *always* run after the code under `try`, even if the code under `try` is interrupted early, or even if it stops unexpectedly due to an error.