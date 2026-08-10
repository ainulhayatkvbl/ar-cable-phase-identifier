import * as THREE from "three";

import {
    MindARThree
} from "mindar-image-three";


// ======================================================
// D-03
// Cable End A — MindAR Image Tracking
// ======================================================


const container =
    document.querySelector(
        "#ar-container"
    );

const startButton =
    document.querySelector(
        "#startButton"
    );

const statusText =
    document.querySelector(
        "#status"
    );


// ======================================================
// MindAR
// ======================================================

const mindarThree =
    new MindARThree({

        container: container,

        imageTargetSrc:
            "./targets/cable-end-a.mind"

    });


const {
    renderer,
    scene,
    camera
} = mindarThree;


// ======================================================
// Lighting
// ======================================================

const hemisphereLight =
    new THREE.HemisphereLight(
        0xffffff,
        0x444444,
        2.2
    );

scene.add(
    hemisphereLight
);


const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        2.5
    );

directionalLight.position.set(
    -2,
    3,
    4
);

scene.add(
    directionalLight
);


// ======================================================
// AR Anchor
// ======================================================

// 0 = first image inside cable-end-a.mind

const anchor =
    mindarThree.addAnchor(0);


// Everything making up the cable
// goes inside this group.

const cableGroup =
    new THREE.Group();


// ======================================================
// Helper function
// ======================================================

function createHorizontalCylinder(
    radius,
    length,
    color,
    xPosition,
    openEnded = false,
    metalness = 0
) {

    const geometry =
        new THREE.CylinderGeometry(
            radius,
            radius,
            length,
            32,
            1,
            openEnded
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: color,

            roughness: 0.65,

            metalness: metalness

        });


    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );


    // Cylinder normally runs along Y.
    // Rotate it along X.

    mesh.rotation.z =
        Math.PI / 2;


    mesh.position.x =
        xPosition;


    return mesh;
}


// ======================================================
// Outer cable jacket
// ======================================================

const outerJacket =
    createHorizontalCylinder(
        0.095,
        0.48,
        0x111111,
        0.18,
        true
    );

cableGroup.add(
    outerJacket
);


// ======================================================
// Bedding
// ======================================================

const bedding =
    createHorizontalCylinder(
        0.067,
        0.64,
        0xd9c9a3,
        0.10,
        true
    );

cableGroup.add(
    bedding
);


// ======================================================
// Steel Wire Armour
// ======================================================

const ARMOUR_WIRES =
    24;

const armourRadius =
    0.079;


for (
    let i = 0;
    i < ARMOUR_WIRES;
    i++
) {

    const angle =
        (
            i /
            ARMOUR_WIRES
        )
        *
        Math.PI
        *
        2;


    const armourWire =
        createHorizontalCylinder(
            0.005,
            0.56,
            0x888888,
            0.14,
            false,
            0.85
        );


    armourWire.position.y =
        Math.cos(angle)
        *
        armourRadius;


    armourWire.position.z =
        Math.sin(angle)
        *
        armourRadius;


    cableGroup.add(
        armourWire
    );
}


// ======================================================
// Four cable cores
// ======================================================

const corePositions = [

    {
        color: 0xcc2222,
        y: 0.030,
        z: 0.030
    },

    {
        color: 0xe0c000,
        y: 0.030,
        z: -0.030
    },

    {
        color: 0x2255cc,
        y: -0.030,
        z: 0.030
    },

    {
        color: 0x222222,
        y: -0.030,
        z: -0.030
    }

];


for (
    const core
    of corePositions
) {

    // Core insulation

    const insulation =
        createHorizontalCylinder(
            0.018,
            0.88,
            core.color,
            -0.02
        );


    insulation.position.y =
        core.y;

    insulation.position.z =
        core.z;


    cableGroup.add(
        insulation
    );


    // Exposed copper

    const copper =
        createHorizontalCylinder(
            0.010,
            0.10,
            0xb87333,
            -0.51,
            false,
            0.8
        );


    copper.position.y =
        core.y;

    copper.position.z =
        core.z;


    cableGroup.add(
        copper
    );
}


// ======================================================
// Position cable above tracking sheet
// ======================================================

cableGroup.position.set(
    0,
    -0.05,
    0.12
);


// Slight rotation makes it look more natural.

cableGroup.rotation.z =
    -0.10;


// Attach cable to physical tracking target.

anchor.group.add(
    cableGroup
);


// ======================================================
// Tracking events
// ======================================================

anchor.onTargetFound =
    () => {

        statusText.textContent =
            "Cable End A detected";

    };


anchor.onTargetLost =
    () => {

        statusText.textContent =
            "Point camera at Cable End A sheet";

    };


// ======================================================
// Start AR
// ======================================================

startButton.addEventListener(
    "click",

    async () => {

        startButton.disabled =
            true;


        statusText.textContent =
            "Starting camera...";


        try {

            await mindarThree.start();


            startButton.style.display =
                "none";


            statusText.textContent =
                "Point camera at Cable End A sheet";


            renderer.setAnimationLoop(
                () => {

                    renderer.render(
                        scene,
                        camera
                    );

                }
            );

        }

        catch (error) {

            console.error(
                error
            );


            statusText.textContent =
                "Camera could not start. Check camera permission.";


            startButton.disabled =
                false;

        }

    }
);