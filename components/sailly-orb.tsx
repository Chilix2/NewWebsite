"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Sphere, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// -----------------------------------------------------------------------------
// TYPES & CONSTANTS
// -----------------------------------------------------------------------------

export type OrbState = "idle" | "listening" | "speaking";

interface SaillyOrbProps {
  /** Current state of the orb */
  state?: OrbState;
  /** Audio level (0.0 to 1.0), used to drive deformation amplitude */
  audioLevel?: number;
  /** Base size of the orb */
  size?: number;
  className?: string;
}

// Brand colors (normalized RGB)
const COLOR_CORAL = new THREE.Color("rgb(255, 155, 138)");
const COLOR_PEACH = new THREE.Color("rgb(255, 200, 185)");
const COLOR_PINK = new THREE.Color("rgb(255, 182, 203)");
// const COLOR_ORANGE = new THREE.Color("rgb(255, 190, 140)"); // Unused in shader currently

// -----------------------------------------------------------------------------
// SHADERS
// -----------------------------------------------------------------------------

const OrbMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmplitude: 0.5,
    uFrequency: 1.0,
    uColor1: COLOR_CORAL,
    uColor2: COLOR_PEACH,
    uColor3: COLOR_PINK,
    uIntensity: 0.0,
  },
  // Vertex Shader
  `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  // Simplex 3D Noise 
  // (Source: https://github.com/stegu/webgl-noise/blob/master/src/noise3D.glsl)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    // Add time-varying noise to the position
    float noiseVal = snoise(position * uFrequency + uTime * 0.5);
    
    // Displace vertices along normal
    vec3 newPosition = position + normal * noiseVal * uAmplitude;
    
    vPosition = newPosition;
    vDisplacement = noiseVal; // Pass to fragment for color variation

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uIntensity; // Driven by audio
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // View direction and Normal dot product
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float NdotV = dot(viewDir, vNormal);
    
    // 1. Transparency / Smoke Density
    // Calculate alpha based on displacement (noise) and edge fade
    // Lower start threshold makes "empty" parts more opaque/visible
    float noiseAlpha = smoothstep(-0.6, 0.4, vDisplacement);
    
    // Edges are softer/more transparent
    float edgeAlpha = smoothstep(0.0, 0.5, NdotV);
    
    // Combined Alpha
    float alpha = noiseAlpha * edgeAlpha;
    // Boost alpha higher so white areas are solid enough
    alpha = clamp(alpha + 0.4, 0.3, 0.98);

    // 2. Internal Glow (Core)
    // The "center" of the sphere (facing camera) gets the glowing core
    float coreIntensity = pow(max(NdotV, 0.0), 2.0);
    
    // 3. Color Mixing
    
    // Base White Smoke - Pure White
    vec3 whiteColor = vec3(0.98, 0.98, 1.0);

    // Mix Coral and Peach based on noise
    vec3 accentMix = mix(uColor1, uColor2, vDisplacement * 0.5 + 0.5);
    
    // Add Pink highlights in high-displacement areas
    accentMix = mix(accentMix, uColor3, smoothstep(0.3, 0.8, vDisplacement));
    
    // BLEND WHITE AND ACCENTS
    // Use noise to determine where the color "seeps" in.
    // Low displacement -> White (Persist longer)
    // High displacement -> Color
    // Changed smoothstep range to keep white dominance in lower/mid displacement
    vec3 smokeColor = mix(whiteColor, accentMix, smoothstep(0.2, 0.7, vDisplacement));

    // Apply core glow: Center is hotter/brighter Coral/Peach, edges are whiter
    vec3 finalColor = mix(smokeColor, uColor1 * 1.3, coreIntensity * 0.5);
    
    // Add audio intensity glow
    finalColor += uColor1 * uIntensity * 0.8;

    // 4. Rim Light (Fresnel) - KEEP SUBTLE
    // Sharp rim light for definition
    float fresnel = pow(1.0 - max(NdotV, 0.0), 4.0);
    finalColor += vec3(1.0, 1.0, 1.0) * fresnel * 0.6;

    gl_FragColor = vec4(finalColor, alpha);
  }
  `
);

