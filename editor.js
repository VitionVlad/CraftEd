
class JMaterial{
    constructor(albedo, roughness, metalic, ao, normal, label){
        this.albedo = albedo;
        this.roughness = roughness;
        this.metalic = metalic;
        this.ao = ao;
        this.normal = normal;
        this.label = label;
    }
}

class JObject{
    constructor(xp, yp, zp, xr, yr, zr, xs, ys, zs, label, model, material){
        this.pos = [xp, yp, zp];
        this.rot = [xr, yr, zr];
        this.scale = [xs, ys, zs];
        this.label = label;
        this.model = model;
        this.material = material;
        this.ch = true;
        this.render = true;
    }
}

class JLight{
    constructor(xp, yp, zp, xr, yr, zr, r, g, b, label){
        this.pos = [xp, yp, zp];
        this.rot = [xr, yr, zr];
        this.color = [r, g, b];
        this.label = label;
        this.ch = true;
    }
}

class JAudio{
    constructor(xp, yp, zp, power, volume, label, audio){
        this.pos = [xp, yp, zp];
        this.power = power;
        this.volume = volume;
        this.label = label;
        this.audio = audio;
        this.ch = true;
    }
}

class JPointer{
    constructor(xp, yp, zp, xr, yr, zr, xs, ys, zs){
        this.pos = [xp, yp, zp];
        this.rot = [xr, yr, zr];
        this.scale = [xs, ys, zs];
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

var htmlcont = `
<DOCTYPE html>
    <head>
        <style>
        *{
            display: none;
        }
        </style>
    </head>
    <body>
`;

var model_lb = [];

var tex_lb = [];

var audio_lb = [];

var mats = [];

var ch = [true, true, true, true, true];

var mif = ["", "", "", "", ""];

var objs = [];

var lts = [ new JLight(0, 0, 0, 0, 0, 0, 1, 1, 1, "Light0") ];

var spks = [];

var selected = -1;

var pointer = new JPointer(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0);

var cam = [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];

var edopen = false;

var hideed = true;

document.getElementById("open_editor").addEventListener("click", () => {
    edopen = true;
    document.getElementById("list_div").style.display = "initial";
    document.getElementById("file_div").style.display = "initial";
    document.getElementById("obj_div").style.display = "initial";
    document.getElementById("assets_div").style.display = "initial";
    document.getElementById("settings_div").style.display = "initial";
    document.getElementById("start_div").style.display = "none";
    hideed = false;
});

document.getElementById("player_mode").addEventListener("click", () => {
    edopen = true;
    document.getElementById("start_div").style.display = "none";
    hideed = true;
});

document.getElementById("render").addEventListener("click", () => {
    if(edopen){
        document.getElementById('render').requestPointerLock();
    }
});

var input = document.createElement('input');
input.type = 'file';
input.accept = ".txt";
input.style.display = "none";

input.onchange = e => { 
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
        var objn = 0;
        var audn = 0;
        var ltn = 0;
        var matnm = 0;
        var modeltext = reader.result;
        var st = modeltext.split('\n').join(' ').split(' ');
        console.log("SDFLoader: SepSceneSize="+ st.length);
        for(var i = 0; i != st.length; i+=1){
            if(st[i] == "md"){ 
                console.log("SDFLoader: found model mesh at index ="+ i);
                let mid = st[i+2];
                let xp = parseFloat(st[i+3]);
                let yp = parseFloat(st[i+4]);
                let zp = parseFloat(st[i+5]);
                let xr = parseFloat(st[i+6]);
                let yr = parseFloat(st[i+7]);
                let zr = parseFloat(st[i+8]);
                let xs = parseFloat(st[i+9]);
                let ys = parseFloat(st[i+10]);
                let zs = parseFloat(st[i+11]);
                objs.push(new JObject(xp, yp, zp, xr, yr, zr, xs, ys, zs, "Object" + objn, "md"+mid, objn));
                objn += 1;
            }
            if(st[i] == "cs"){ 
                console.log("SDFLoader: found cube mesh at index ="+ i);
                let xp = parseFloat(st[i+2]);
                let yp = parseFloat(st[i+3]);
                let zp = parseFloat(st[i+4]);
                let xr = parseFloat(st[i+5]);
                let yr = parseFloat(st[i+6]);
                let zr = parseFloat(st[i+7]);
                let xs = parseFloat(st[i+8]);
                let ys = parseFloat(st[i+9]);
                let zs = parseFloat(st[i+10]);
                objs.push(new JObject(xp, yp, zp, xr, yr, zr, xs, ys, zs, "Object" + objn, "-1", objn));
                objn += 1;
            }
            if(st[i] == "cu"){ 
                console.log("SDFLoader: found cubeuv mesh at index ="+ i);
                let xp = parseFloat(st[i+2]);
                let yp = parseFloat(st[i+3]);
                let zp = parseFloat(st[i+4]);
                let xr = parseFloat(st[i+5]);
                let yr = parseFloat(st[i+6]);
                let zr = parseFloat(st[i+7]);
                let xs = parseFloat(st[i+8]);
                let ys = parseFloat(st[i+9]);
                let zs = parseFloat(st[i+10]);
                objs.push(new JObject(xp, yp, zp, xr, yr, zr, xs, ys, zs, "Object" + objn, "-2", objn));
                objn += 1;
            }
            if(st[i] == "pl"){ 
                let xp = parseFloat(st[i+2]);
                let yp = parseFloat(st[i+3]);
                let zp = parseFloat(st[i+4]);
                let xr = parseFloat(st[i+5]);
                let yr = parseFloat(st[i+6]);
                let zr = parseFloat(st[i+7]);
                let xs = parseFloat(st[i+8]);
                let ys = parseFloat(st[i+9]);
                let zs = parseFloat(st[i+10]);
                objs.push(new JObject(xp, yp, zp, xr, yr, zr, xs, ys, zs, "Object" + objn, "-3", objn));
                objn += 1;
                console.log("SDFLoader: found plane mesh at index ="+ i);
            }
            if(st[i] == "lt"){ 
                let xp = parseFloat(st[i+2]);
                let yp = parseFloat(st[i+3]);
                let zp = parseFloat(st[i+4]);
                let xr = parseFloat(st[i+5]);
                let yr = parseFloat(st[i+6]);
                let zr = parseFloat(st[i+7]);
                let xs = parseFloat(st[i+8]);
                let ys = parseFloat(st[i+9]);
                let zs = parseFloat(st[i+10]);
                lts.push(new JLight(xp, yp, zp, xr, yr, zr, xs, ys, zs, "Light" + ltn));
                ltn += 1;
                console.log("SDFLoader: found light at index ="+ i);
            }
            if(st[i] == "sp"){ 
                let aid = parseFloat(st[i+1]);
                let pw = parseFloat(st[i+2]);
                let wl = parseFloat(st[i+3]);
                let xp = parseFloat(st[i+5]);
                let yp = parseFloat(st[i+6]);
                let zp = parseFloat(st[i+7]);
                spks.push(new JAudio(xp, yp, zp, pw, wl, "Speaker"+audn, "spk"+aid));
                audn += 1;
                console.log("SDFLoader: found speaker at index ="+ i);
            }
            if(st[i] == "mat"){ 
                console.log("SDFLoader: found material at index ="+ i);
                mats.push(new JMaterial("tex"+st[i+6], "tex"+st[i+7], "tex"+st[i+8], "tex"+st[i+9], "tex"+st[i+10], "mat"+matnm));
                matnm += 1;
            }
        }
        ch = [true, true, true, true, true];
    }
}

document.getElementById("load").addEventListener("click", () => {
    input.click();
});

document.getElementById("import_sdf").addEventListener("click", () => {
    input.click();
});

document.getElementById("alb_btn").addEventListener("click", () => {
    mif[0] = document.getElementById("lst_img").value;
});

document.getElementById("rough_btn").addEventListener("click", () => {
    mif[1] = document.getElementById("lst_img").value;
});

document.getElementById("met_btn").addEventListener("click", () => {
    mif[2] = document.getElementById("lst_img").value;
});

document.getElementById("ao_btn").addEventListener("click", () => {
    mif[3] = document.getElementById("lst_img").value;
});

document.getElementById("norm_btn").addEventListener("click", () => {
    mif[4] = document.getElementById("lst_img").value;
});

document.getElementById("crt").addEventListener("click", () => {
    var label = document.getElementById("mt_label").value;
    if(label == ""){
        label = "mat"+mats.length;
    }
    mats.push(new JMaterial(mif[0], mif[1], mif[2], mif[3], mif[4], label));
    ch[3] = true;
});

document.getElementById("create").addEventListener("click", () => {
    var label = document.getElementById("obj_label").value;
    var pos = [document.getElementById("posx").value, document.getElementById("posy").value, document.getElementById("posz").value];
    var rot = [document.getElementById("rotx").value, document.getElementById("roty").value, document.getElementById("rotz").value];
    var scale = [document.getElementById("scalex").value, document.getElementById("scaley").value, document.getElementById("scalez").value];
    
    var cb = false;

    const sp = document.getElementById("lst_mdn").value.split("");
    if(document.getElementById("lst_mdn").value == "-4" || document.getElementById("lst_mdn").value == "-5"){
        if(label == ""){
            label = "Light"+lts.length;
        }
        if(document.getElementById("uppch").checked){
            pos[0] = cam[0];
            pos[1] = cam[1];
            pos[2] = cam[2];
            rot[0] = cam[3];
            rot[1] = cam[4];
            rot[2] = cam[5];
            document.getElementById("posx").value = cam[0];
            document.getElementById("posy").value = cam[1];
            document.getElementById("posz").value = cam[2];
            document.getElementById("rotx").value = cam[3];
            document.getElementById("roty").value = cam[4];
            document.getElementById("rotz").value = cam[5];
        }
        lts.push(new JLight(Number(pos[0]), Number(pos[1]), Number(pos[2]), Number(rot[0]), Number(rot[1]), Number(rot[2]), Number(scale[0]), Number(scale[1]), Number(scale[2]), label));
        cb = true;
    }
    if(sp.length > 3 && cb == false){
        if(sp[0] == "s" && sp[1] == "p" && sp[2] == "k"){
            if(label == ""){
                label = "Speaker"+spks.length;
            }
            spks.push(new JAudio(Number(pos[0]), Number(pos[1]), Number(pos[2]), Number(rot[1]), Number(scale[1]), label, document.getElementById("lst_mdn").value));
            cb = true;
        }
    }
    if(cb == false){
        if(label == ""){
            label = "Object"+objs.length;
        }
        if(document.getElementById("lst_mts").value != ""){
            console.log(mats[Number(document.getElementById("lst_mts").value)].albedo + " " + mats[Number(document.getElementById("lst_mts").value)].roughness + " " + mats[Number(document.getElementById("lst_mts").value)].metalic + " " + mats[Number(document.getElementById("lst_mts").value)].ao + " " + mats[Number(document.getElementById("lst_mts").value)].normal);
            objs.push(new JObject(Number(pos[0]), Number(pos[1]), Number(pos[2]), Number(rot[0]), Number(rot[1]), Number(rot[2]), Number(scale[0]), Number(scale[1]), Number(scale[2]), label, document.getElementById("lst_mdn").value, Number(document.getElementById("lst_mts").value)));
        }
    }

    ch[4] = true;
});

document.getElementById("apply").addEventListener("click", () => {
    var label = document.getElementById("obj_label").value;
    var pos = [document.getElementById("posx").value, document.getElementById("posy").value, document.getElementById("posz").value];
    var rot = [document.getElementById("rotx").value, document.getElementById("roty").value, document.getElementById("rotz").value];
    var scale = [document.getElementById("scalex").value, document.getElementById("scaley").value, document.getElementById("scalez").value];

    var nam = document.getElementById("lst").value;
    var namsep = nam;
    namsep.split("");

    if(namsep[0] == "o" && namsep[1] == "b" && namsep[2] == "j"){
        nam = Number(nam.replace("obj", ""));
        var tc = document.getElementById("lst_mdn").value.split("");
        if((tc[0] == "m" && tc[1] == "d") || tc[1] == "1" || tc[1] == "2" || tc[1] == "3"){
            if(label == ""){
                label = objs[nam].label;
            }
            objs[nam] = new JObject(Number(pos[0]), Number(pos[1]), Number(pos[2]), Number(rot[0]), Number(rot[1]), Number(rot[2]), Number(scale[0]), Number(scale[1]), Number(scale[2]), label, document.getElementById("lst_mdn").value, Number(document.getElementById("lst_mts").value));
        }else{
            alert("Types must coincide");
        }
    }else if(namsep[0] == "a" && namsep[1] == "u" && namsep[2] == "d"){
        nam = Number(nam.replace("aud", ""));
        var tc = document.getElementById("lst_mdn").value.split("");
        if(tc[0] == "s" && tc[1] == "p" && tc[2] == "k"){
            if(label == ""){
                label = spks[nam].label;
            }
            spks[nam] = new JAudio(Number(pos[0]), Number(pos[1]), Number(pos[2]), Number(rot[1]), Number(scale[1]), label, document.getElementById("lst_mdn").value);
        }else{
            alert("Types must coincide");
        }
    }else if(namsep[0] == "l" && namsep[1] == "t"){
        nam = Number(nam.replace("lt", ""));
        var tc = document.getElementById("lst_mdn").value;
        if(tc == "-4" || tc == "-5"){
            if(label == ""){
                label = lts[nam].label;
            }
            if(document.getElementById("uppch").checked){
                pos[0] = cam[0];
                pos[1] = cam[1];
                pos[2] = cam[2];
                rot[0] = cam[3];
                rot[1] = cam[4];
                rot[2] = cam[5];
                document.getElementById("posx").value = cam[0];
                document.getElementById("posy").value = cam[1];
                document.getElementById("posz").value = cam[2];
                document.getElementById("rotx").value = cam[3];
                document.getElementById("roty").value = cam[4];
                document.getElementById("rotz").value = cam[5];
            }
            lts[nam] = new JLight(Number(pos[0]), Number(pos[1]), Number(pos[2]), Number(rot[0]), Number(rot[1]), Number(rot[2]), Number(scale[0]), Number(scale[1]), Number(scale[2]), label);
        }else{
            alert("Types must coincide");
        }
    }

    ch[4] = true;
});


document.getElementById("import_md").addEventListener("click", () => {
    const elem = document.getElementById("md_sel");
    if(elem.files.length <= 0){
        alert("no files selected!");
    }else{
        for(const file of elem.files){
            const spl = file.name.split('.');
            if(spl[spl.length-1] == "txt"){
                model_lb.push(file.name);
                let arrind = model_lb.length;
                ch[0] = true;
                let reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    var md = document.createElement("p");
                    md.id = "md" + arrind;
                    md.textContent = reader.result;
                    md.style = "display: none;";
                    md.crossOrigin = "";
                    document.body.appendChild(md);
                    console.log("model by name="+file.name+" by index="+arrind+" content="+reader.result+" is loaded");
                    htmlcont += `<iframe src="models/` + model_lb[arrind-1] + `" id="` + md.id + `"></iframe>
                    `;
                }
            }
            if(spl[spl.length-1] == "png" || spl[spl.length-1] == "jpg"){
                tex_lb.push(file.name);
                let arrind = tex_lb.length;
                ch[1] = true;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var md = document.createElement("img");
                    md.id = "tex" + arrind;
                    md.src = reader.result;
                    md.style = "display: none;";
                    md.crossOrigin = "";
                    document.body.appendChild(md);
                    console.log("image by name="+file.name+" by index="+arrind+" src="+reader.result+" is loaded");
                    htmlcont += `<img src="textures/` + tex_lb[arrind-1] + `" id="` + md.id + `"></img>
                    `;
                }
            }
            if(spl[spl.length-1] == "mp3" || spl[spl.length-1] == "ogg"){
                audio_lb.push(file.name);
                let arrind = audio_lb.length;
                ch[2] = true;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var md = document.createElement("audio");
                    md.id = "spk" + arrind;
                    md.src = reader.result;
                    md.style = "display: none;";
                    md.crossOrigin = "";
                    document.body.appendChild(md);
                    console.log("audio by name="+file.name+" by index="+arrind+" src="+reader.result+" is loaded");
                    htmlcont += `<audio src="audio/` + audio_lb[arrind-1] + `" id="` + md.id + `"></audio>
                    `;
                }
            }
        }
    }
});

