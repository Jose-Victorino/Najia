const projectUl = document.querySelector('.project-list');
const projects = [
  {
    title: 'AMKOR P3',
    imgSrc: './assets/images/Picture1.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'City of Dreams',
    imgSrc: './assets/images/Picture8.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'E-PLDT',
    imgSrc: './assets/images/Picture16.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'Unilab Mamplasan',
    imgSrc: './assets/images/Picture17.png',
    tagList: [
      'Rigging',
      'Positioning',
    ],
  },
  {
    title: 'Tim Data Center',
    imgSrc: './assets/images/Picture18.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'YSS Laboratories',
    imgSrc: './assets/images/Picture19.png',
    tagList: [
      'Rigging',
    ],
  },
  {
    title: 'Meridian Building',
    imgSrc: './assets/images/Picture20.png',
    tagList: [
      'Crating',
      'Rigging',
    ],
  },
  {
    title: 'Unilever',
    imgSrc: './assets/images/Picture21.png',
    tagList: [
      'Crating',
    ],
  },
  {
    title: 'Maynilad',
    imgSrc: './assets/images/Picture22.png',
    tagList: [
      'Rigging',
    ],
  },
];

for(const project of projects){
  const {title, text, imgSrc, tagList} = project;
  let content =
  `<li>
    <img src="${imgSrc}" loading="lazy" alt="placeholder">
      <div class="text">
      <h3>${title}</h3>`;
  
  content += `<p class="tags">${tagList.join(', ')}</p>`;

  projectUl.innerHTML += content + `</div></li>`;
}