let selectedDestination = "";

// Define marker graph
const markers = {
  entrance: { next: ["hallway1"], pos:{x:0,y:0,z:0}, label:"Entrance" },
  hallway1: { next: ["ICU","ER","LAB"], pos:{x:2,y:0,z:-2}, label:"Hallway 1" },
  ICU: { next: [], pos:{x:4,y:0,z:-2}, label:"ICU Room" },
  ER: { next: [], pos:{x:4,y:0,z:0}, label:"Emergency Room" },
  LAB: { next: [], pos:{x:4,y:0,z:2}, label:"Laboratory" }
};

// Set destination
function setDestination(dest) { selectedDestination = dest; }

// Find shortest path using BFS
function findPath(start, end) {
  let queue = [[start]];
  let visited = new Set();
  while(queue.length) {
    let path = queue.shift();
    let node = path[path.length-1];
    if(node === end) return path;
    visited.add(node);
    markers[node].next.forEach(n => {
      if(!visited.has(n)) queue.push([...path,n]);
    });
  }
  return null;
}

// Show arrow toward next step
function showNextStep(current) {
  if(!selectedDestination) return;
  const path = findPath(current, selectedDestination);
  if(!path) return;
  const nextMarker = path[1]; // next step
  const arrow = document.getElementById("arrow");
  const label = document.getElementById("label");

  // Position arrow relative to current marker
  const pos = markers[nextMarker].pos;
  arrow.setAttribute("position", `${pos.x} ${pos.y} ${pos.z}`);

  // Rotate arrow toward destination
  const dx = pos.x - markers[current].pos.x;
  const dz = pos.z - markers[current].pos.z;
  const angle = Math.atan2(dx, -dz) * (180/Math.PI);
  arrow.setAttribute("rotation", `0 ${angle} 0`);

  label.setAttribute("value", `Next: ${markers[nextMarker].label}`);
}

// Listen for marker scan
document.querySelectorAll("a-marker").forEach(marker => {
  marker.addEventListener("markerFound", () => {
    const current = marker.getAttribute("id");
    showNextStep(current);
  });
});