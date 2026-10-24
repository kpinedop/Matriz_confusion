import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateAllMetrics, calculateBusinessImpact } from './metrics';

test('calculates correct metrics for standard balanced matrix', () => {
  // TP=80, FN=20, FP=10, TN=90 -> Total=200
  const matrix = { tp: 80, fn: 20, fp: 10, tn: 90 };
  const res = calculateAllMetrics(matrix);

  assert.equal(res.total, 200);
  assert.equal(res.correct, 170); // 80 + 90
  assert.equal(res.errors, 30);   // 20 + 10

  // Accuracy: 170 / 200 = 0.85 (85%)
  assert.equal(res.accuracy.value, 0.85);
  assert.equal(res.accuracy.percentage, '85.0%');

  // Precision: 80 / (80 + 10) = 80/90 = 0.8888...
  assert.ok(res.precision.value !== null && Math.abs(res.precision.value - 80 / 90) < 0.0001);
  assert.equal(res.precision.percentage, '88.9%');

  // Recall: 80 / (80 + 20) = 80/100 = 0.8 (80%)
  assert.equal(res.recall.value, 0.8);
  assert.equal(res.recall.percentage, '80.0%');

  // Specificity: 90 / (90 + 10) = 90/100 = 0.9 (90%)
  assert.equal(res.specificity.value, 0.9);
  assert.equal(res.specificity.percentage, '90.0%');

  // F1-Score: 2 * (8/9 * 0.8) / (8/9 + 0.8) = 1.4222 / 1.6888 = 0.8421
  assert.ok(res.f1Score.value !== null && Math.abs(res.f1Score.value - 0.8421) < 0.001);

  // Error rate: 30 / 200 = 0.15 (15%)
  assert.equal(res.errorRate.value, 0.15);
  assert.equal(res.errorRate.percentage, '15.0%');
});

test('handles edge case: all zeros without crash or NaN', () => {
  const zeroMatrix = { tp: 0, fn: 0, fp: 0, tn: 0 };
  const res = calculateAllMetrics(zeroMatrix);

  assert.equal(res.total, 0);
  assert.equal(res.accuracy.value, null);
  assert.equal(res.accuracy.percentage, 'Indefinido');
  assert.equal(res.precision.value, null);
  assert.equal(res.recall.value, null);
  assert.equal(res.f1Score.value, null);
});

test('handles accuracy paradox in extreme imbalanced dataset', () => {
  // Fraud detection: 990 legitimate, 10 fraud.
  // Model predicts EVERYTHING as negative (TN=990, FN=10, TP=0, FP=0)
  const imbalanced = { tp: 0, fn: 10, fp: 0, tn: 990 };
  const res = calculateAllMetrics(imbalanced);

  // Accuracy is 99%
  assert.equal(res.accuracy.value, 0.99);
  assert.equal(res.accuracy.percentage, '99.0%');

  // Recall is 0%! Completely failed to detect any fraud!
  assert.equal(res.recall.value, 0);
  assert.equal(res.recall.percentage, '0.0%');
});

test('calculates business financial impact accurately', () => {
  // Streaming churn: TP=100 (saved customer worth $200), FP=50 (useless discount costing $15), FN=30 (lost customer costing $200)
  const impact = calculateBusinessImpact(
    { tp: 100, fn: 30, fp: 50, tn: 820 },
    15, // Cost FP
    200, // Cost FN
    200 // Benefit TP
  );

  // Benefit TP = 100 * 200 = 20,000
  // Cost FP = 50 * 15 = 750
  // Cost FN = 30 * 200 = 6,000
  // Net = 20000 - (750 + 6000) = 13,250
  assert.equal(impact.benefitTpTotal, 20000);
  assert.equal(impact.costFpTotal, 750);
  assert.equal(impact.costFnTotal, 6000);
  assert.equal(impact.netFinancialBalance, 13250);
});
