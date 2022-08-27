const alterImage = (data: Uint8ClampedArray, width: number, height: number) => {
	for (let rowIdx = 0; rowIdx < height; rowIdx++) {
		for (let colIdx = 0; colIdx < width; colIdx++) {
			const pixelIdx = rowIdx * width + colIdx;
			const pixelDataIdx = pixelIdx * 4;
			const pixelData = data.slice(pixelDataIdx, pixelDataIdx + 4);

			const red = pixelData[0] as number;
			const green = pixelData[1] as number;
			const blue = pixelData[2] as number;
			const alpha = pixelData[3] as number;

			const newRed = red * 0.65;
			const newGreen = green * 0.55;
			const newBlue = blue * 0.95;
			const newAlpha = 1 * 255;

			//checkerboard i.e. xor row/col parity
			if (((Math.floor(rowIdx / 20) % 2) + (Math.floor(colIdx / 20) % 2)) % 2) {
				data[pixelDataIdx] = 0;
				data[pixelDataIdx + 1] = 0;
				data[pixelDataIdx + 2] = 0;
				data[pixelDataIdx + 3] = 255;
			} else {
				data[pixelDataIdx] = newRed;
				data[pixelDataIdx + 1] = newGreen;
				data[pixelDataIdx + 2] = newBlue;
				data[pixelDataIdx + 3] = newAlpha;
			}
		}
	}
};

export default alterImage;
