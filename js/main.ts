let connection = new WebSocket("ws://rp-led02:8765");

function changeColor(r: number, g: number, b: number): void {
	const payload = { r, g , b };
	connection.send(JSON.stringify(payload));
}

document.addEventListener("DOMContentLoaded", () => {
	const el_red = document.getElementById("red") as HTMLInputElement;
	const el_green = document.getElementById("green") as HTMLInputElement;
	const el_blue = document.getElementById("blue") as HTMLInputElement;

	const onInput = () => {
		changeColor(
			el_red.valueAsNumber,
			el_green.valueAsNumber,
			el_blue.valueAsNumber);
	};

	el_red.addEventListener("input", onInput);
	el_green.addEventListener("input", onInput);
	el_blue.addEventListener("input", onInput);
});
