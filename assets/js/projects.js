const projectUl = document.querySelector('.project-list');
const projects = [
  {
    title: 'AMKOR P3',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture1.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'City of Dreams',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture8.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'E-PLDT',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture16.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'Unilab Mamplasan',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture17.png',
    tagList: [
      'Rigging',
      'Positioning',
    ],
  },
  {
    title: 'Tim Data Center',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture18.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'YSS Laboratories',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture19.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'Meridian Building',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture20.png',
    tagList: [
      'Crating',
      'Rigging',
    ],
  },
  {
    title: 'Unilever',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture21.png',
    tagList: [
      'Crating',
    ],
  },
  {
    title: 'Maynilad',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptatibus ullam eius. Asperiores obcaecati odio alias illum. Possimus, delectus dignissimos!',
    imgSrc: './assets/images/Picture22.png',
    tagList: [
      'Rigging',
    ],
  },
];

for(const project of projects){
  const {title, text, imgSrc, tagList} = project;
  let content =
  `<li>` +
    `<img src="${imgSrc}" loading="lazy" alt="placeholder">` +
    `<div class="text">` +
      `<h2>${title}</h2>` +
      `<p>${text}</p>` +
      `<ul class="tags">`;
  
  for(const tag of tagList)
    content += `<li>${tag}</li>`;

  projectUl.innerHTML += content + `</ul></div></li>`;
}