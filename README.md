# Browser Detection Benchmark

This directory contains locally generated browser detection experiments.

## Environment

* OS: Windows 11 / WSL2
* Runtime: Node.js
* Browser: Chromium
* Automation framework: Playwright

## Experiments

| Environment         | Expected purpose                |
| ------------------- | ------------------------------- |
| Chromium headful    | Baseline browser                |
| Chromium headless   | Headless detection              |
| Playwright headful  | Automation framework comparison |
| Playwright headless | Automated headless comparison   |

## Metrics

The experiments currently collect:

* `navigator.webdriver`
* User agent
* Browser plugins
* Languages
* Platform
* CPU concurrency
* Device memory
* Chrome object availability
* Detection score
* Classification

## Important

These results are experimental observations from a controlled local environment.

They should not be interpreted as universal browser-detection rules.

Future experiments will measure:

* False-positive rate
* False-negative rate
* Detection consistency
* Execution time
* Signal reliability
* Browser/version differences
