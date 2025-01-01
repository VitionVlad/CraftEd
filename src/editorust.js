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

export function get_val(g, i, f, p){
    switch(g){
        case 0:
            switch(f){
                case 0:
                    return pointer.pos[p];
                case 1:
                    return pointer.rot[p];
                case 2:
                    return pointer.scale[p];
            }
            break;
        case 1:
            if(i < 0){
                return objs.length;
            }
            switch(f){
                case 0:
                    return objs[i].pos[p];
                case 1:
                    return objs[i].rot[p];
                case 2:
                    return objs[i].scale[p];
                case 3:
                    return Number(objs[i].model.replace("md", ""));
                case 4:
                    return Number(objs[i].material);
                case 5:
                    return Number(objs[i].ch);
            }
            break;
        case 2:
            if(i < 0){
                return lts.length;
            }
            switch(f){
                case 0:
                    return lts[i].pos[p];
                case 1:
                    return lts[i].rot[p];
                case 2:
                    return lts[i].color[p];
                case 3:
                    return Number(lts[i].ch);
            }
            break;
        case 4:
            if(i < 0){
                return spks.length;
            }
            switch(f){
                case 0:
                    return spks[i].pos[p];
                case 1:
                    return spks[i].power;
                case 2:
                    return spks[i].volume;
                case 4:
                    return Number(lts[i].audio.replace("spk", ""));
            }
            break;
        case 5:
            if(i < 0){
                return mats.length;
            }
            switch(f){
                case 0:
                    return Number(mats[i].albedo.replace("tex", ""));
                case 1:
                    return Number(mats[i].roughness.replace("tex", ""));
                case 2:
                    return Number(mats[i].metalic.replace("tex", ""));
                case 4:
                    return Number(mats[i].ao.replace("tex", ""));
                case 5:
                    return Number(mats[i].normal.replace("tex", ""));
            }
            break;
    }
    return 0;
}