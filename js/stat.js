'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var TEXT_HEIGHT = 30;
var COLUMN_GAP = 50;
var COLUMN_WIDTH = 40;
var MAX_COLUMN_HEIGHT = 150;
var YOUR_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getColor = function (name) {
  var color;

  if (name === 'Вы') {
    color = YOUR_COLOR;
  } else {
    var sat = Math.random() * 100;
    color = 'hsl(240, {sat}%, 50%)'.replace('{sat}', sat);
  }

  return color;
};

var renderHeader = function (ctx, strings) {
  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'left';

  for (var i = 0; i < strings.length; i++) {
    ctx.fillText(strings[i], CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * (i + 1));
  }
};

var renderColumn = function (ctx, height, color, coef) {
  ctx.fillStyle = color;
  ctx.fillRect(CLOUD_X + COLUMN_GAP * (coef + 1) + COLUMN_WIDTH * coef, CLOUD_HEIGHT - TEXT_HEIGHT - height, COLUMN_WIDTH, height);
};

var renderText = function (ctx, name, time, height, coef) {
  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';
  ctx.fillText(name, CLOUD_X + COLUMN_GAP * (coef + 1) + COLUMN_WIDTH * coef, CLOUD_HEIGHT - FONT_GAP);
  ctx.textAlign = 'center';
  ctx.fillText(time, CLOUD_X + COLUMN_GAP * (coef + 1) + COLUMN_WIDTH * coef + COLUMN_WIDTH / 2, CLOUD_HEIGHT - TEXT_HEIGHT - height - FONT_GAP);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderHeader(ctx, ['Ура вы победили!', 'Список результатов:']);

  var maxTime = getMaxElement(times);
  var columnHeight;

  for (var i = 0; i < names.length; i++) {
    columnHeight = Math.floor(times[i] * MAX_COLUMN_HEIGHT / maxTime);
    renderText(ctx, names[i], Math.floor(times[i]), columnHeight, i);
    renderColumn(ctx, columnHeight, getColor(names[i]), i);
  }
};
