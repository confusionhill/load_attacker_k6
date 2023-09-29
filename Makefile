run-test:
	k6 run --vus 250 --duration 40s script.js
