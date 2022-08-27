import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	const hello = trpc.proxy.example.hello.useQuery({ text: "from tRPC" });

	const imgRef = useRef<HTMLImageElement>(null);
	const img = imgRef.current;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvas = canvasRef.current;
	const newImgRef = useRef<HTMLImageElement>(null);
	const newImg = newImgRef.current;

	useEffect(() => {
		if (canvas && img && newImg) {
			img.src =
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsBAMAAACLU5NGAAAAG1BMVEXMzMyWlpa3t7eqqqqcnJyjo6PFxcWxsbG+vr6NAD6nAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVR4nO3XO2/bMBDA8fNTGn2OlGS00S8QAWnnaKi7xnBQdJSBFl3joY/RRpHv3SNFykYtdKOm/w8BHOkOIM3HkRYBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/uddvWvsI38sj+7xT/2lJ2n8WH64iMbkdCaqurTPteqda98eX6+zKnu9OkdDckIH3W21kbmWlR5F9rrT+6ukTMv3ettFY3JC9UZyfZBJ0czrZxuWjXwtr5KmRSOnmy4ak9PJ3bc+PMveJvJ0a+OwslfNv1knG6Ks7KIhOaGxulYXsl7YmNy1j/XV4nLRXLtoSE4oczN2epLK5mRSuj/x/7tuPImfOfHDKXnRRUNyaq6l17bhu7aX/q1N1fY8Va7TIRqSE/tuS2a78i3Nludu7QsbsW4+54dlFw3JadVqM1Uf3b6XqSsO+4V/n+nrtGt7qrZdYzQkp6WuFLUtNW3DYebqzXoZk0ZqWzZGQ3LqblmLvhFtRq5Ho9Ct9c25OI1c52M0JKftlrzpc+9ozfSilOfbctjRsv226FtbtuBvLpJmOuza8hW7Zyfa4lpeJFl5H24nZr/Fz4srReNQt9ahW5nGpn8d/azFaEhOyJ8hNi+HtnBn5yrvClcsW+44slmL0UPyKj8Jh0/fmVjd12HxV+3hM+CZ6DZUFW4Q9+GOcPShuT6sw5o/3PovEKMhOaG5frZBWPXdt2a2xkMV2JeNuNI62H1LqmJXF9J3O7XbQ65t4xP9+OguFMPdTr9Zkd9I313eLaxt28X5VtUuqAPe5eVH/ckalPyl/THzFn/5jF0H9qEMZC/Fz4toTAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjpL514clJrNSt2AAAAAElFTkSuQmCC";

			const canvasCtx = canvas.getContext("2d") as CanvasRenderingContext2D;

			const width = img.width;
			const height = img.height;

			canvas.width = width;
			canvas.height = height;

			canvasCtx.drawImage(img, 0, 0);
			const imgData = canvasCtx.getImageData(0, 0, width, height);
			const newImgData = canvasCtx.createImageData(width, height);

			//alter image
			const data = newImgData.data;
			for (let rowIdx = 0; rowIdx < height; rowIdx++) {
				for (let colIdx = 0; colIdx < width; colIdx++) {
					//checkerboard
					if (
						((Math.floor(rowIdx / 20) % 2) + (Math.floor(colIdx / 20) % 2)) %
						2
					)
						continue;

					const pixelIdx = rowIdx * width + colIdx;
					const pixelDataIdx = pixelIdx * 4;
					const pixelData = data.slice(pixelDataIdx, pixelDataIdx + 4);

					const red = pixelData[0] as Number;
					const green = pixelData[1] as Number;
					const blue = pixelData[2] as Number;
					const alpha = pixelData[3] as Number;

					const newRed = 255;
					const newBlue = 0;
					const newGreen = 0;
					const newAlpha = 0.5 * 255;

					data[pixelDataIdx] = newRed;
					data[pixelDataIdx + 1] = newBlue;
					data[pixelDataIdx + 2] = newGreen;
					data[pixelDataIdx + 3] = newAlpha;
				}
			}

			canvasCtx.putImageData(newImgData, 0, 0);

			const base64URI = canvas.toDataURL();

			newImg.src = base64URI;
		}
	}, [canvas, img, newImg]);

	return (
		<>
			<Head>
				<title>Mosaicube</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<canvas ref={canvasRef} style={{ display: "none" }}></canvas>
				<img ref={imgRef} style={{ display: "none" }} />
				<img ref={newImgRef} />
			</main>
		</>
	);
};

export default Home;
