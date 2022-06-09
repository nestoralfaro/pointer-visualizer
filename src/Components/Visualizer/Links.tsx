/*
    *   Sources
    Animating Canvas with React: https://medium.com/@ruse.marshall/converting-a-vanilla-js-canvas-animation-to-react-78443bad6d7b
    Drawing arrows: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
    Find coordinates on canvas: https://www.quirksmode.org/js/findpos.html
*/
import { useRef, useEffect, useState } from "react";

const Links = (props: any) => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState<any>(null);
    const canvas_arrow = (context: CanvasRenderingContext2D, frameCount:number, fromX: number, fromY: number, toX: number, toY: number) => {
        let headlen = 15; // length of head in pixels
        let dX = toX - fromX;
        let dY = toY - fromY;
        let angle = Math.atan2(dY, dX);

        context.moveTo(fromX, fromY);
        context.lineTo(fromX + (toX - fromX) * frameCount, fromY + (toY - fromY) * frameCount);
        if (frameCount > 0.99) {
            context.lineTo((toX - headlen * Math.cos(angle - Math.PI / 6)), toY - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(toX, toY);
            context.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        }
        context.stroke();
        context.lineCap = 'round';
    }

    const findPos = (obj: any): [number, number] => {
        let curleft = 0;
        let curtop = 0;

        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent)
            return [curleft, curtop];
        }
        return [0, 0];
    }

    const draw = (frameCount: number) => {
        if (!context) return;

        const labels = document.querySelectorAll('.label');
        const nodes = document.querySelectorAll('.node');
        const nexts = document.querySelectorAll('.next');
        const prevs = document.querySelectorAll('.prev');
        let links: Array<{fromX: number, fromY: number, toX: number, toY: number}> = [];
        
        labels.forEach((label: Element) => {
            if (label.firstChild?.textContent !== 'no label') {
                
                nodes.forEach((node: Element) => {
                    if (node.classList.contains(label.firstChild?.textContent as string)) {
                        const [labelX, labelY] = findPos(label);
                        const [nodeX, nodeY] = findPos(node);
                        links.push({fromX: labelX + 100, fromY: labelY + 75, toX: nodeX + 175, toY: nodeY + 75});
                        return;
                    }
                })
            }
        })
        prevs.forEach((prev: Element) => {

            labels.forEach((label: Element) => {
                
                if (label.firstChild?.textContent === prev.firstChild?.textContent) {
                    const [nextX, nextY] = findPos(prev);
                    const [labelX, labelY] = findPos(label);
                    links.push({fromX: nextX + 200, fromY: nextY + 32, toX: labelX + 100, toY: labelY + 75});
                    return;
                }
            })
            
        })
        nexts.forEach((next: Element) => {

            labels.forEach((label: Element) => {
                
                if (label.firstChild?.textContent === next.firstChild?.textContent) {
                    const [nextX, nextY] = findPos(next);
                    const [labelX, labelY] = findPos(label);
                    links.push({fromX: nextX + 200, fromY: nextY + 32, toX: labelX + 100, toY: labelY + 75});
                    return;
                }
            })
            
        })
        context.beginPath();
        links.forEach(({fromX, fromY, toX, toY}) => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.lineWidth = 2;
            context.strokeStyle = '#c9d1d9';
            canvas_arrow(context, frameCount, fromX, fromY, toX, toY);
        })

    };

    useEffect(() => {
        if (canvasRef.current) {
            const canvas: any = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext("2d");
            setContext(ctx);
        }
    }, []);

    useEffect(() => {
        let frameCount = 0;
        let animationFrameId: number;
        if (context) {
            const render = () => {
                frameCount += 0.01;
                if (frameCount <= 1) {
                    draw(frameCount);
                    animationFrameId = window.requestAnimationFrame(render);
                }
            };
            render();
        }
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw, context]);
    return <canvas ref={canvasRef} {...props} />;
};

export default Links;