# Micro:Bits

- First, install [this driver](https://developer.mbed.org/handbook/Windows-serial-configuration) for Windows.
- [Download Mu](https://codewith.mu/). You will use this to program the Micro:Bit.
- Pick up a Micro:Bit, plug it in to your computer, and start Mu.
- Click the REPL button. Try typing `display.show(Image.HAPPY)`. If it worked you should see an image on the screen.
- Try some of the things in [this tutorial](http://microbit-micropython.readthedocs.io/en/latest/tutorials/hello.html).
- Come up with something interesting to do with the Micro:Bit. Besides the screen and buttons, it has [an accelerometer](http://microbit-micropython.readthedocs.io/en/latest/tutorials/movement.html) (it can detect when you tilt it), [a compass](http://microbit-micropython.readthedocs.io/en/latest/tutorials/direction.html), [a radio](http://microbit-micropython.readthedocs.io/en/latest/tutorials/radio.html) (it can communicate with other Micro:Bits), and [3 pins](http://microbit-micropython.readthedocs.io/en/latest/tutorials/io.html) at the bottom (you can connect these to different electronic devices like a speaker, or you can press them with your fingers). You can find the complete list of Python functions for the Micro:Bit in the [API documentation](http://microbit-micropython.readthedocs.io/en/latest/microbit_micropython_api.html).
- Pick up a robot if one is available. If you connect a Micro:Bit to the robot, it will be powered by the batteries and it will have a speaker and 2 motors that you can control. Download [this file](microbit_robot_base.py). This is the base that will allow you to control the motors&mdash;you can add your own code to the bottom. You can spin the motors with `left_motor.run(speed)` or `right_motor.run(speed)` where `speed` is a number from -1 (full speed reverse) to 1 (full speed forward).
- Ideas:
    - Contol the robot remotely with a second Micro:Bit
    - [Play music](http://microbit-micropython.readthedocs.io/en/latest/tutorials/music.html)
