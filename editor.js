class JMaterial{
    constructor(albedo, roughness, metalic, AO, normal, label){
        this.albedo = albedo;
        this.roughness = roughness;
        this.metalic = metalic;
        this.ao = AO;
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

var ch = [false, false, false, false, false];

var mif = ["", "", "", "", ""];

var objs = [];

var lts = [];

var spks = [];

var selected = -1;

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
        nam = Number(nam.replace("obj", ""));
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
        nam = Number(nam.replace("obj", ""));
        var tc = document.getElementById("lst_mdn").value;
        if(tc == "-4" || tc == "-5"){
            if(label == ""){
                label = lts[nam].label;
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
        for(var i = 0; i != elem.files.length; i+=1){
            const spl = elem.files[i].name.split('.');
            if(spl[spl.length-1] == "txt"){
                model_lb.push(elem.files[i].name);
                ch[0] = true;
                var reader = new FileReader();
                reader.readAsDataURL(elem.files[i]);
                reader.onload = function () {
                    var md = document.createElement("iframe");
                    md.id = "md" + model_lb.length;
                    md.src = reader.result;
                    md.style = "display: none;";
                    console.log("model parsing done!");
                    htmlcont += `<iframe src="models/` + model_lb[model_lb.length-1] + `" id="` + md.id + `"></iframe>
                    `;
                }
            }
            if(spl[spl.length-1] == "png" || spl[spl.length-1] == "jpg"){
                tex_lb.push(elem.files[i].name);
                ch[1] = true;
                var reader = new FileReader();
                reader.readAsDataURL(elem.files[i]);
                reader.onload = function () {
                    var md = document.createElement("img");
                    md.id = "tex" + tex_lb.length;
                    md.src = reader.result;
                    md.style = "display: none;";
                    console.log("image parsing done!");
                    htmlcont += `<img src="textures/` + tex_lb[tex_lb.length-1] + `" id="` + md.id + `"></img>
                    `;
                }
            }
            if(spl[spl.length-1] == "mp3" || spl[spl.length-1] == "ogg"){
                audio_lb.push(elem.files[i].name);
                ch[2] = true;
                var reader = new FileReader();
                reader.readAsDataURL(elem.files[i]);
                reader.onload = function () {
                    var md = document.createElement("audio");
                    md.id = "spk" + audio_lb.length;
                    md.src = reader.result;
                    md.style = "display: none;";
                    console.log("audio parsing done!");
                    htmlcont += `<audio src="audio/` + audio_lb[audio_lb.length-1] + `" id="` + md.id + `"></audio>
                    `;
                }
            }
        }
    }
});

document.getElementById("save").addEventListener("click", () => {
    var sdf = ``;
    for(var i = 0; i != objs.length; i+=1){
        var posrotscale = objs[i].pos[2] + ` ` + objs[i].pos[1] + ` ` + objs[i].pos[0] + ` ` + objs[i].rot[2] + ` ` + objs[i].rot[1] + ` ` + objs[i].rot[0] + ` ` + objs[i].scale[2] + ` ` + objs[i].scale[1] + ` ` + objs[i].scale[0] + `
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
        var posrotscale = lts[i].pos[2] + ` ` + lts[i].pos[1] + ` ` + lts[i].pos[0] + ` ` + lts[i].rot[2] + ` ` + lts[i].rot[1] + ` ` + lts[i].rot[0] + ` ` + lts[i].color[2] + ` ` + lts[i].color[1] + ` ` + lts[i].color[0] + `
        `;
        sdf += `lt 0 ` + posrotscale;
    }
    for(var i = 0; i != spks.length; i+=1){
        var posrotscale = spks[i].power + ` ` + spks[i].volume + ` ` + spks[i].pos[2] + ` ` + spks[i].pos[1] + ` ` + spks[i].pos[0] + `
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
    if(document.getElementById("lst_mdn").value == "-4" || document.getElementById("lst_mdn").value == "-5"){
        document.getElementById("scale_p").innerText = "Color";
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
    }
    setTimeout(lp, 4);
}

lp();