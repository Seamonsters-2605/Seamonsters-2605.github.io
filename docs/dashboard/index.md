# Making a Dashboard with REMI

We will be using the [remi library](https://buildmedia.readthedocs.org/media/pdf/remi/latest/remi.pdf) to make a simple webpage that runs on the robot and has buttons to make the robot move forward and stop moving.

- Make sure you have the remi library installed (this should be done if you followed the [Setup Instructions](../setup))

- Open Command Prompt and type in these commands:
```
cd Documents
git clone https://github.com/Seamonsters-2605/practice-dashboard
```
>This will navigate to your Documents folder and clone the [practice-dashboard](https://github.com/Seamonsters-2605/practice-dashboard) repository on to your computer from GitHub.

- Open the repository in VSCode and find the file called `dashboard.py` (it should be an empty file) and write this code. *Please don't copy and paste, it will not help you learn*

``` python
import remi.gui as gui
import seamonsters as sea

class PracticeDashboard(sea.Dashboard):

    def main(self, robot, appCallback):

        root = gui.VBox(gui.Label("Drive Controls"), width = 600, margin = "0px auto")  

        driveBox = gui.VBox()
        root.append(driveBox)

        driveForwardButton = gui.Button("Drive Forward")
        driveForwardButton.set_on_click_listener(robot.c_driveForward)
        driveBox.append(driveForwardButton)

        stopButton = gui.Button("Stop")
        stopButton.set_on_click_listener(robot.c_stop)
        driveBox.append(stopButton)

        appCallback(self)
        return root
```

## Explaination

```python
import remi.gui as gui
import seamonsters as sea
```
This tells the python interpreter that you are going to use the `remi.gui` library and the `seamonsters` library in your code. To refrence those libraries in the code, you would write `gui` or `sea` because that is what it is imported *as*.

```python
class PracticeDashboard(sea.Dashboard):
```
This is creating the dashboard *class* that holds all of the buttons and widgets of the dashboard. The `sea.Dashboard` inside of the parenthesis is the class that you are using as a template for your code.
```python
def main(self, robot, appCallback):
```
This defines the *function* `main()` that all dashboard classes need to have. It takes in three *arguments* (the things in the parenthesis)
- All functions in classes need to have a `self` perameter. `self` refrences the `PracticeDashboard` class.
- `robot` is the robot that the dashboard is attached to.
- `appCallback` is the function called after `main` is done running. (You don't need to worry about this one)

```python
root = gui.VBox(gui.Label("Drive Controls"), width = 600, margin = "0px auto")
```
This declares the root widget to be returned later, adds a label to it, and modifies some of the html properties of it. 

The `VBox` and `HBox` are containers that can have other widgets in them. Widgets contained in a `VBox` are alligned vertically and the ones in an `HBox` are alligned horizontally ("V" for vertical and "H" for horizontal).
```python
driveBox = gui.VBox()
root.append(driveBox)
```
This creates a new `VBox` and adds it too the root widget by using the `append` function
```python
driveForwardButton = gui.Button("Drive Forward")
driveForwardButton.set_on_click_listener(robot.c_driveForward)     driveBox.append(driveForwardButton)
```
- The first line creates a new `Button` that says "Drive Forward" on it
- The second line adds an event to be called when the button is pressed. `c_driveForward` is a function of the robot that the dashboard is attached to. 
- The third line adds the button to the `driveBox` that was created earlier.

```python
stopButton = gui.Button("Stop")
stopButton.set_on_click_listener(robot.c_stop)
driveBox.append(stopButton)
```
Here, another button is created. This one says "Stop" on it and calls a different function on the robot when it is pressed (`c_stop`). The button is added to the `driveBox`.
```python
appCallback(self)
return root
```
`appCallback(self)` tells the computer that the dashboard was initialized and adds it to the robot. `return root` gives the robot the full GUI that was put together within the `main` function.
# Setting up the Dashboard on the Robot
Open up `robot.py`, we are going to take a look at how the robot creates and manages the dashboard and its callbacks.
```python
import dashboard
```
This is found right at the top of `robot.py` and it allows the code we wrote in `dashboard.py` to be used in this file.
```python 
self.app = None
sea.startDashboard(self, dashboard.PracticeDashboard)
```
This is found at the end of `robotInit`. First it declares `self.app` which is the dashboard and sets it to `None`. Then `startDashboard` starts the `PracticeDashboard` we wrote in `dashboard.py` and attaches it to the robot.
```python
def teleop(self):
    yield from self.updateDashboardGenerator()
```
```python
def updateDashboardGenerator(self):
    if self.app is not None:
        self.app.clearEvents()
    while True:
        v = None
        if self.app is not None:
            v = self.app.doEvents()
        yield v
```
`teleop` starts `updateDashboardGenerator` which goes through the events queued by the dashboard and executes them. Since `updateDashboardGenerator` has a `yield` in it, it is a generator. If you wanted to run a second generator at the same time (like if you wanted to be able to drive the robot manually) you would use `sea.parallel()` in `telop` and it will run all the generators inputted at the same time.
```python
@sea.queuedDashboardEvent
def c_driveForward(self, button):
    self.drivetrain.drive(16, math.pi/2, 0)

@sea.queuedDashboardEvent
def c_stop(self, button):
    self.drivetrain.drive(0,0,0)
```
These are the two functions called when buttons are pressed because they were set as the callback when the buttons were defined in the dashboard. `@sea.queuedDashboardEvent` adds the function to the dashboard event queue when it is called. Then it runs when the dashboard is updated (as described above).