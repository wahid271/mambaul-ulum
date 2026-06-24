// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryItems.forEach(item => {
            const category = item.dataset.category;
            if (filter === 'all' || category === filter) {
                item.classList.remove('hide');
                item.style.display = 'block';
            } else {
                item.classList.add('hide');
                setTimeout(() => {
                    if (item.classList.contains('hide')) {
                        item.style.display = 'none';
                    }
                }, 500);
            }
        });
    });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentIndex = 0;
let visibleItems = [];

const updateVisibleItems = () => {
    visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
};

const openLightbox = (index) => {
    updateVisibleItems();
    currentIndex = index;
    const item = visibleItems[currentIndex];
    if (!item) return;

    lightboxImg.src = item.querySelector('img').src;
    lightboxTitle.textContent = item.querySelector('h4').textContent;
    lightboxDesc.textContent = item.querySelector('p').textContent;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

const showNext = () => {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox(currentIndex);
};

const showPrev = () => {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
};

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateVisibleItems();
        const visibleIndex = visibleItems.indexOf(item);
        openLightbox(visibleIndex);
    });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxNext?.addEventListener('click', showNext);
lightboxPrev?.addEventListener('click', showPrev);

lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});

console.log('🖼️ Gallery initialized');
