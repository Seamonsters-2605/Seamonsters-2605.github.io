# PID Controllers

[PID Controller on Wikipedia](https://en.wikipedia.org/wiki/PID_controller)

- **P**: "Proportional" to current error
    - The farther away the motor is from its target, the faster it will move to reach it.
    - Must be nonzero for motor to move at all. Common values range anywhere from 1 to 30, but start small (like 0.1).
- **I**: "Integral," accumulation of past errors
    - If the motor isn't reaching its target position, over time it will try harder.
    - Start with zero and only add if there are problems. Use *small* values (like 0.0001).
- **D**: "Derivative," predicting future trend of error
    - As the motor approaches its target it will slow down.
    - Common values are around 3.
