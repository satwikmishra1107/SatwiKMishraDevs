import Spline from '@splinetool/react-spline';

export default function FooterOrb() {
    return (
        // Added `overflow-hidden` to clip anything outside the boundaries[cite: 2]
        <div className="relative w-full h-full overflow-hidden pointer-events-auto">
            {/* Scaled the canvas wrapper up to push the watermark off-screen */}
            <div className="absolute inset-0 flex justify-center items-center scale-[1.05] md:scale-115 origin-center">
                <Spline scene="https://prod.spline.design/u54Ul3jeZdU1oJIX/scene.splinecode?v=13" />
            </div>
        </div>
    );
}