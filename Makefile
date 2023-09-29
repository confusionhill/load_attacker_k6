run-test:
	k6 run --vus 250000000 --duration 4000s script.js
