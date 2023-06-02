# Get Started:
```
npm start
```

```
npm test
```

# The Elevator Challenge:

Consider the problem of programming an elevator in a ten floor building with a single elevator. Each floor has two buttons to call the elevator to the floor to take you up or down.
Write code to implement the following:

* User interactions from outside the elevator (pressing up/down buttons)
* User interactions from within the elevator (pressing a button for a floor)
* The elevator moving up and down in response to user actions

We’ll have you walk through your code and the underlying assumptions you made as well as a couple of test scenarios. Time permitting, we will discuss how you would alter your approach as new requirements or constraints are added, such as multiple cars, express elevators, service floors, etc.

We value simple, working code over a partially-implemented, complex solution.

## Additional Assumptions

These are meant to simplify the design, but we may change some of these in the session.

* Start with 1 Elevator
* 10 Floors in the building
* Simplify time to units “T”. In a single unit of time, the elevator can travel one floor (up or down). You can assume instant acceleration/deceleration/direction change/etc.. T0 denotes time 0, T1 denotes 1 unit of time later.
* To demonstrate your solution, be prepared to walk us through the first use case of:
    - Elevator is at the lobby (floor 1)
    - At T0, down button is pressed on floor 3 with a passenger wanting to go to 2
    - At T1, down button is pressed on floor 10 with a passenger wanting to go to the lobby



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
