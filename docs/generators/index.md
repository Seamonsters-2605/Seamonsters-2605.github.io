# Generators

This is a new way to build robots!

One difficulty with building a robot program is timing. The program has to synchronize with other important systems, like constantly reading data from the Driver Station or sending data to Talons. That's why we've been writing robot programs the way we have so far, with a function that is called 50 times a second, and saves important state so it will know where it is when it's called again. You can't just have a function that runs continuously for the lifetime of the robot, it has to work around the timing of the robot program.

*...except you actually can!*

We can use a feature of Python called Generators. The original purpose of Generators was to produce sequences, however what makes them useful to us is that they can "pause" themselves at any point, to be returned to later. The important command here is `yield`, which causes execution to temporarily leave the function, to return later (this is built in to Python). We can use generators in our robots to assemble complex sequences.

But first...

## What is a generator?

*Any function that has the `yield` command is a Generator*.

Yield is like a "pause" command for a function. It saves the place in the function, including all of the variable values, and exits to return later. Since generators are "pausable," they aren't called like a normal function. They don't have a single return value, and they stay "active" over a period of time. The simplest way to call them is to use a `for` loop.

For loops are usually used to repeat a block of code for all items in a sequence. So: `for i in range(10):` repeats the following code for all numbers 0 through 9. And `for color in ['red', 'yellow', green']:` repeats the following code with `color` as "red," then again as "yellow," then again as "green."

Generators produce a sequence just like a list or a range. And you can iterate over this sequence. If you have a generator called `my_generator()`, you can write `for x in my_generator():` to have code run every time the generator pauses with `yield`. For example:

```python
def my_generator():
    print("Yielding red...")
    yield "red"
    print("Yielding yellow...")
    yield "yellow"
    print("Yielding green...")
    yield "green"
    print("Done, returning")

for value in my_generator():
    print("Received", value)
print("End")
```

The output of this code will be:

```
Yielding red...
Received red
Yielding yellow...
Received yellow
Yielding green...
Received green
Done, returning
End
```

Notice how execution alternates between the `my_generator` function and the body of the `for` loop.

## Writing robots with generators

The "seamonsters" Python library allows us to use Generators for writing robots. The Seamonsters Library is availible in the SeamonstersTemplate repository on GitHub. You can import it and use it in your code by writing `import seamonsters as sea` at the top of the file.

To make a robot using generators, you extend from `sea.GeneratorBot` instead of `wpilib.IterativeRobot`. Then, instead of defining, for example, `teleopInit` and `teleopPeriodic` function, you define a `teleop` *generator*, which is iterated 50 times per second. *When you use the `yield` command in a robot, it means wait for 1/50th of a second*.

We can use the line follower challenge as an example. Here was the first general way we solved it.

```python
class Robot(wpilib.IterativeRobot):
    def robotInit(self):
        # create talons...

    def autonomousInit(self):
        self.count = 0

    def autonomousPeriodic(self):
        self.count += 1
        if self.count <= 46:
            [drive forward code]
        else if self.count <= 62:
            [turn right code]
        else if self.count <= 108:
            [drive forward code]
        else if self.count <= 124:
            [turn left code]
        # etc...
```

Notice how we use the `self.count` variable as "state" to keep track of where we are in the sequence. This is necessary because the `autonomousPeriodic` function constantly starts over 50 times per second, so we have to save our place.

Here's how you could solve the obstacle course using Generators:

```python
class Robot(sea.GeneratorBot):
    def robotInit(self):
        # create CANTalons, etc.

    def autonomous(self):
        [drive forward code]
        for i in range(46):
            yield
        [turn right code]
        for i in range(62):
            yield
        [drive forward code]
        for i in range(108):
            yield
        [turn left code]
        # etc...
```

The first thing to notice is that we no longer need `self.count`. There is also no longer `autonomousInit` and `autonomousPeriodic`, just `autonomous`. *The `autonomous` function stays "running" throughout the time the robot is enabled.* It just pauses occasionally to create timing and to synchronize with Driver Station. Remember that `yield` in this case means "wait 1/50th second", so when we write:
```python
for i in range(100):
    yield
```
This means "yield 100 times" or "wait 2 seconds." During those two seconds, *only* those two lines in the function are running until 100 iterations are complete. This is unlike the previous model when the entire `autonomousPeriodic` function was called repeatedly.

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

- `sea.wait(count)`: Yield a certain number of iterations. You can use this to wait for a certain amount of time. `yield from sea.wait(50)` will wait 1 second.
- `sea.parallel`: Run multiple generator functions simultaneously, until all of them are finished. Example:
    ```python
    yield from sea.parallel(spinMotor(self.leftMotor, 1, 100), spinMotor(self.rightMotor, 1, 100))
    ```
- `sea.watch`: Like `parallel`, except all generators will be stopped when the last one that you specified ends. So you can have the end of one action depend on an unrelated event. For example, drive forward until the camera sees a target.
- `sea.timeLimit(generator, count)`: Run a generator with a time limit. After a number of iterations it will be stopped.
- `sea.untilTrue(generator)`: Generators can give a value when they yield (so you can write `yield 5` or `yield "hello"`). This function will run a generator until it yields True, then continue. 
- `sea.ensureTrue(generator, requiredCount)`: This is similar to `untilTrue`, but it will only end when the generator has returned True for a certain number of *consecutive* iterations. We used a similar feature last year to make sure the robot had aligned to a target with vision. Often the robot would briefly be in alignment but then move past that point. This function could be used to make sure the robot stays in alignment over a period of time.

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