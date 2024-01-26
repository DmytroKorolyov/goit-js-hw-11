// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  searchForm: document.querySelector('.search-form'),
  wrapperPictures: document.querySelector('.pictures-list'),
};

const loader = document.querySelector('.loader');


refs.searchForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
    e.preventDefault();
  const symbol = e.target.elements.query.value;
  
  loader.style.display = 'inline-block';


    
  setTimeout(() => {
        getPicture(symbol)
            .then(data => {
                renderPictures(data.hits);

                if (data.hits.length === 0) {
                    iziToast.error({
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        position: 'topRight',
                        backgroundColor: '#EF4040',
                        messageColor: '#FAFAFB',
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                loader.style.display = 'none';
            });
    }, 1000); 

    e.target.reset();
}

function getPicture(symbol) {
    const API_KEY = '42004606-5d03e591d800e1e125ea1f7b1'
    const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
    const PARAMS = new URLSearchParams({
        key: API_KEY,
        q: symbol,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
  });
    const url = `${BASE_URL}${END_POINT}?${PARAMS}`;
    
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    });
}

function pictureTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
    return `<li class="gallery-card">
  <a class="gallary-card-link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" />
    <ul class="image-info">
      <li class="image-item-info">
        <p>Likes</p>
        <p>${likes}</p>
      </li>
      <li class="image-item-info">
        <p>Views</p>
        <p>${views}</p>
      </li>
      <li class="image-item-info">
        <p>Comments</p>
        <p>${comments}</p>
      </li>
      <li class="image-item-info">
        <p>Downloads</p>
        <p>${downloads}</p>
      </li>
    </ul>
  </a>
</li>`;
}

function picturesTemplate(pictures) {
  return pictures.map(pictureTemplate).join('');
}

function renderPictures(pictures) {
  const markup = picturesTemplate(pictures);
  refs.wrapperPictures.innerHTML = markup;
  
  const lightbox = new SimpleLightbox('.gallery-card a.gallary-card-link', {
    captionDelay: 250,
    captionsData: 'alt',
  });
  lightbox.refresh();
}
















// // Описаний у документації
// import iziToast from "izitoast";
// // Додатковий імпорт стилів
// import "izitoast/dist/css/iziToast.min.css";
// // Описаний у документації
// import SimpleLightbox from "simplelightbox";
// // Додатковий імпорт стилів
// import "simplelightbox/dist/simple-lightbox.min.css";

// const refs = {
//   searchForm: document.querySelector('.search-form'),
//   wrapperPictures: document.querySelector('.pictures-list'),
// };




// refs.searchForm.addEventListener('submit', onSubmitForm);

// function onSubmitForm(e) {
//     e.preventDefault();
//   const symbol = e.target.elements.query.value;
  
//       
//   getPicture(symbol)
//     .then(data => {
//       renderPictures(data.hits);

//       if (data.hits.length === 0) {
//         iziToast.error({
//           message: 'Sorry, there are no images matching your search query. Please try again!',
//           position: 'topRight',
//           backgroundColor: '#EF4040',
//           messageColor: '#FAFAFB',
//         })
//       }
//     })
//     .catch(error => {
//       console.log(error)
//     }) 
//   .finally(() => {
//       setTimeout(() => {
//                 // Приховати індикатор завантаження після завершення запиту
//                 loader.style.display = 'none';
//             }, 2000); // 1000 мілісекунд (1 секунда) штучного затримання
//         });
    
//   e.target.reset();
// }

// function getPicture(symbol) {
//     const API_KEY = '42004606-5d03e591d800e1e125ea1f7b1'
//     const BASE_URL = 'https://pixabay.com';
//   const END_POINT = '/api/';
//     const PARAMS = new URLSearchParams({
//         key: API_KEY,
//         q: symbol,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true
//   });
//     const url = `${BASE_URL}${END_POINT}?${PARAMS}`;
    
//     return fetch(url).then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Network response was not ok');
//       }
//     });
// }

// function pictureTemplate({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//     return `<li class="gallery-card">
//   <a class="gallary-card-link" href="${largeImageURL}">
//     <img src="${webformatURL}" alt="${tags}" />
//     <ul class="image-info">
//       <li class="image-item-info">
//         <p>Likes</p>
//         <p>${likes}</p>
//       </li>
//       <li class="image-item-info">
//         <p>Views</p>
//         <p>${views}</p>
//       </li>
//       <li class="image-item-info">
//         <p>Comments</p>
//         <p>${comments}</p>
//       </li>
//       <li class="image-item-info">
//         <p>Downloads</p>
//         <p>${downloads}</p>
//       </li>
//     </ul>
//   </a>
// </li>`;
// }

