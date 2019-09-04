```python
    def autonomous(self):
        turnList = [-1,1,1,-1,-1,1,1]
        for turnDir in turnList:
            self.driveASection()
            self.turn(turnDir)
        yield from self.stop()

    def turn(self, speed):
        self.drivetrain.drive(5, math.pi/2, math.radians(300) * speed)
        yield from sea.wait(93)

    def stop(self):
        yield self.drivetrain.drive(0,0,0)

    def driveASection(self):
        self.drivetrain.drive(16, math.pi/2, 0)
        yield from sea.wait(188)
```