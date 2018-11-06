# Sensors and Feedback Loops

## Sensors on the robot

### Encoder

![AMT-103 Encoder](https://media.digikey.com/photos/CUI%20Photos/AMT103-V.jpg)

- Measures rotation of motor shaft.
- Connects to Talon, which tracks cumulative position and velocity.
- RoboRIO requests and receives encoder data from Talon over CAN bus.
- [Reference](../reference/#using-encoders)
- Works in simulator.

### NavX

![NavX](http://www.kauailabs.com/store/image/data/navx_mxp_boardphoto_top_annotated.jpg)

- Measures acceleration and rotation of robot (6 axes).
- Connects to RoboRIO via pin header.
- [Reference](../reference/#ahrs)
- Works in simulator.

### Limelight

![Limelight](https://cdn.shopify.com/s/files/1/2478/0822/files/Front_720x.jpg?v=1512551879)

- Tracks retroreflective vision targets.
- Includes an LED array for illuminating target and a camera.
- Onboard processor filters out and locates the target. Settings can be configured through a web interface.
- Communicates with RoboRIO over ethernet, using the "NetworkTables" protocol.
- [Reference](../reference/#vision)
- Works in simulator, with some configuration.

### Proximity Sensor

![Proximity Sensor](https://upload.wikimedia.org/wikipedia/commons/2/27/Sharp_GP2Y0A21YK_IR_proximity_sensor_cropped.jpg)

- Measures distance to a surface by shining infrared light.
- Connects to analog input of RoboRIO.
- Approximate distance can be calculated based on voltage curve.
- [Analog input reference](../reference/#roborio-io)
- Doesn't work in simulator

## Feedback loops

The purpose of a feedback loop is to use sensors and output devices (usually motors) to maintain a state. For example, we can use the NavX and drivetrain motors to keep the robot pointed in a direction. Specifically, this is a *negative* feedback loop, because if a sensor value moves too far in one direction, the motors will be driven in the opposite direction to compensate.

You can read more about ["Control Theory"](https://en.wikipedia.org/wiki/Control_theory) on Wikipedia.

Steps of a feedback loop:

- Establish a "Set Point" (SP) or target position of the sensor
- Repeat continuously while running:
    - Read the current sensor value (the "Process Variable" PV)
    - Determine the "error" (difference between Process Variable and Set Point)
    - Apply a function to the error to determine correction output (with correct sign)
    - Update motors or other output devices to correct error

## Your Task

- Choose a sensor from the list above
- Write code that will read the value of the sensor and print it continuously to the Driver Station console
- Deploy and observe how you can change the value of the sensor
- Come up with a scenario in which a feedback loop might be needed for this sensor
- Write a feedback loop and test