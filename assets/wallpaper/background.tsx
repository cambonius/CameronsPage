'use client'

import React, { useState, useEffect, useRef } from 'react'

// https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/
const useMousePosition = () => {
    const [
        mousePosition,
        setMousePosition
    ] = useState({ x: null, y: null });
    useEffect(() => {
        const updateMousePosition = (ev: any) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};

export default function Background() {
    const canvasRef = useRef(null);

    let mousePos = useMousePosition();

    const hexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {     
        ctx.beginPath();
        ctx.moveTo(x + r, y)
        const increment = 2*Math.PI / 6;
        for (let angle = increment; angle <= Math.PI*2; angle += increment) {
            ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r)
        }
        ctx.closePath();
    }

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.strokeStyle = '#f0f000'
        ctx.lineWidth = 1;

        const hexRadius = 60; //window.innerWidth / 30;
        const hexWidth = hexRadius * 2;
        const hexHeight = hexRadius*Math.sqrt(3)/2;

        for (let x = -hexRadius; x < window.innerWidth + hexRadius; x += hexWidth*1.5) {
            let isEvenRow = true;
            for (let y = -hexRadius; y < window.innerHeight + hexRadius; y += hexHeight) {
                const a = mousePos!.x! - x - (isEvenRow ? hexWidth*1.5/2 : 0);
                const b = mousePos!.y! - y;
                const distance = Math.sqrt(a*a + b*b)
                const normDist = 255 - Math.min(distance, 255);

                ctx.strokeStyle = `hsl(${(x/5 + y/7) % 360},70%,50%)`
                ctx.globalAlpha = normDist / 255;
                hexagon(ctx, x + (isEvenRow ? hexWidth*1.5/2 : 0), y, hexRadius)
                ctx.stroke()
                isEvenRow = !isEvenRow;
            }
        }
    }

    // set canvas size
    useEffect(() => {
        const canvas: any = canvasRef.current
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }, [window.innerWidth, window.innerHeight]) // maybe error??? but it seems to work so whatever
    
    // draw hexagons
    useEffect(() => {
        const canvas: any = canvasRef.current;
        const context: CanvasRenderingContext2D = canvas.getContext('2d')
            
        let animationFrameId: number;

        const render = () => {
            draw(context!);
            animationFrameId = window.requestAnimationFrame(render);
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw, useMousePosition])

    return <canvas ref={canvasRef}  className="fixed w-screen h-screen top-0 left-0 -z-50" />
}