let selectedDestination="ICU"; 
window.onload=()=
document.querySelector("a-marker").addEventListener("markerFound",()=
let arrow=document.getElementById("arrow"); 
arrow.innerHTML='<a-cone color="green" height="0.7"></a-cone>'; 
arrow.setAttribute("rotation","0 45 0"); 
}); 
}; 
