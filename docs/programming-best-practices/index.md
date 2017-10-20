# Best Practices for Programming

## General tips

- Study working code.  There are many examples and other team code repositories online that will give you good experience and inspiration.  
- Learn how to effectively search online resources like Chief Delphi, Stack Overflow, ... Phrasing the question correctly is a very important step to finding the answer.  
- Ask a peer or mentor when you are stuck.  The most valuable feedback comes from a real human.  Both you and them will benefit from the interaction.

## Guidelines for writing code

- Document your code with comments, docstrings, clearly named variables/functions, etc. Always assume that someone else will need to look at, use, or fix your code and that you won't be there to explain it.
- Avoid duplicate code. Use functions or other flow control (if statements, loops, etc.) instead. DRY (Don't Repeat Yourself).
- KISS (Keep It Simple, Silly) If there's a way to keep code readable while accomplishing what you need, prefer that over getting tricky with long one-line ramblings. Shorter code does not necessarily mean simpler or better code.
- Make your code easily adaptable to change. The design of the robot could change up to the last minute (hopefully not, but it happens).
    - Move "magic numbers" to a constant. These are special, arbitrary numbers that could change, like the angle of the wheels on the robot, an encoder count for a motor, the maximum driving speed, etc. If you had to calculate one of these numbers, include a comment about how you calculated it. If you made up the number or found it through trial and error, explain that in a comment - this will make people less afraid of changing it. Especially avoid duplicating the same number in multiple places.
- In general, don't trust your memory. If you find an issue, write it down somewhere, immediately. Don't trust yourself to remember why you wrote something a certain way, why you used a specific number somewhere, why you commented out a certain section of code. Even if you do remember these things, you will have to constantly explain them to other people.

## Tips for figuring out why something isn't working

- [rubberduckdebugging.com](https://rubberduckdebugging.com/) Sometimes explaining something out loud can help you spot problems.
- Logging: one of the simplest ways to debug a problem is to print relevant information at critical points in the code. For robot code, Driver Station has a console which updates with everything that you write with `print` statements.
- If you are having a problem with a large section of code, try to test small parts of it individually. Find the parts that you are sure work perfectly, and narrow everything down to the smallest piece of code that will produce the problem. But also keep in mind that the issue may not be with a specific part but with communications between the parts.

### How to read a stack trace:

Stack traces are printed when an error occurs in your program. They can be long and overwhelming in some cases, but it's important to understand what they mean.
For example, when you run this program:

```python
def a():
    b()
def b():
    print(thisVariableDoesntExist)
a()
```

You will get this error:

```
Traceback (most recent call last):
  File "test.py", line 8, in <module>
    a()
  File "test.py", line 3, in a
    b()
  File "test.py", line 6, in b
    print(thisVariableDoesntExist)
NameError: name 'thisVariableDoesntExist' is not defined
```

The most important part of this error is on the last line. It gives the type of error and extra details about the error. In this case the name is a "NameError," which [according to the Python Documentation](https://docs.python.org/3/library/exceptions.html#NameError) occurs when the name of a variable or function is not recognized. Following this is the text `name 'thisVariableDoesntExist' is not defined`, which pretty clearly explains what went wrong - the variable you were trying to use was not defined.

The text above the bottom line gives more information about where the error occurred, and under what circumstances. The 2 lines above the error show which line the error occurred on, in which function, in which file, and what that line looked like. In this case the error occurred in the file "test.py," on line 6, in the function `b()`. Below that is the text of the line (line 6) that caused the error.
Above those lines is a list of the series of functions that got you to this place in the code. First the function `a()` was called on line 8; then, on line 3 in `a()`, the function `b()` was called; then, on line 6 in `b()` the error occurred. When you see `<module>` in place of a function name, this means the code was outside of a function.
