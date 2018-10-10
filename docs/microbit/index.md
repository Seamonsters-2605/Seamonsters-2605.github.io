# Micro:Bits

- [Download Mu](https://codewith.mu/en/download). You will use this to program the Micro:Bit.
- When you start Mu for the first time, choose **BBC micro:bit** mode.
- Pick up a Micro:Bit and plug it into your computer.
- Click the **REPL** button in Mu. In the REPL panel at the bottom of the window, try typing `display.show(Image.HAPPY)` and press Enter. If it worked you should see an image on the screen of the Micro:Bit.

> This is the Interactive mode, where you can type in code one line at a time and it will run when you press Enter. You can also type longer scripts into the editor and click the **Flash** button to download them and run them on the Micro:Bit.

- Try some of the code in [this tutorial](http://microbit-micropython.readthedocs.io/en/latest/tutorials/hello.html).
- Come up with something interesting to do with the Micro:Bit. Besides the screen and buttons, it has [an accelerometer](http://microbit-micropython.readthedocs.io/en/latest/tutorials/movement.html) (it can detect when you tilt it), [a compass](http://microbit-micropython.readthedocs.io/en/latest/tutorials/direction.html), [a radio](http://microbit-micropython.readthedocs.io/en/latest/tutorials/radio.html) (it can communicate with other Micro:Bits), and [3 pins](http://microbit-micropython.readthedocs.io/en/latest/tutorials/io.html) at the bottom (you can connect these to different electronic devices like a speaker, or you can press them with your fingers). You can find the complete list of Python functions for the Micro:Bit in the [API documentation](http://microbit-micropython.readthedocs.io/en/latest/microbit_micropython_api.html).

## Drive a robot

- Pick up a robot if one is available. If you connect a Micro:Bit to the robot, it will be powered by the batteries and it will have a speaker and 2 motors that you can control. Download [this file](microbit_robot_base.py). This is the base that will allow you to control the motors&mdash;you can add your own code to the bottom. You can spin the motors with `left_motor.run(speed)` or `right_motor.run(speed)` where `speed` is a number from -1000 (full speed reverse) to 1000 (full speed forward).
- Ideas:
    - Contol the robot remotely with a second Micro:Bit
    - [Play music](http://microbit-micropython.readthedocs.io/en/latest/tutorials/music.html)

## Try Python!

You can also use Mu to write Python code without a Micro:Bit. Click the **Mode** button and switch to Python 3 mode. Now click the **REPL** button, and in the REPL panel type `2 * 3` and press Enter.