// function picturesTemplate(pictures) {
//   return pictures.map(pictureTemplate).join('');
// }

// function renderPictures(pictures) {
//   const markup = picturesTemplate(pictures);
//   refs.wrapperPictures.innerHTML = markup;
  
//   const lightbox = new SimpleLightbox('.gallery-card a.gallary-card-link', {
//     captionDelay: 250,
//     captionsData: 'alt',
//   });
//   lightbox.refresh();
// }























































// Работает

// function onSubmitForm(e) {
//     e.preventDefault();
//     const symbol = e.target.elements.query.value;

//     // Перевірка, чи введено значення в інпут
//     if (!symbol.trim()) {
//         iziToast.error({
//             message: 'Please enter a search query.',
//             position: 'topRight',
//             backgroundColor: '#EF4040',
//             messageColor: '#FAFAFB',
//         });
//         return;
//     }

//     getPicture(symbol)
//         .then(data => {
//             // Перевірка, чи отримано результати від Pixabay API
//             if (data.hits.length === 0) {
//                 iziToast.error({
//                     message: 'No images found for the entered query. Please try again.',
//                     position: 'topRight',
//                     backgroundColor: '#EF4040',
//                     messageColor: '#FAFAFB',
//                 });
//             } else {
//                 renderPictures(data.hits);
//             }
//         })
//         .catch(() => {
//             iziToast.error({
//                 message: 'An error occurred while fetching images. Please try again.',
//                 position: 'topRight',
//                 backgroundColor: '#EF4040',
//                 messageColor: '#FAFAFB',
//             });
//         });

//     e.target.reset();
// }



























// // Описаний у документації
// import iziToast from "izitoast";
// // Додатковий імпорт стилів
// import "izitoast/dist/css/iziToast.min.css";
// // Описаний у документації
// import SimpleLightbox from "simplelightbox";
// // Додатковий імпорт стилів
// import "simplelightbox/dist/simple-lightbox.min.css";

// const refs = {
//   searchForm: document.querySelector('.search-form'),
//   wrapperPictures: document.querySelector('.pictures-list'),
// };

// refs.searchForm.addEventListener('submit', onSubmitForm);

// function onSubmitForm(e) {
//     e.preventDefault();
//     const symbol = e.target.elements.query.value;

    
//     getPicture(symbol).then(data => {
//       const markupIn = pictureTemplate(data);
//       refs.wrapperPictures.innerHTML = markupIn;
//     }).catch(iziToast.error({
//         message: 'Sorry, there are no images matching your search query. Please try again!',
//         position: 'topRight',
//         backgroundColor: '#EF4040',
//         messageColor: '#FAFAFB',
//     }))
//   e.target.reset();
// }




// function getPicture(symbol) {
//     const API_KEY = '42004606-5d03e591d800e1e125ea1f7b1'
//     const BASE_URL = 'https://pixabay.com';
//   const END_POINT = '/api/';
//     const PARAMS = new URLSearchParams({
//         key: API_KEY,
//         q: symbol,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true
//   });
//     const url = `${BASE_URL}${END_POINT}?${PARAMS}`;
    

//     return fetch(url).then(response => response.json());
// }

// function pictureTemplate({webformatURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,}) {

//     return `<li class="gallery-card">
//   <a class="gallary-card-link" href="${largeImageURL}">
//     <img src="${webformatURL}" alt="${tags}" />
//     <ul class="image-info">
//       <li class="image-item-info">
//         <p>Likes</p>
//         <p>${likes}</p>
//       </li>
//       <li class="image-item-info">
//         <p>Views</p>
//         <p>${views}</p>
//       </li>
//       <li class="image-item-info">
//         <p>Comments</p>
//         <p>${comments}</p>
//       </li>
//       <li class="image-item-info">
//         <p>Downloads</p>
//         <p>${downloads}</p>
//       </li>
//     </ul>
//   </a>
// </li>`
  
// }

// function picturesTemplate(pictures) {
//   return pictures.map(pictureTemplate).join('');
// }

// function renderPictures(pictures) {
//   const markup = picturesTemplate(pictures);
//   refs.wrapperPictures.innerHTML = markup;
// }

// ===================================================

// booksApi.getBooks().then(renderBooks);












// function addMarkup(markup) {
//   gallery.innerHTML = markup.join('');
//   lightbox = new SimpleLightbox('.gallery a', {
//     captionDelay: 250,
//     captionsData: 'alt',
//   });
// }








