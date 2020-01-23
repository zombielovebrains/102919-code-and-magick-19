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

var renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var color;
  var maxTime = getMaxElement(times);
  var columnHeight;

  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      color = YOUR_COLOR;
    } else {
      var sat = Math.random() * 100;
      color = 'hsl(240, {sat}%, 50%)'.replace('{sat}', sat);
    }

    columnHeight = Math.floor(times[i] * MAX_COLUMN_HEIGHT / maxTime);
    ctx.textAlign = 'left';
    ctx.fillText(names[i], CLOUD_X + COLUMN_GAP * (i + 1) + COLUMN_WIDTH * i, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillStyle = color;
    ctx.fillRect(CLOUD_X + COLUMN_GAP * (i + 1) + COLUMN_WIDTH * i, CLOUD_HEIGHT - TEXT_HEIGHT - columnHeight, COLUMN_WIDTH, columnHeight);
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + COLUMN_GAP * (i + 1) + COLUMN_WIDTH * i + COLUMN_WIDTH / 2, CLOUD_HEIGHT - TEXT_HEIGHT - columnHeight - FONT_GAP);
  }
};