document.getElementById("save").addEventListener("click", () => {
    var sdf = ``;
    for(var i = 0; i != objs.length; i+=1){
        var posrotscale = objs[i].pos[0] + ` ` + objs[i].pos[1] + ` ` + objs[i].pos[2] + ` ` + objs[i].rot[0] + ` ` + objs[i].rot[1] + ` ` + objs[i].rot[2] + ` ` + objs[i].scale[0] + ` ` + objs[i].scale[1] + ` ` + objs[i].scale[2] + `
        `;
        if(objs[i].model == "-1"){
            sdf += `cs 1 ` + posrotscale;
        }else if(objs[i].model == "-2"){
            sdf += `cu 1 ` + posrotscale;
        }else if(objs[i].model == "-3"){
            sdf += `pl 1 ` + posrotscale;
        }else{
            sdf += `md 1 ` + objs[i].model.replace("md", "") + ` ` + posrotscale;
        }
        sdf += `mat 1 2 0 1 5 ` + (mats[objs[i].material].albedo.replace("tex", "")) + ` ` + (mats[objs[i].material].roughness.replace("tex", "")) + ` ` + (mats[objs[i].material].metalic.replace("tex", "")) + ` ` + (mats[objs[i].material].ao.replace("tex", "")) + ` ` + (mats[objs[i].material].normal.replace("tex", "")) + `
        `;
    }
    for(var i = 0; i != lts.length; i+=1){
        var posrotscale = lts[i].pos[0] + ` ` + lts[i].pos[1] + ` ` + lts[i].pos[2] + ` ` + lts[i].rot[0] + ` ` + lts[i].rot[1] + ` ` + lts[i].rot[2] + ` ` + lts[i].color[0] + ` ` + lts[i].color[1] + ` ` + lts[i].color[2] + `
        `;
        sdf += `lt 0 ` + posrotscale;
    }
    for(var i = 0; i != spks.length; i+=1){
        var posrotscale = spks[i].power + ` ` + spks[i].volume + ` 1 ` + spks[i].pos[0] + ` ` + spks[i].pos[1] + ` ` + spks[i].pos[2] + `
        `;
        sdf += `sp ` + Number(spks[i].audio.replace("spk", "")) + ` ` + posrotscale;
    }
    download("scene.html", htmlcont + `<iframe id="scene" src="scene.sdf.txt"></iframe></body>`);
    download("scene.sdf.txt", sdf);
});

