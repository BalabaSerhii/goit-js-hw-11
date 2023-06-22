import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getData } from "./pixabay";

const refs = {
	search: document.querySelector('.search-form'),
	gallery: document.querySelector('.gallery'),
	loadMoreBtn: document.querySelector('.js-guard'),
	target: document.querySelector('.js-guard'),
};

let query = '';
let currentPage = 1;
const perPage = 40;

refs.loadMoreBtn.classList.add('is-hidden');

// Magnification of images when clicked
let lightbox = new simpleLightbox('.photo-card a', {
	captionDelay: 250,
});

// Endless scrolling down
const options = {
	root: null,
	rootMargin: '200px',
	threshold: 1.0,
};

let observe = new IntersectionObserver(onLoad, options);
function onLoad(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			currentPage += 1;
			lightbox.refresh();
			showPhotos(query, currentPage);
		}
	});
};

// Performing image search and playback by subject