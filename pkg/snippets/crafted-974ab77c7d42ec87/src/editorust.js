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

export function startlvl(){
    let t = sap;
    sap = false;
    return t;
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
                    let tch = objs[i].ch;
                    objs[i].ch = false;
                    return Number(tch);
                case 6:
                    return Number(objs[i].render);
                case 7:
                    return Number(objs[i].deleted);
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
                case 4:
                    return Number(lts[i].deleted);
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
                    return Number(spks[i].audio.replace("spk", ""));
                case 5:
                    return Number(spks[i].ch);
                case 6:
                    return Number(spks[i].deleted);
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
                case 3:
                    return Number(mats[i].ao.replace("tex", ""));
                case 4:
                    return Number(mats[i].normal.replace("tex", ""));
                case 5:
                    return Number(mats[i].lnk == -1);
            }
            break;
    }
    return 0;
}

export function set_cam_pos(posx, posy, posz, rotx, roty, rotz){
    cam[0] = posx;
    cam[1] = posy;
    cam[2] = posz;
    cam[3] = rotx;
    cam[4] = roty;
    cam[5] = rotz;
}