var lastsel = "";

function lp(){
    if(ch[0] == true){
        var lst = document.getElementById("lst_md_ass");
        lst.innerHTML = "";
        for(var i = 0; i != model_lb.length; i+=1){
            lst.innerHTML += '<option value="md' + Number(i+1) + '">' + model_lb[i] + '</option>';
        }
        ch[0] = false;
    }
    if(ch[1] == true){
        var lst = document.getElementById("lst_img_ass");
        lst.innerHTML = "";
        for(var i = 0; i != tex_lb.length; i+=1){
            lst.innerHTML += '<option value="tex' + Number(i+1) + '">' + tex_lb[i] + '</option>';
        }
        ch[1] = false;
    }
    if(ch[2] == true){
        var lst = document.getElementById("lst_spk_ass");
        lst.innerHTML = "";
        for(var i = 0; i != audio_lb.length; i+=1){
            lst.innerHTML += '<option value="spk' + Number(i+1) + '">' + audio_lb[i] + '</option>';
        }
        ch[2] = false;
    }
    if(ch[3] == true){
        var lst = document.getElementById("lst_mt_ass");
        lst.innerHTML = "";
        for(var i = 0; i != mats.length; i+=1){
            lst.innerHTML += '<option value="' + i + '">' + mats[i].label + '</option>';
        }
        ch[3] = false;
    }
    document.getElementById("scale_p").innerText = "Scale";
    document.getElementById("rot").innerText = "Rotation";
    document.getElementById("renderm").style.display = "initial";
    document.getElementById("rendermlabel").style.display = "initial";
    if(document.getElementById("lst_mdn").value == "-4" || document.getElementById("lst_mdn").value == "-5"){
        document.getElementById("scale_p").innerText = "Color";
        document.getElementById("renderm").style.display = "none";
        document.getElementById("rendermlabel").style.display = "none";
    }
    document.getElementById("rotx").style.display = "initial";
    document.getElementById("rotz").style.display = "initial";
    document.getElementById("scalex").style.display = "initial";
    document.getElementById("scalez").style.display = "initial";
    document.getElementById("roty").style.width = "53px";
    document.getElementById("scaley").style.width = "53px";
    const sp = document.getElementById("lst_mdn").value.split("");
    if(sp.length > 3){
        if(sp[0] == "s" && sp[1] == "p" && sp[2] == "k"){
            document.getElementById("rot").innerText = "Power";
            document.getElementById("scale_p").innerText = "Volume";
            document.getElementById("rotx").style.display = "none";
            document.getElementById("rotz").style.display = "none";
            document.getElementById("scalex").style.display = "none";
            document.getElementById("scalez").style.display = "none";
            document.getElementById("roty").style.width = "159px";
            document.getElementById("scaley").style.width = "159px";
            document.getElementById("renderm").style.display = "none";
            document.getElementById("rendermlabel").style.display = "none";
        }
    }
    if(ch[4] == true){
        var lst = document.getElementById("lst_obj");
        lst.innerHTML = "";
        for(var i = 0; i != objs.length; i+=1){
            lst.innerHTML += '<option value="obj' + i + '">' + objs[i].label + '</option>';
        }
        lst = document.getElementById("lst_ls");
        lst.innerHTML = "";
        for(var i = 0; i != lts.length; i+=1){
            lst.innerHTML += '<option value="lt' + i + '">' + lts[i].label + '</option>';
        }
        lst = document.getElementById("lst_spk");
        lst.innerHTML = "";
        for(var i = 0; i != spks.length; i+=1){
            lst.innerHTML += '<option value="aud' + i + '">' + spks[i].label + '</option>';
        }
        ch[4] = false;
    }
    var oid = document.getElementById("lst").value.split("");
    if(oid[0] == "o" && oid[1] == "b" && oid[2] == "j"){
        oid = Number(document.getElementById("lst").value.replace("obj", ""));
        if(lastsel != document.getElementById("lst").value){
            document.getElementById("posx").value = objs[oid].pos[0];
            document.getElementById("posy").value = objs[oid].pos[1];
            document.getElementById("posz").value = objs[oid].pos[2];
            document.getElementById("rotx").value = objs[oid].rot[0];
            document.getElementById("roty").value = objs[oid].rot[1];
            document.getElementById("rotz").value = objs[oid].rot[2];
            document.getElementById("scalex").value = objs[oid].scale[0];
            document.getElementById("scaley").value = objs[oid].scale[1];
            document.getElementById("scalez").value = objs[oid].scale[2];
            document.getElementById("lst_mts").value = String(objs[oid].material);
            document.getElementById("lst_mdn").value = objs[oid].model;
            document.getElementById("renderm").checked = objs[oid].render;
            lastsel = document.getElementById("lst").value;
        }
        objs[oid].pos[0] = document.getElementById("posx").value;
        objs[oid].pos[1] = document.getElementById("posy").value;
        objs[oid].pos[2] = document.getElementById("posz").value;
        objs[oid].rot[0] = document.getElementById("rotx").value;
        objs[oid].rot[1] = document.getElementById("roty").value;
        objs[oid].rot[2] = document.getElementById("rotz").value;
        objs[oid].scale[0] = document.getElementById("scalex").value;
        objs[oid].scale[1] = document.getElementById("scaley").value;
        objs[oid].scale[2] = document.getElementById("scalez").value;
        objs[oid].render = document.getElementById("renderm").checked;
    }else if(oid[0] == "l" && oid[1] == "t"){
        oid = Number(document.getElementById("lst").value.replace("lt", ""));
        if(lastsel != document.getElementById("lst").value){
            document.getElementById("posx").value = lts[oid].pos[0];
            document.getElementById("posy").value = lts[oid].pos[1];
            document.getElementById("posz").value = lts[oid].pos[2];
            document.getElementById("rotx").value = lts[oid].rot[0];
            document.getElementById("roty").value = lts[oid].rot[1];
            document.getElementById("rotz").value = lts[oid].rot[2];
            document.getElementById("scalex").value = lts[oid].color[0];
            document.getElementById("scaley").value = lts[oid].color[1];
            document.getElementById("scalez").value = lts[oid].color[2];
            document.getElementById("lst_mdn").value = "-4";
            lastsel = document.getElementById("lst").value;
        }
        lts[oid].pos[0] = document.getElementById("posx").value;
        lts[oid].pos[1] = document.getElementById("posy").value;
        lts[oid].pos[2] = document.getElementById("posz").value;
        lts[oid].rot[0] = document.getElementById("rotx").value;
        lts[oid].rot[1] = document.getElementById("roty").value;
        lts[oid].rot[2] = document.getElementById("rotz").value;
        lts[oid].color[0] = document.getElementById("scalex").value;
        lts[oid].color[1] = document.getElementById("scaley").value;
        lts[oid].color[2] = document.getElementById("scalez").value;
    }else if(oid[0] == "a" && oid[1] == "u" && oid[2] == "d"){
        oid = Number(document.getElementById("lst").value.replace("aud", ""));
        if(lastsel != document.getElementById("lst").value){
            document.getElementById("posx").value = spks[oid].pos[0];
            document.getElementById("posy").value = spks[oid].pos[1];
            document.getElementById("posz").value = spks[oid].pos[2];
            document.getElementById("roty").value = spks[oid].power;
            document.getElementById("scaley").value = spks[oid].volume;
            document.getElementById("lst_mdn").value = spks[oid].audio;
            lastsel = document.getElementById("lst").value;
        }
        spks[oid].pos[0] = document.getElementById("posx").value;
        spks[oid].pos[1] = document.getElementById("posy").value;
        spks[oid].pos[2] = document.getElementById("posz").value;
        spks[oid].power = document.getElementById("roty").value;
        spks[oid].volume = document.getElementById("scaley").value;
    }else if(oid[0] == "p" && oid[1] == "i" && oid[2] == "t"){
        if(lastsel != document.getElementById("lst").value){
            document.getElementById("posx").value = pointer.pos[0];
            document.getElementById("posy").value = pointer.pos[1];
            document.getElementById("posz").value = pointer.pos[2];
            document.getElementById("rotx").value = pointer.rot[0];
            document.getElementById("roty").value = pointer.rot[1];
            document.getElementById("rotz").value = pointer.rot[2];
            document.getElementById("scalex").value = pointer.scale[0];
            document.getElementById("scaley").value = pointer.scale[1];
            document.getElementById("scalez").value = pointer.scale[2];
            document.getElementById("lst_mdn").value = "-1";
            lastsel = document.getElementById("lst").value;
        }
        pointer.pos[0] = document.getElementById("posx").value;
        pointer.pos[1] = document.getElementById("posy").value;
        pointer.pos[2] = document.getElementById("posz").value;
        pointer.rot[0] = document.getElementById("rotx").value;
        pointer.rot[1] = document.getElementById("roty").value;
        pointer.rot[2] = document.getElementById("rotz").value;
        pointer.scale[0] = document.getElementById("scalex").value;
        pointer.scale[1] = document.getElementById("scaley").value;
        pointer.scale[2] = document.getElementById("scalez").value;
    }
    setTimeout(lp, 4);
}

