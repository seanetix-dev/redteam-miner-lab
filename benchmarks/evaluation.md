# Detection Evaluation

## Objective

Evaluate the browser automation detector against controlled browser environments.

## Test Environments

| Environment       | Ground Truth |
| ----------------- | ------------ |
| Chromium Headful  | Human-like   |
| Chromium Headless | Automated    |

## Metrics

The evaluation tracks:

* True Positive
* True Negative
* False Positive
* False Negative
* Precision
* Recall
* F1 score
* Accuracy
* False Positive Rate

## Interpretation

The current dataset is intentionally small and controlled.

The results demonstrate that the evaluation framework works, but they should not be interpreted as evidence that the detector generalizes to all browsers or automation frameworks.

## Next Experiments

The next stage will expand the dataset to include:

* Chromium
* Edge
* Firefox
* Playwright
* Puppeteer
* Different browser versions
* Different launch configurations

The goal is to determine which signals remain reliable across environments and which produce false positives.
