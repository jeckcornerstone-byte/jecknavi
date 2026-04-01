const routes = {
  ER: { text: "Go to Emergency Room", rotation: "40 0 -3" },
  ICU: { next: [], pos:{x:2,y:0,z:-3}, label:"ICU Room" },
  LAB: { text: "Go to Laboratory", rotation: "0 -90 0" }
};

function setDestination(dest) {
  const arrow = document.getElementById("arrow");
  const label = document.getElementById("label");

  if (!routes[dest]) return;

  arrow.innerHTML = '<a-cone radius-bottom="0.1" height="0.5" color="green"></a-cone>';
  arrow.setAttribute("rotation", routes[dest].rotation);

  label.setAttribute("value", routes[dest].text);
}
