import React, { useRef, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Image from '../assets/me_in_suit_cropped.png';

const CanvasRevealShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uProgress;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      
      float diagonal = (1.0 - vUv.x) * 0.5 + (1.0 - vUv.y) * 0.5;
      float threshold = mix(diagonal, random(vUv), 0.3);
      
      float duration = 0.35;
      float start = threshold * (1.0 - duration);
      float end = start + duration;
      
      float localProgress = smoothstep(start, end, uProgress);
      float revealAlpha = smoothstep(0.9, 1.0, localProgress);

      gl_FragColor = vec4(texColor.rgb, texColor.a * revealAlpha);
    }
  `
};

const ParticleFlightShader = {
  vertexShader: `
    uniform float uProgress;
    uniform float uTime;
    varying vec2 vUv;
    varying float vFlightProgress;
    varying float vEnergy;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
    vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    vec3 curlNoise(vec3 p) {
      const float e = 0.15;
      float n1 = snoise(p + vec3(0.0, e, 0.0));
      float n2 = snoise(p - vec3(0.0, e, 0.0));
      float n3 = snoise(p + vec3(0.0, 0.0, e));
      float n4 = snoise(p - vec3(0.0, 0.0, e));
      float n5 = snoise(p + vec3(e, 0.0, 0.0));
      float n6 = snoise(p - vec3(e, 0.0, 0.0));

      float x = (n1 - n2) - (n3 - n4);
      float y = (n3 - n4) - (n5 - n6);
      float z = (n5 - n6) - (n1 - n2);

      return normalize(vec3(x, y, z) + 1e-4);
    }

    void main() {
      vUv = uv;
      float diagonal = (1.0 - uv.x) * 0.5 + (1.0 - uv.y) * 0.5;
      float threshold = mix(diagonal, random(uv), 0.3);
      
      float duration = 0.35;
      float start = threshold * (1.0 - duration);
      float end = start + duration;
      
      float particleProgress = smoothstep(start, end, uProgress);
      vFlightProgress = particleProgress;

      float seed = random(uv) * 6.2831;
      float turbulence = 1.0 - particleProgress;
      vec3 flow = curlNoise(position * 0.35 + vec3(0.0, 0.0, uTime * 0.12) + seed)
            * turbulence * 1.4;

      vec3 streamDir = normalize(vec3(1.3, 0.85, -0.4));
      float travelDist = 6.0 + random(uv) * 2.0; 
      vec3 scatterOrigin = position + streamDir * travelDist;
      vec3 travelDir = streamDir;

      vec3 upGuess = abs(travelDir.y) > 0.95 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
      vec3 tangentA = normalize(cross(travelDir, upGuess));
      vec3 tangentB = cross(travelDir, tangentA);
      float swirlSpins = 1.5 + random(uv + 1.0) * 1.0; 
      float swirlAngle = particleProgress * swirlSpins * 6.2831853 + seed;
      float swirlEnvelope = sin(clamp(particleProgress, 0.0, 1.0) * 3.14159265);
      float swirlRadius = 0.35 * swirlEnvelope; 
      vec3 swirl = (tangentA * cos(swirlAngle) + tangentB * sin(swirlAngle)) * swirlRadius;

      float gather = smoothstep(0.0, 0.65, particleProgress) * (1.0 - smoothstep(0.55, 1.0, particleProgress));
      vec3 core = vec3(0.0, 0.0, 0.4);
      vec3 gathered = mix(scatterOrigin, core, gather);

      float arrive = smoothstep(0.55, 1.0, particleProgress);
      float snap = 1.0 - pow(1.0 - arrive, 2.5);
      vec3 released = mix(gathered, position, snap);

      vec3 finalPos = released + flow * (1.0 - arrive) + swirl;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
      gl_PointSize = mix(4.0, 1.0, particleProgress); 
      vEnergy = gather;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vFlightProgress;
    varying float vEnergy;

    void main() {
      if (vFlightProgress <= 0.0 || vFlightProgress >= 1.0) discard; 

      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      float r = dot(cxy, cxy);
      if (r > 1.0) discard; 

      vec4 texColor = texture2D(uTexture, vUv);
      vec3 flightTone = vec3(1.0, 0.3, 0.0); // Vibrant Orange
      vec3 coreTone = vec3(1.0, 0.6, 0.1);   // Bright Yellow-Orange
      vec3 tint = mix(flightTone, coreTone, vEnergy);

      float glowMultiplier = mix(3.0, 1.0, vFlightProgress) + vEnergy * 1.5;
      vec3 flyingColor = tint * texColor.rgb * glowMultiplier;

      float fadeOut = 1.0 - smoothstep(0.9, 1.0, vFlightProgress);
      float alpha = texColor.a * (1.0 - r) * fadeOut;

      gl_FragColor = vec4(flyingColor, alpha);
    }
  `
};

interface PortraitProps {
  progressRef: React.RefObject<number>;
}

export default function Portrait({ progressRef }: PortraitProps) {
  const canvasMatRef = useRef<THREE.ShaderMaterial>(null);
  const brushMatRef = useRef<THREE.ShaderMaterial>(null);

  const texture = useTexture(Image) as THREE.Texture;
  const { width, height } = useThree(state => state.viewport);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  const canvasUniforms = useMemo(() => ({
    uTexture: { value: texture },
    uProgress: { value: 0.0 },
  }), [texture]);

  const brushUniforms = useMemo(() => ({
    uTexture: { value: texture },
    uProgress: { value: 0.0 },
    uTime: { value: 0.0 }
  }), [texture]);

  useFrame((state) => {
    if (canvasMatRef.current && brushMatRef.current) {
      // Keep time moving for fluid swirls
      brushMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smoothly interpolate the shader's progress toward the actual scroll position
      const target = progressRef.current;
      const current = canvasMatRef.current.uniforms.uProgress.value;
      const smoothProgress = THREE.MathUtils.lerp(current, target, 0.08); // 0.08 dictates the "lag/smoothness"

      canvasMatRef.current.uniforms.uProgress.value = smoothProgress;
      brushMatRef.current.uniforms.uProgress.value = smoothProgress;
    }
  });

  const img = texture.image as HTMLImageElement | undefined;
  const imageAspect = img ? img.width / img.height : 1;
  const planeHeight = height * 0.7;
  const planeWidth = planeHeight * imageAspect;

  const groupXOffset = -width / 4;

  return (
    <group position={[groupXOffset, 0, 0]}>
      <mesh>
        <planeGeometry args={[planeWidth, planeHeight, 1, 1]} />
        <shaderMaterial
          ref={canvasMatRef}
          vertexShader={CanvasRevealShader.vertexShader}
          fragmentShader={CanvasRevealShader.fragmentShader}
          uniforms={canvasUniforms}
          transparent={true}
          depthWrite={false}
        />
      </mesh>

      <points>
        <planeGeometry args={[planeWidth, planeHeight, 200, 200]} />
        <shaderMaterial
          ref={brushMatRef}
          vertexShader={ParticleFlightShader.vertexShader}
          fragmentShader={ParticleFlightShader.fragmentShader}
          uniforms={brushUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}