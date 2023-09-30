run-test:
	k6 run --vus 8750 --duration 240s script.js
