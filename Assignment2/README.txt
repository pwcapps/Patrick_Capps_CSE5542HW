CSE 5542 Assignment 2 by Patrick Capps

This assignment renders a dual view scene of the bot created in assignment 1 in
an infinite scene. The three.js library is used to render the scene with WebGL.
The stereo effects and multiple views three.js examples were used as a starting
point.

Dual views are created by generating two slightly separated cameras with pre-defined attributes.
Mouse interaction is achieved with the three.js TrackballControls module. Mouse
controls are left click and drag to rotate, right click and drag to pan, and
scroll wheel to zoom in and out.

The infinite scene affect is achieved with three.js exponential fog and by moving
the ground plane with the camera.
