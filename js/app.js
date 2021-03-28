'use strict';
let leftIndex;
let rightIndex;
let middleIndex;
const names = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

let leftImage = document.getElementById('left-image');
let rightImage = document.getElementById('right-image');
let middleImage = document.getElementById('middle-image');
const imagesSection = document.getElementById('imageSection');
const buttonSec=document.getElementById('buttonSec');
const resultsList =document.getElementById('resultsList');
const resultsSection=document.getElementById('Results');
const h3El= resultsSection.insertBefore(document.createElement('h3'),resultsSection.firstChild);


function Image(name) {
  this.name = name;
  this.path = `./img/${name}.jpg`;
  this.votes = 0;
  this.views = 0;
  //Images.push(this);
  Image.all.push(this);
}
Image.all = [];

for(let i =0;i<names.length;i++){
  new Image(names[i]);
  if (Image.all[i].name==='sweep'){
    Image.all[i].path=`./img/${Image.all[i].name}.png`;
  }
  else if (Image.all[i].name==='usb'){
    Image.all[i].path=`./img/${Image.all[i].name}.gif`;
  }
}
console.log(Image.all);

let numberOne = 0;
let numberTwo = 0;
let numberThree = 0;


function randomNumber(min, max){
  numberOne = Math.floor(Math.random() * (max - min + 1)) + min;
  do {
    numberTwo = Math.floor(Math.random() * (max - min + 1)) + min;
  } while(numberOne === numberTwo);


  do {
    numberThree = Math.floor(Math.random() * (max - min + 1)) + min;
  } while(numberThree === numberTwo || numberThree === numberOne);

}

function render(){
  randomNumber(0,Image.all.length-1);

  leftImage.src = Image.all[numberOne].path;
  leftImage.alt = Image.all[numberOne].name;
  leftImage.title = Image.all[numberOne].name;
  console.log(numberOne);


  rightImage.src = Image.all[numberTwo].path;
  rightImage.alt = Image.all[numberTwo].name;
  rightImage.title = Image.all[numberTwo].name;
  console.log(numberTwo);


  middleImage.src = Image.all[numberThree].path;
  middleImage.alt = Image.all[numberThree].name;
  middleImage.title = Image.all[numberThree].name;
  console.log(numberThree);

  Image.all[numberOne].views++;
  Image.all[numberTwo].views++;
  Image.all[numberThree].views++;
}

imagesSection.addEventListener('click',handelClick);
let rounds=25;
let count=0;
function handelClick(event){

  if(event.target.id !== 'imageSection'){
    if(event.target.id === rightImage.id)
    {
      Image.all[numberTwo].votes++;
    }
    else if (event.target.id === leftImage.id){
      Image.all[numberOne].votes++;
    }
    else {
      Image.all[numberThree].votes++;
    }
    count+=1;}
  if (count===rounds){
    imagesSection.removeEventListener('click',handelClick);
    const results=buttonSec.appendChild(document.createElement('button'));
    results.textContent='Click to see results';
    results.addEventListener('click',addResults);
  }
  render();

}

function addResults(event){
  h3El.textContent='Results';
  for (let i = 0; i < Image.all.length; i++) {
    const liEl=resultsList.appendChild(document.createElement('li'));
    liEl.textContent=`${Image.all[i].name} has ${Image.all[i].votes} votes. and was seen ${Image.all[i].views} times.`;}}
render();