lp();

document.addEventListener('keydown', async function(event) {
    if(event.key == "r" || event.key == "R" && edopen){
        if(document.getElementById("list_div").style.display != "none"){
            document.getElementById("list_div").style.display = "none";
        }else{
            document.getElementById("list_div").style.display = "initial";
        }
    }
    if(event.key == "t" || event.key == "T" && edopen){
        if(document.getElementById("file_div").style.display != "none"){
            document.getElementById("file_div").style.display = "none";
        }else{
            document.getElementById("file_div").style.display = "initial";
        }
    }
    if(event.key == "y" || event.key == "Y" && edopen){
        if(document.getElementById("obj_div").style.display != "none"){
            document.getElementById("obj_div").style.display = "none";
        }else{
            document.getElementById("obj_div").style.display = "initial";
        }
    }
    if(event.key == "u" || event.key == "U" && edopen){
        if(document.getElementById("assets_div").style.display != "none"){
            document.getElementById("assets_div").style.display = "none";
        }else{
            document.getElementById("assets_div").style.display = "initial";
        }
    }
    if(event.key == "i" || event.key == "I" && edopen){
        if(document.getElementById("settings_div").style.display != "none"){
            document.getElementById("settings_div").style.display = "none";
        }else{
            document.getElementById("settings_div").style.display = "initial";
        }
    }
    if(event.key == "o" || event.key == "O" && edopen){
        if(!hideed){
            document.getElementById("list_div").style.display = "none";
            document.getElementById("file_div").style.display = "none";
            document.getElementById("obj_div").style.display = "none";
            document.getElementById("assets_div").style.display = "none";
            document.getElementById("settings_div").style.display = "none";
            hideed = !hideed
        }else{
            document.getElementById("list_div").style.display = "initial";
            document.getElementById("file_div").style.display = "initial";
            document.getElementById("obj_div").style.display = "initial";
            document.getElementById("assets_div").style.display = "initial";
            document.getElementById("settings_div").style.display = "initial";
            hideed = !hideed
        }
    }
    await new Promise(r => setTimeout(r, 1000));
}, true);

