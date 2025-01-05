use engine::cube::CUBE;
use engine::engine::Engine;
use engine::light::Light;
//use engine::light::Light;
use engine::material::{Material, MaterialGenerator};
use engine::object::Object;
use engine::plane::PLANE;
use engine::render::rloop::logic_loop;
use engine::resourceloader::resourceloader::Objreader;
use engine::scene::Scene;
//use engine::scene::Scene;
use wasm_bindgen::prelude::*;
use engine::render::render::*;
use engine::math::vec3::Vec3;
mod engine;

#[wasm_bindgen]
extern {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[wasm_bindgen(module = "/src/editorust.js")]
extern {
  pub fn getvol() -> f32;
  pub fn getfov() -> f32;
  pub fn getsres() -> i32;
  pub fn getrscale() -> f32;
  pub fn get_mouse_lock() -> bool;
  pub fn get_elem_ch(id: &str) -> bool;
  pub fn get_val(g: i32, i: i32, f: i32, p: i32) -> f32;
}

#[wasm_bindgen]
pub fn main() {
  const SPEED: f32 = 0.01f32;
  let mut eng: Engine = Engine::new("render");

  let mut matgen = MaterialGenerator::new(vec![]);
  matgen.gen_vertex();
  matgen.gen_frag_beg();
  matgen.fragment_shader += "
  output.albedo = vec4(0.0, 1.0, 0.0, -1.0);
  output.material.r = 1.0;
  output.material.g = 1.0;
  output.material.b = 1.0;
  output.normal = vec4(in.norm, 1.0);
  output.position = in.vp;
  return output;";
  matgen.gen_frag_end();

  let mut scene = Scene::new(vec![]);

  let mut pointer: Object = Object::new(&mut eng, CUBE.to_vec(), &matgen.generate_material("".to_string(), "".to_string()), engine::render::mesh::MUsages::OnlyMain, true);

  matgen.gen_post_vertex();
  matgen.gen_fragpost_beg();
  matgen.fragment_shader += "
  let albedo = pow(textureSample(mainMap, mySampler, in.uv, 0).rgb, vec3f(2.2));
  let WorldPos = textureSample(positionMap, mySampler, in.uv, 0).rgb;
  let norm = textureSample(normalMap, mySampler, in.uv, 0).rgb;
  let mat = textureSample(matMap, mySampler, in.uv, 0).rgb;

  let shadow = shcalc(WorldPos, 0.0);
  let metallic = mat.g;
  let roughness = mat.r; 
  let ao = mat.b;

  var color = vec3(0.0);
  if(textureSample(mainMap, mySampler, in.uv, 0).a < 0.0){
    color = albedo;
  }else{
    color = PBR(norm, albedo, shadow, metallic, roughness, ao, WorldPos);
  }

  return vec4f(color, 1.0);";
  matgen.gen_frag_end();

  let mut renderplane: Object = Object::new(&mut eng, PLANE.to_vec(), &matgen.generate_material("".to_string(), "".to_string()), engine::render::mesh::MUsages::PostProcessing, true);

  matgen.gen_vertex();
  matgen.gen_frag_beg();
  matgen.fragment_shader += "
  output.albedo = textureSample(myTexture, mySampler, in.uv, 0).rgba;
  output.material.r = textureSample(myTexture, mySampler, in.uv, 1).r;
  output.material.g = textureSample(myTexture, mySampler, in.uv, 2).r;
  output.material.b = textureSample(myTexture, mySampler, in.uv, 3).r;
  let TBN = mat3x3<f32>(
    in.tangent,
    in.bitangent,
    in.norm,
  );
  output.normal = vec4f(TBN * (textureSample(myTexture, mySampler, in.uv, 4).rgb * 2.0 - 1.0), 1.0);
  output.position = in.vp;
  return output;";
  matgen.gen_frag_end();

  let mut mats: Vec<Material> = vec![];

  eng.cameras[0].physic_object.pos = Vec3::newdefined(0f32, 0f32, 2f32);
  eng.cameras[0].physic_object.gravity = false;

  logic_loop(Closure::new(move || {
    eng.audioctx.volume = getvol()*10f32;
    eng.cameras[0].fov = getfov();
    eng.renderscale = getrscale()/10f32;
    eng.shadowmap_resolution = f32::powi(2f32, getsres()) as i32 * 1000;
    eng.cameras[0].physic_object.gravity = get_elem_ch("ppsch");
    if !get_elem_ch("ppsch"){
      eng.cameras[0].physic_object.acceleration.y = 0.0f32;
    }
    eng.cameras[0].physic_object.solid = !get_elem_ch("noclipch");

    pointer.physic_object.pos = Vec3::newdefined(get_val(0, 0, 0, 0), get_val(0, 0, 0, 1), get_val(0, 0, 0, 2));
    pointer.physic_object.rot = Vec3::newdefined(get_val(0, 0, 1, 0), get_val(0, 0, 1, 1), get_val(0, 0, 1, 2));
    pointer.physic_object.scale = Vec3::newdefined(get_val(0, 0, 2, 0), get_val(0, 0, 2, 1), get_val(0, 0, 2, 2));

    for i in 0..(get_val(2, -1, 0, 0) as usize){
      if i >= eng.lights.len(){
        eng.lights.push(Light::new(engine::light::LightType::Spot));
      }
      if get_elem_ch("uppch"){
        eng.lights[i].pos = eng.cameras[0].physic_object.pos;
        eng.lights[i].rot = eng.cameras[0].physic_object.rot;
      }else{
        eng.lights[i].pos = Vec3::newdefined(get_val(2, i as i32, 0, 0), get_val(2, i as i32, 0, 1), get_val(2, i as i32, 0, 2));
        eng.lights[i].rot = Vec3::newdefined(get_val(2, i as i32, 1, 0), get_val(2, i as i32, 1, 1), get_val(2, i as i32, 1, 2));
      }
      eng.lights[i].color = Vec3::newdefined(get_val(2, i as i32, 2, 0), get_val(2, i as i32, 2, 1), get_val(2, i as i32, 2, 2));
    }

    for i in 0..(get_val(5, -1, 0, 0) as usize){
      let mut tid = "".to_string();
      for b in 0..4{
        tid+=&("tex".to_string()+&(get_val(5, 0, b, 0) as i32).to_string()+";");
      }
      tid+=&("tex".to_string()+&(get_val(5, 0, 4, 0) as i32).to_string());
      if i >= mats.len(){
        mats.push(matgen.generate_material(tid, "".to_string()));
      }else{
        mats[i] = matgen.generate_material(tid, "".to_string());
      }
    }

    for i in 0..(get_val(1, -1, 0, 0) as usize){
      if i >= scene.all_objects.len(){
        let md = Objreader::new(&("md".to_string()+&(get_val(1, i as i32, 3, 0) as i32).to_string()));
        scene.all_objects.push(Object::new(&mut eng, md.arr, &mats[get_val(1, i as i32, 4, 0) as usize], engine::render::mesh::MUsages::ShadowAndMain, true));
      }
      if get_val(1, i as i32, 5, 0) == 1.0f32{
        let md = Objreader::new(&("md".to_string()+&(get_val(1, i as i32, 3, 0) as i32).to_string()));
        scene.all_objects[i] = Object::new(&mut eng, md.arr, &mats[get_val(1, i as i32, 4, 0) as usize], engine::render::mesh::MUsages::ShadowAndMain, true);
      }
       scene.all_objects[i].physic_object.pos = Vec3::newdefined(get_val(1, i as i32, 0, 0), get_val(1, i as i32, 0, 1), get_val(1, i as i32, 0, 2));
       scene.all_objects[i].physic_object.rot = Vec3::newdefined(get_val(1, i as i32, 1, 0), get_val(1, i as i32, 1, 1), get_val(1, i as i32, 1, 2));
       scene.all_objects[i].physic_object.scale = Vec3::newdefined(get_val(1, i as i32, 2, 0), get_val(1, i as i32, 2, 1), get_val(1, i as i32, 2, 2));
    }

    eng.start();

    if get_mouse_lock(){
      eng.cameras[0].physic_object.rot.x += eng.mouse.get_y_coords() as f32/eng.render.get_canvas_size_y()as f32;
      eng.cameras[0].physic_object.rot.y += eng.mouse.get_x_coords() as f32/eng.render.get_canvas_size_x()as f32;
    }
    if eng.keyboard.is_key_pressed(11){
      eng.cameras[0].physic_object.speed.z += f32::cos(eng.cameras[0].physic_object.rot.x) * f32::cos(eng.cameras[0].physic_object.rot.y) * SPEED;
      eng.cameras[0].physic_object.speed.x += f32::cos(eng.cameras[0].physic_object.rot.x) * f32::sin(eng.cameras[0].physic_object.rot.y) * -SPEED;
      if eng.cameras[0].physic_object.gravity == false{
        eng.cameras[0].physic_object.speed.y += f32::sin(eng.cameras[0].physic_object.rot.x) * SPEED;
      }
    }
    if eng.keyboard.is_key_pressed(1){
      eng.cameras[0].physic_object.speed.z += f32::cos(eng.cameras[0].physic_object.rot.x) * f32::cos(eng.cameras[0].physic_object.rot.y) * -SPEED;
      eng.cameras[0].physic_object.speed.x += f32::cos(eng.cameras[0].physic_object.rot.x) * f32::sin(eng.cameras[0].physic_object.rot.y) * SPEED;
      if eng.cameras[0].physic_object.gravity == false{
        eng.cameras[0].physic_object.speed.y += -f32::sin(eng.cameras[0].physic_object.rot.x) * SPEED;
      }
    }
    if eng.keyboard.is_key_pressed(12){
      eng.cameras[0].physic_object.speed.x += f32::cos(eng.cameras[0].physic_object.rot.x) * f32::cos(eng.cameras[0].physic_object.rot.y) * SPEED;
      eng.cameras[0].physic_object.speed.z += f32::cos(eng.cameras[0].physic_object.rot.x) * f32::sin(eng.cameras[0].physic_object.rot.y) * SPEED;
      if eng.cameras[0].physic_object.gravity == false{
        eng.cameras[0].physic_object.speed.y += -f32::sin(eng.cameras[0].physic_object.rot.z) * SPEED;
      }
    }
    if eng.keyboard.is_key_pressed(10){
      eng.cameras[0].physic_object.speed.x += f32::cos(eng.cameras[0].physic_object.rot.x) * f32::cos(eng.cameras[0].physic_object.rot.y) * -SPEED;
      eng.cameras[0].physic_object.speed.z += f32::cos(eng.cameras[0].physic_object.rot.x) * f32::sin(eng.cameras[0].physic_object.rot.y) * -SPEED;
      if eng.cameras[0].physic_object.gravity == false{
        eng.cameras[0].physic_object.speed.y += -f32::sin(eng.cameras[0].physic_object.rot.z) * SPEED;
      }
    }

    scene.exec(&mut eng);

    pointer.exec(&mut eng);
    renderplane.exec(&mut eng);
  }), 4);
}