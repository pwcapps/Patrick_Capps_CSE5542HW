For this assignment I did the Bezier patch.

The Bezier patch is created in WebGL using the three.js library.

A mesh of the control points and the actual Bezier surface are both generated
using three.js BufferGeometry. Control points are randomized and points on the
Bezier surface are calculated by the evalBSurface and evalBCurve functions.
Indices for the BufferGeometry are calculated in init().

TrackballControls from three.js are added to rotate the camera around the surface.
