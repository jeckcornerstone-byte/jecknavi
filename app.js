let selectedDestination = "";
let currentPosition = "";

// 🏗️ IMPORT YOUR CAD HERE (convert plan to coordinates)
const locations = {
  entrance: { x: 0, z: 0 },

  hallway: { x: 4, z: -2 },

  ICU: { x: 8, z: -2 },
  ER: { x: 8, z: 2 },
  LAB: { x: 6, z: 4 }
};

// 🔗 PATH CONNECTIONS (LIKE GRAPH)
const graph = {
  entrance: ["hallway"],
  hallway: ["ICU", "ER", "LAB"],
  ICU: [],
  ER: [],
  LAB: []
};

// 🎯 Set destination
function setDestination(dest) {
  selectedDestination = dest;
}

// 🧠 PATHFINDING (BFS)
function findPath(start, end) {
  let queue = [[start]];
  let visited = new Set();

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1];

    if (node === end) return path;

    visited.add(node);

    graph[node].forEach(next => {
      if (!visited.has(next)) {
        queue.push([...path, next]);
      }
    });
  }

  return null;
}

// 🧭 UPDATE ARROW
function updateArrow() {
  if (!selectedDestination || !currentPosition) return;

  const path = findPath(currentPosition, selectedDestination);
  if (!path || path.length < 2) return;

  const nextStep = path[1];

  const current = locations[currentPosition];
  const target = locations[nextStep];

  const dx = target.x - current.x;
  const dz = target.z - current.z;

  const angle = Math.atan2(dx, -dz) * (180 / Math.PI);

  const arrow = document.getElementById("arrow");
  const label = document.getElementById("label");

  arrow.innerHTML = `
    <a-cone color="green" height="0.7" radius-bottom="0.25"></a-cone>
  `;

  arrow.setAttribute("position", "0 0.5 0");
  arrow.setAttribute("rotation", `0 ${angle} 0`);

  label.setAttribute("value", `Next: ${nextStep}`);
}

// 📡 DETECT MARKERS
window.onload = () => {
  document.querySelectorAll("a-marker").forEach(marker => {
    marker.addEventListener("markerFound", () => {
      currentPosition = marker.getAttribute("id");
      console.log("You are at:", currentPosition);

      updateArrow();
    });
  });
};