extend({ OrbMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    orbMaterial: any;
  }
}

// Declare the new material in JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbMaterial: any;
    }
  }
}

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

function OrbMesh({ state, audioLevel }: { state: OrbState; audioLevel: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  // Smooth values for transitions
  const targetAmplitude = useRef(0.5);
  const targetFrequency = useRef(1.0);
  const currentAmplitude = useRef(0.5);
  const currentFrequency = useRef(1.0);
  const currentIntensity = useRef(0.0);

  useFrame((stateThree, delta) => {
    if (!materialRef.current) return;

    // Update time
    // Speed varies by state
    let speed = 0.9;
    if (state === "listening") speed = 0.6; // Slower, more focused
    if (state === "speaking") speed = 1.2; // Faster, energetic
    
    materialRef.current.uTime += delta * speed;

    // State Machine Logic for Targets
    switch (state) {
      case "idle":
        // Gentle breathing
        targetAmplitude.current = 0.5 + Math.sin(stateThree.clock.elapsedTime * 0.5) * 0.02;
        targetFrequency.current = 1.0;
        break;
      case "listening":
        // Reactive to audio, but focused
        targetAmplitude.current = 0.55 + audioLevel * 0.2;
        targetFrequency.current = 1.5;
        break;
      case "speaking":
        // High energy, rhythmic
        // Fallback to synthetic rhythm if no audio level provided
        const effectiveLevel = audioLevel > 0.01 
          ? audioLevel 
          : (Math.sin(stateThree.clock.elapsedTime * 8.0) * 0.5 + 0.5) * 0.3;
          
        targetAmplitude.current = 0.6 + effectiveLevel * 0.3;
        targetFrequency.current = 2.0;
        break;
    }

    // Smooth interpolation (Lerp)
    const lerpFactor = 0.1;
    currentAmplitude.current += (targetAmplitude.current - currentAmplitude.current) * lerpFactor;
    currentFrequency.current += (targetFrequency.current - currentFrequency.current) * lerpFactor;
    
    // Intensity reacts immediately to audio for "pop"
    currentIntensity.current = THREE.MathUtils.lerp(
      currentIntensity.current,
      audioLevel,
      0.2
    );

    // Update uniforms
    materialRef.current.uAmplitude = currentAmplitude.current;
    materialRef.current.uFrequency = currentFrequency.current;
    materialRef.current.uIntensity = currentIntensity.current;

    // Subtle rotation
    if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.05;
        meshRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <Sphere args={[1, 32, 32]} ref={meshRef}>
      <orbMaterial
        ref={materialRef}
        transparent={true}
        uColor1={COLOR_CORAL}
        uColor2={COLOR_PEACH}
        uColor3={COLOR_PINK}
      />
    </Sphere>
  );
}

export function SaillyOrb({
  state = "idle",
  audioLevel = 0,
  className = "w-64 h-64",
}: SaillyOrbProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FF9B8A" />
        <OrbMesh state={state} audioLevel={audioLevel} />
      </Canvas>
    </div>
  );
}

// -----------------------------------------------------------------------------
// HELPER HOOK FOR AUDIO ANALYSIS (Exported for convenience)
// -----------------------------------------------------------------------------

export function useAudioAnalyzer() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const [audioLevel, setAudioLevel] = React.useState(0);
  const [isListening, setIsListening] = React.useState(false);

  const updateLevel = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Calculate RMS (Root Mean Square) for volume
    let sum = 0;
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      sum += dataArrayRef.current[i];
    }
    const average = sum / dataArrayRef.current.length;
    
    // Normalize to 0-1 range (approximate max volume)
    const normalized = Math.min(average / 128, 1.0);
    setAudioLevel(normalized);

    rafRef.current = requestAnimationFrame(updateLevel);
  };

  const startListening = async () => {
    try {
      if (audioContextRef.current?.state === 'running') return;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      setIsListening(true);
      
      updateLevel();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    }
    
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsListening(false);
    setAudioLevel(0);
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return { startListening, stopListening, isListening, audioLevel };
}
