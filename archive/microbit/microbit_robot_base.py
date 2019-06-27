from microbit import *
import music

def clamp(n, minimum, maximum):
    return max(minimum, min(n, maximum))

class Motor:
    def __init__(self, dir_pin, pwm_pin, reverse=False):
        self.dir_pin = dir_pin
        self.pwm_pin = pwm_pin
        self.reverse = -1 if reverse else 1

    def run(self, speed):
        speed = clamp(self.reverse * speed, -1023, 1023)
        self.pwm_pin.write_analog(0)
        if speed == 0:
            self.dir_pin.write_digital(0)
            self.pwm_pin.write_analog(0)
        elif speed > 0:
            self.dir_pin.write_digital(1)
            self.pwm_pin.write_analog(1023 - speed)
        elif speed < 0:
            self.dir_pin.write_digital(0)
            self.pwm_pin.write_analog(abs(speed))


right_motor = Motor(pin8, pin1, reverse = True)
left_motor = Motor(pin12, pin2, reverse = True)

# put your code here!
