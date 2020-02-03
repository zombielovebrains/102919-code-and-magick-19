'use strict';

var WIZARDS_COUNT = 4;
var ESC_CODE = 27;
var ENTER_CODE = 13;
var names = ['Иван ', 'Хуан Себастьян ', 'Мария ', 'Кристоф ', 'Виктор ', 'Юлия ', 'Люпита ', 'Вашингтон '];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userConfig = document.querySelector('.setup');
var setupForm = userConfig.querySelector('.setup-wizard-form');
var buttonOpenSetup = document.querySelector('.setup-open');
var buttonCloseSetup = userConfig.querySelector('.setup-close');
var iconOpenSetup = buttonOpenSetup.querySelector('.setup-open-icon');
var wizardName = userConfig.querySelector('.setup-title');

var wizardCoat = userConfig.querySelector('.wizard-coat');
var wizardEyes = userConfig.querySelector('.wizard-eyes');
var fireball = userConfig.querySelector('.setup-fireball-wrap');

var changeFillColor = function (element, items) {
  var color = getRandomElement(items);
  element.style.fill = color;
  return color;
};

var changeBackgroundColor = function (element, items) {
  var color = getRandomElement(items);
  element.style.backgroundColor = color;
  return color;
};

wizardCoat.addEventListener('click', function () {
  setupForm.querySelector('input[name="coat-color"]').value = changeFillColor(wizardCoat, coatColors);
});

wizardEyes.addEventListener('click', function () {
  setupForm.querySelector('input[name="eyes-color"]').value = changeFillColor(wizardEyes, eyesColors);
});

fireball.addEventListener('click', function () {
  setupForm.querySelector('input[name="fireball-color"]').value = changeBackgroundColor(fireball, fireballColors);
});

var closeByEsc = function (evt) {
  if (evt.keyCode === ESC_CODE && wizardName !== document.activeElement()) {
    closeSetup();
  }
};

var openSetup = function () {
  userConfig.classList.remove('hidden');
  document.addEventListener('keydown', closeByEsc);
};

var closeSetup = function () {
  userConfig.classList.add('hidden');
  document.removeEventListener('keydown', closeByEsc);
};

buttonOpenSetup.addEventListener('click', function () {
  openSetup();
});

iconOpenSetup.addEventListener('focus', function () {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_CODE) {
      openSetup();
    }
  });
});

buttonCloseSetup.addEventListener('click', function () {
  closeSetup();
});

buttonCloseSetup.addEventListener('focus', function () {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_CODE || evt.keyCode === ESC_CODE) {
      closeSetup();
    }
  });
});

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var createWizard = function () {
  var wizard = {
    name: getRandomElement(names) + getRandomElement(lastNames),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  };
  return wizard;
};

var createWizardsList = function () { // Создаёт массив с объектами волшебников
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards.push(createWizard());
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
  var wizards = createWizardsList(); // Генерируем массив волшебников

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

similarListElement.appendChild(generateWizardFragment());

userConfig.querySelector('.setup-similar').classList.remove('hidden');
