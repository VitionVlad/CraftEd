export function getvol(){
    return document.getElementById("volume").value;
}

export function getfov(){
    return document.getElementById("fovs").value;
}

export function getsres(){
    return document.getElementById("sres").value;
}

export function getrscale(){
    return document.getElementById("rscale").value;
}

export function get_mouse_lock(){
    return document.pointerLockElement !== null;
}

export function get_elem_ch(id){
    return document.getElementById(id).checked;
}