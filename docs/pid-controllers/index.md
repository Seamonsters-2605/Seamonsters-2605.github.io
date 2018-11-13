# PID Controllers

[PID Controller on Wikipedia](https://en.wikipedia.org/wiki/PID_controller)

- **P**: "Proportional" to current error
    - The farther away the motor is from its target, the faster it will move to reach it.
- **I**: "Integral," accumulation of past errors
    - If the motor isn't reaching its target position, over time it will try harder.
    - Use *small* values! (start with around 0.0001)
- **D**: "Derivative," predicting future trend of error
    - As the motor approaches its target it will slow down.
