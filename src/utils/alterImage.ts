const alterImage = (data: Uint8ClampedArray, width: number, height: number) => {
	for (let rowIdx = 0; rowIdx < height; rowIdx++) {
		for (let colIdx = 0; colIdx < width; colIdx++) {
			//checkerboard
			if (((Math.floor(rowIdx / 20) % 2) + (Math.floor(colIdx / 20) % 2)) % 2)
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
};

export default alterImage;
