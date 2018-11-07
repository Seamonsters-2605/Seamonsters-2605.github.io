# Sensors and Feedback Loops

## Sensors on the robot

### Encoder

<img src="https://media.digikey.com/photos/CUI%20Photos/AMT103-V.jpg" alt="AMT-103 Encoder" height="300">

- Measures rotation of motor shaft.
- Connects to Talon, which tracks cumulative position and velocity.
- RoboRIO requests and receives encoder data from Talon over CAN bus.
- [Reference](../reference/#using-encoders)
- Works in simulator.

### NavX

<img src="http://www.kauailabs.com/store/image/data/navx_mxp_boardphoto_top_annotated.jpg" alt="NavX" height="300">

- Measures acceleration and rotation of robot (6 axes).
- Connects to RoboRIO via pin header.
- [Reference](../reference/#ahrs)
- Works in simulator.

### Limelight

<img src="https://cdn.shopify.com/s/files/1/2478/0822/files/Front_720x.jpg?v=1512551879" alt="Limelight" height="300">

- Tracks retroreflective vision targets.
- Includes an LED array for illuminating target and a camera.
- Onboard processor filters out and locates the target. Settings can be configured through a web interface.
- Communicates with RoboRIO over ethernet, using the "NetworkTables" protocol.
- [Reference](../reference/#vision)
- Works in simulator, with some configuration.

### Proximity Sensor

<img src="https://upload.wikimedia.org/wikipedia/commons/2/27/Sharp_GP2Y0A21YK_IR_proximity_sensor_cropped.jpg" alt="Proximity Sensor" height="300">

- Measures distance to a surface by shining infrared light.
- Connects to analog input of RoboRIO.
- Approximate distance can be calculated based on voltage curve.
- [Analog input reference](../reference/#roborio-io)
- Doesn't work in simulator

## Feedback loops

Feedback means that the output of a system directly affects the input. For example, the shaft of a motor is connected to an encoder, meaning that the motor output directly changes the encoder input. We can then use the encoder input in our program to change the output of the motor, completing the loop. This is known as "closed-loop" control.

In robotics programming we often use *negative* feedback loops, which attempt to maintain a state by dampening the stimulus of the input. For example we can use the NavX and drivetrain motors to keep the robot pointed in a direction. When the robot rotates too far in one direction, the code will compensate by running the motors in the opposite direction (negative feedback).

You can read more about ["Control Theory"](https://en.wikipedia.org/wiki/Control_theory) on Wikipedia.

Steps of a feedback loop:

- Establish a "Set Point" (SP) or target position of the sensor
- Repeat continuously while running:
    - Read the current sensor value (the "Process Variable" PV)
    - Determine the "error" (difference between Process Variable and Set Point)
    - Apply a function to the error to determine correction output (with correct sign)
    - Update motors or other output devices to correct error

## Your Task

- Choose a sensor from the list above.
- Write code that will read some measurement from the sensor and print it continuously to the Driver Station console.
- Deploy and observe how you can change the value of the sensor. What range of values does it produce?
- Come up with a scenario in which a feedback loop might be needed for this sensor.
- Write a feedback loop and test.