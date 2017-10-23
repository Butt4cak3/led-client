const WS_URL = "ws://rp-led02:8765";

document.addEventListener("DOMContentLoaded", () => {
	const connection = new WebSocket(WS_URL);

	const el_red = document.getElementById("red") as HTMLInputElement;
	const el_green = document.getElementById("green") as HTMLInputElement;
	const el_blue = document.getElementById("blue") as HTMLInputElement;

	function sendMessage(data: any) {
		connection.send(JSON.stringify(data));
	}

	function onInput(): void {
		changeColor(
			el_red.valueAsNumber,
			el_green.valueAsNumber,
			el_blue.valueAsNumber);
	}

	function changeColor(r: number, g: number, b: number): void {
		sendMessage({
			action: "set",
			color: { r, g, b }
		});
	}

	connection.onopen = () =>  {
		sendMessage({
			action: "get"
		});
	};

	connection.onmessage = (e) => {
		let color = JSON.parse(e.data);

		el_red.value = color.r;
		el_green.value = color.g;
		el_blue.value = color.b;
	};

	el_red.addEventListener("input", onInput);
	el_green.addEventListener("input", onInput);
	el_blue.addEventListener("input", onInput);
});
