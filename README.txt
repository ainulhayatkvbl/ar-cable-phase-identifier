AR Cable Phase Identifier — Locked Architecture

Files in this package:
- cable-config.js
- d04-end-a.html
- d05-end-b.html

You must already have:
targets/cable-end-a.mind

You still need to create:
targets/cable-end-b.mind

Final folder structure:

ar-cable-phase-identifier/
├── cable-config.js
├── d04-end-a.html
├── d05-end-b.html
└── targets/
    ├── cable-end-a.mind
    └── cable-end-b.mind

Cable behaviour:
- Set 1: Healthy
- Set 2: Healthy
- Set 3: Core 2 open circuit

URLs:
d04-end-a.html?set=1
d04-end-a.html?set=2
d04-end-a.html?set=3

End B:
d05-end-b.html?set=1
d05-end-b.html?set=2
d05-end-b.html?set=3

End A saves each cable set independently in localStorage.
End B loads the matching set.
For Set 3, Core 2 returns OL.
