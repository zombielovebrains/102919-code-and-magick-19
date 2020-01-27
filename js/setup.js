'use strict';

var WIZARDS_COUNT = 4;
var names = ['Иван ', 'Хуан Себастьян ', 'Мария ', 'Кристоф ', 'Виктор ', 'Юлия ', 'Люпита ', 'Вашингтон '];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var userConfig = document.querySelector('.setup');
userConfig.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandom = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return index;
};

var createWizards = function () { // Создаёт массив с объектами волшебников
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    var wizard = {
      name: names[getRandom(names)] + lastNames[getRandom(lastNames)],
      coatColor: coatColors[getRandom(coatColors)],
      eyesColor: eyesColors[getRandom(eyesColors)]
    };
    wizards.push(wizard);
  }
  return wizards;
};

var renderWizard = function (wizard) { // Заполняет шаблон данными из объекта волшебника
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var generateWizardFragment = function () { // Генерируем фрагмент с заполненными шаблонами волшебников
  var fragment = document.createDocumentFragment();
  var wizards = createWizards(); // Генерируем массив волшебников

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};


similarListElement.appendChild(generateWizardFragment());

userConfig.querySelector('.setup-similar').classList.remove('hidden');
