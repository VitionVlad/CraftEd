import { get_elem_ch } from './snippets/crafted-974ab77c7d42ec87/src/editorust.js';
import { Jsaudioctx, Jsaudiosource } from './snippets/crafted-974ab77c7d42ec87/src/engine/audio/audio.js';
import { Jskeyboard, Jsmouse, Jsgamepad, Jstouch } from './snippets/crafted-974ab77c7d42ec87/src/engine/input/input.js';
import { Gfxrender, Gfxmesh, Jsloop, snlll } from './snippets/crafted-974ab77c7d42ec87/src/engine/render/gfx.js';
import { Jsrelod } from './snippets/crafted-974ab77c7d42ec87/src/engine/resourceloader/resloader.js';
import * as __wbg_star0 from './snippets/crafted-974ab77c7d42ec87/src/editorust.js';

let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_0.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_0.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}
function __wbg_adapter_8(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8190f1631459cb0c(arg0, arg1);
}

/**
*/
export function main() {
    wasm.main();
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_getelemch_733f67fbf3bfdefe = function(arg0, arg1) {
        const ret = get_elem_ch(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_new_ac4ba1d5d3411db0 = function(arg0, arg1, arg2) {
        const ret = new Jsaudiosource(getObject(arg0), getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_jgety_cdbbaf2657e273ef = function(arg0) {
        const ret = getObject(arg0).jgety();
        return ret;
    };
    imports.wbg.__wbg_gfxgetcanvassizey_8857e1e421869689 = function(arg0) {
        const ret = getObject(arg0).gfxgetcanvassizey();
        return ret;
    };
    imports.wbg.__wbg_jgetx_6ceccada5327dc86 = function(arg0) {
        const ret = getObject(arg0).jgetx();
        return ret;
    };
    imports.wbg.__wbg_gfxgetcanvassizex_62d6b7b725d88378 = function(arg0) {
        const ret = getObject(arg0).gfxgetcanvassizex();
        return ret;
    };
    imports.wbg.__wbg_getkey_edfbed530c89d27f = function(arg0, arg1) {
        const ret = getObject(arg0).getkey(arg1);
        return ret;
    };
    imports.wbg.__wbg_new_0bafd52ed6f8a05e = function(arg0, arg1, arg2, arg3) {
        const ret = new Gfxrender(getStringFromWasm0(arg0, arg1), arg2, arg3);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_f49ef5e444f60f3a = function(arg0) {
        const ret = new Jsloop(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_b1bc4a6427ffba0e = function() {
        const ret = new Jskeyboard();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_d208abd3b5bdd08f = function() {
        const ret = new Jsmouse();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_4eb8a929c519be15 = function() {
        const ret = new Jstouch();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_d2bb7cd655e4cf01 = function() {
        const ret = new Jsgamepad();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8a7128bfc85d7534 = function() {
        const ret = new Jsaudioctx();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_drawloop_4e351c51c92803bf = function(arg0) {
        getObject(arg0).drawloop();
    };
    imports.wbg.__wbg_gfxsetrenderscale_69aea870dfb5fdb3 = function(arg0, arg1, arg2) {
        getObject(arg0).gfxsetrenderscale(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_gfxsetshadowmapres_505a8f06ae7b7f12 = function(arg0, arg1, arg2) {
        getObject(arg0).gfxsetshadowmapres(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_willrender_a4955645d39ac8ae = function(arg0, arg1) {
        getObject(arg0).will_render(arg1 !== 0);
    };
    imports.wbg.__wbg_setubo_c20ffd68ec38f96f = function(arg0, arg1) {
        getObject(arg0).set_ubo(getObject(arg1));
    };
    imports.wbg.__wbg_queuepipeline_1d7364aefbbd3422 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        getObject(arg0).queuepipeline(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
    };
    imports.wbg.__wbg_snlll_7675f1278bee0320 = function(arg0, arg1) {
        snlll(getObject(arg0), arg1 >>> 0);
    };
    imports.wbg.__wbg_new_1f374088719da1fa = function(arg0, arg1) {
        const ret = new Jsrelod(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getvert_79c720e56c206caa = function(arg0) {
        const ret = getObject(arg0).getvert();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getuv_ddeace0c58940d3d = function(arg0) {
        const ret = getObject(arg0).getuv();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getnorm_95d65b4e0cf2c13e = function(arg0) {
        const ret = getObject(arg0).getnorm();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getlen_9b599d615d91b72c = function(arg0) {
        const ret = getObject(arg0).getlen();
        return ret;
    };
    imports.wbg.__wbg_setrelxy_64df4aca0260818b = function(arg0, arg1) {
        getObject(arg0).setrelxy(arg1);
    };
    imports.wbg.__wbg_setvolume_c48bfdbb7015451f = function(arg0, arg1) {
        getObject(arg0).setvolume(arg1);
    };
    imports.wbg.__wbg_play_aa8ab50b725a67e0 = function(arg0) {
        getObject(arg0).play();
    };
    imports.wbg.__wbg_create_3f0132a494c160a1 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16, arg17, arg18, arg19, arg20, arg21, arg22, arg23, arg24, arg25, arg26, arg27, arg28) {
        const ret = new Gfxmesh(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4), getObject(arg5), arg6 >>> 0, getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), arg13, getStringFromWasm0(arg14, arg15), getStringFromWasm0(arg16, arg17), getStringFromWasm0(arg18, arg19), getStringFromWasm0(arg20, arg21), getStringFromWasm0(arg22, arg23), getStringFromWasm0(arg24, arg25), getStringFromWasm0(arg26, arg27), arg28 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_pushmesh_e088f0ee92e54f1d = function(arg0, arg1, arg2) {
        getObject(arg0).push_mesh(getObject(arg1), arg2);
    };
    imports.wbg.__wbg_buffer_12d079cc21e14bdb = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_4a659d079a1650e0 = function(arg0, arg1, arg2) {
        const ret = new Float32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_9efabd6b6d2ce46d = function(arg0) {
        const ret = new Float32Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_bd975934d1b1fddb = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_d25bbcbc3367f684 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_1e8b839a06de01c5 = function(arg0) {
        const ret = new Float32Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getindex_289b14432d9c89b9 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_setindex_e8a148aab2078037 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = arg2;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper54 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 3, __wbg_adapter_8);
        return addHeapObject(ret);
    };
    imports['./snippets/crafted-974ab77c7d42ec87/src/editorust.js'] = __wbg_star0;

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('crafted_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
