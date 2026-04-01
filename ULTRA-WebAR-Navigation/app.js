
const container = document.querySelector("#path-container")

fetch("map/path.json")
.then(res => res.json())
.then(points => {

points.forEach((p,i)=>{

let arrow = document.createElement("a-cone")

arrow.setAttribute("position", `${p.x} 0 ${p.z}`)
arrow.setAttribute("radius-bottom", "0.25")
arrow.setAttribute("radius-top", "0")
arrow.setAttribute("height", "0.5")

arrow.setAttribute("material", `
color:#00FFFF;
emissive:#00FFFF;
emissiveIntensity:3
`)

arrow.setAttribute("animation",`
property: rotation;
to: 0 360 0;
loop: true;
dur: 2000
`)

container.appendChild(arrow)

})

})
