VERTICAL CABLE + MULTIMETER LEAD UPGRADE

Replace:
- d04-end-a.html
- d05-end-b.html

Keep:
- cable-config.js
- targets/cable-end-a.mind
- targets/cable-end-b.mind

What changed:
1. Both cable ends now stand vertically out of the marker plane ("ground").
2. Cable geometry is approximately double the previous size.
3. End A resistance box stays separate from the cable.
4. End B now includes a separate 3D multimeter.
5. Black multimeter lead is always connected to the cable armour.
6. Pressing MEASURE CORE 1/2/3 moves the red lead to that core.
7. Existing saved assignments and Set 3 Core 2 OL/open-circuit logic are unchanged.

Recommended first test:
d04-end-a.html?set=1

Then press PROCEED TO END B and verify:
- black lead stays on armour
- red lead moves Core 1 -> Core 2 -> Core 3
- readings match End A assignment

Then test:
d04-end-a.html?set=3
Core 2 should still display OL.
