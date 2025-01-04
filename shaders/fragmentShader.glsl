varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 c1 =  vec4(1.0, 0.604, 0.545, 1.0);
    vec4 c2 = vec4(1.);

    float v = smoothstep(-.1,1.,vElevation); //
    vec4 color = mix(c1,c2,v);

    // Calculate the gradient based on the elevation

    gl_FragColor = color; // Output the final color
}
