'use strict';
let views=[];
let votes=[];
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

let r ;
let r1;
let arr = [3,2,4];
let arr1 = [2];
function randomNumber(min, max){

  arr =[];

  console.log(arr.some((val) => arr1.indexOf(val) !== -1));
  while(arr.length < 3){

    do {
      r = Math.floor(Math.random() * (max - min + 1)) + min;

    } while (arr1.includes(r));
    if(arr.indexOf(r) === -1) arr.push(r);}
  arr1 =[];
  while(arr1.length < 3 ){
    do {
      r1 = Math.floor(Math.random() * (max - min + 1)) + min;

    } while ((arr.includes(r1)));
    if(arr1.indexOf(r1) === -1) arr1.push(r1);

  }
  console.log(arr);
  console.log(arr1);


}
randomNumber(0,Image.all.length-1);

let count=0;
function render(){


  if (count%2 ===0) {

    leftImage.src = Image.all[arr[0]].path;
    leftImage.alt = Image.all[arr[0]].name;
    leftImage.title = Image.all[arr[0]].name;

    rightImage.src = Image.all[arr[1]].path;
    rightImage.alt = Image.all[arr[1]].name;
    rightImage.title = Image.all[arr[1]].name;

    middleImage.src = Image.all[arr[2]].path;
    middleImage.alt = Image.all[arr[2]].name;
    middleImage.title = Image.all[arr[2]].name;

    Image.all[arr[0]].views++;
    Image.all[arr[1]].views++;
    Image.all[arr[2]].views++;}
  else {
    leftImage.src = Image.all[arr1[0]].path;
    leftImage.alt = Image.all[arr1[0]].name;
    leftImage.title = Image.all[arr1[0]].name;

    rightImage.src = Image.all[arr1[1]].path;
    rightImage.alt = Image.all[arr1[1]].name;
    rightImage.title = Image.all[arr1[1]].name;



    middleImage.src = Image.all[arr1[2]].path;
    middleImage.alt = Image.all[arr1[2]].name;
    middleImage.title = Image.all[arr1[2]].name;

    Image.all[arr1[0]].views++;
    Image.all[arr1[1]].views++;
    Image.all[arr1[2]].views++;
    randomNumber(0,Image.all.length-1);}
}

imagesSection.addEventListener('click',handelClick);
let rounds=25;

function handelClick(event){

  if(event.target.id !== 'imageSection'){
    if (count%2===0) {
      if(event.target.id === rightImage.id)
      {
        Image.all[arr[1]].votes++;
      }
      else if (event.target.id === leftImage.id){
        Image.all[arr[0]].votes++;
      }
      else {
        Image.all[arr[2]].votes++;
      }
      count+=1;
      render();
    }

    else {
      if(event.target.id === rightImage.id)
      {
        Image.all[arr1[1]].votes++;
      }
      else if (event.target.id === leftImage.id){
        Image.all[arr1[0]].votes++;
      }
      else {
        Image.all[arr1[2]].votes++;
      }
      count+=1;
      render();
    }}
  if (count===rounds){
    imagesSection.removeEventListener('click',handelClick);
    const results=buttonSec.appendChild(document.createElement('button'));
    results.textContent='Click to see results';
    results.addEventListener('click',addResults);

  }
}
function addResults(event){
  h3El.textContent='Results';

  for (let i = 0; i < Image.all.length; i++) {
    votes.push(Image.all[i].votes);
    views.push(Image.all[i].views);
  }
  chartRender();
}
render();

function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: 'Product votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: votes
      },
      {
        label: 'Product views',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: views
      }]
    },

    // Configuration options go here
    options: {}
  });
}