var assetimportlc = document.createElement('input');
assetimportlc.type = 'file';
assetimportlc.accept = ".txt,.png,.jpg,.mp3,.ogg";
assetimportlc.style.display = "none";
assetimportlc.multiple = "true";

assetimportlc.onchange = e => { 
    var files = e.target.files;
    if(files.length <= 0){
        alert("no files selected!");
    }else{
        for(const file of files){
            const spl = file.name.split('.');
            if(spl[spl.length-1] == "txt"){
                model_lb.push(file.name);
                let arrind = model_lb.length;
                ch[0] = true;
                let reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function () {
                    var md = document.createElement("p");
                    md.id = "md" + arrind;
                    md.textContent = reader.result;
                    md.style = "display: none;";
                    md.crossOrigin = "";
                    document.body.appendChild(md);
                    console.log("model by name="+file.name+" by index="+arrind+" content="+reader.result+" is loaded");
                    htmlcont += `<iframe src="models/` + model_lb[arrind-1] + `" id="` + md.id + `"></iframe>
                    `;
                }
            }
            if(spl[spl.length-1] == "png" || spl[spl.length-1] == "jpg"){
                tex_lb.push(file.name);
                let arrind = tex_lb.length;
                ch[1] = true;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var md = document.createElement("img");
                    md.id = "tex" + arrind;
                    md.src = reader.result;
                    md.style = "display: none;";
                    md.crossOrigin = "";
                    document.body.appendChild(md);
                    console.log("image by name="+file.name+" by index="+arrind+" src="+reader.result+" is loaded");
                    htmlcont += `<img src="textures/` + tex_lb[arrind-1] + `" id="` + md.id + `"></img>
                    `;
                }
            }
            if(spl[spl.length-1] == "mp3" || spl[spl.length-1] == "ogg"){
                audio_lb.push(file.name);
                let arrind = audio_lb.length;
                ch[2] = true;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var md = document.createElement("audio");
                    md.id = "spk" + arrind;
                    md.src = reader.result;
                    md.style = "display: none;";
                    md.crossOrigin = "";
                    document.body.appendChild(md);
                    console.log("audio by name="+file.name+" by index="+arrind+" src="+reader.result+" is loaded");
                    htmlcont += `<audio src="audio/` + audio_lb[arrind-1] + `" id="` + md.id + `"></audio>
                    `;
                }
            }
        }
    }
}

document.getElementById("import_assets").addEventListener("click", () => {
    assetimportlc.click();
});