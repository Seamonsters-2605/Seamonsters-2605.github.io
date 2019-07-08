# Generators

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