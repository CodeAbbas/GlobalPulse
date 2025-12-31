import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          speed: Math.random() * 0.02,
          color: Math.random() > 0.8 ? '#fbbf24' : '#ffffff' // Occasional gold stars
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        star.alpha += star.speed * (Math.random() > 0.5 ? 1 : -1);
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 0.8) star.alpha = 0.8;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      createStars();
    });

    resizeCanvas();
    createStars();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-[#050505] z-0" />
      {/* Top Cool Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(50,50,80,0.2),transparent_60%)] z-0" />
      {/* Bottom Golden Glow (Rising Sun) */}
      <div className="fixed bottom-0 left-0 right-0 h-[60vh] bg-[radial-gradient(ellipse_at_center_bottom,rgba(245,158,11,0.12),transparent_70%)] z-0" />
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-70"
      />
    </>
  );
};

export default Background;