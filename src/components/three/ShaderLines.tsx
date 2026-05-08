'use client'

import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_resolution;

// --- noise helpers ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1  = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0*fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314*(a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x * x0.x  + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
// ---------------------

// одна светящаяся линия
float line(vec2 uv, float y, float width, float t) {
  float n = snoise(vec2(uv.x * 1.8 + t * 0.18, t * 0.08)) * 0.22;
  float n2 = snoise(vec2(uv.x * 3.5 - t * 0.12, t * 0.05 + 1.7)) * 0.09;
  float curve = y + n + n2;
  float d = abs(uv.y - curve);
  float glow = width / (d + 0.003);
  return clamp(glow, 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.5;

  // цвета палитры
  vec3 blue  = vec3(0.290, 0.435, 0.647);  // #4A6FA5
  vec3 peach = vec3(0.847, 0.706, 0.627);  // #D8B4A0
  vec3 white = vec3(0.97, 0.96, 0.95);

  float glow = 0.0;
  vec3 col = vec3(0.0);

  // 7 линий с разными параметрами
  float l;

  l = line(uv, -0.35, 0.0008, t);        col += l * blue  * 0.9;  glow += l;
  l = line(uv, -0.18, 0.0006, t + 1.1);  col += l * peach * 0.7;  glow += l;
  l = line(uv,  0.00, 0.0012, t + 2.3);  col += l * white * 1.1;  glow += l * 1.1;
  l = line(uv,  0.14, 0.0007, t + 3.7);  col += l * blue  * 0.8;  glow += l;
  l = line(uv,  0.28, 0.0005, t + 0.6);  col += l * peach * 0.6;  glow += l;
  l = line(uv, -0.08, 0.0009, t + 4.5);  col += l * blue  * 0.5;  glow += l * 0.6;
  l = line(uv,  0.42, 0.0004, t + 2.9);  col += l * peach * 0.4;  glow += l * 0.5;

  // широкое мягкое свечение вокруг центральной линии
  float centerGlow = exp(-pow(uv.y / 0.25, 2.0)) * 0.04;
  col += centerGlow * mix(blue, peach, 0.4);

  // виньетка
  float vignette = 1.0 - smoothstep(0.3, 1.1, length(uv * vec2(0.8, 1.1)));
  col *= vignette;

  gl_FragColor = vec4(col, clamp(glow * 0.85 + centerGlow * 3.0, 0.0, 1.0));
}
`

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

export default function ShaderLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const vert = createShader(gl, gl.VERTEX_SHADER, VERT)
    const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAG)
    const prog = gl.createProgram()!
    gl.attachShader(prog, vert!)
    gl.attachShader(prog, frag!)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // fullscreen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes  = gl.getUniformLocation(prog, 'u_resolution')

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

    let start = performance.now()

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
      gl!.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    function render() {
      const t = (performance.now() - start) / 1000
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.uniform1f(uTime, t)
      gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
