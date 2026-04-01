let selectedDestination = "";
let currentPosition = "entrance";

const locations = {
  entrance: { x: 0, z: 0 },
  ICU: { x: 6, z: -2 },
  ER: { x: 5, z: 3 },
  LAB: { x: -4, z: 2 }
};

window.onload = () => {

  window.setDestination = function(dest) {
    selectedDestination = dest;
    console.log("Selected:", dest);
    updateArrow();
  };

  function updateArrow() {
    if (!selectedDestination) return;

    const current = locations[currentPosition];
    const target = locations[selectedDestination];

    const dx = target.x - current.x;
    const dz = target.z - current.z;

    const angle = Math.atan2(dx, -dz) * (180 / Math.PI);

    const arrow = document.getElementById("arrow");
    const label = document.getElementById("label");

    if (!arrow) return;

    arrow.setAttribute("rotation", `0 ${angle} 0`);

    arrow.setAttribute("animation", `
      property: scale;
      to: 1.2 1.2 1.2;
      dir: alternate;
      dur: 800;
      loop: true
    `);

    label.setAttribute("value", "Go to " + selectedDestination);
  }

  const marker = document.querySelector("#entrance");

  marker.addEventListener("markerFound", () => {
    console.log("Marker detected");
    updateArrow();
  });

};
