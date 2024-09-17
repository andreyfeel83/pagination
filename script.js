const tabBox = document.querySelector('.tab-box');
const contentBox = document.querySelector('.content-box');
const allTabs = document.querySelectorAll('.tab');
const allContents = document.querySelectorAll('.content');
const arrowIcons = document.querySelectorAll('.icon img');

let isDragging = false;
let activeTab = 0;
allTabs[activeTab].classList.add('active');
console.log(activeTab);

const moveTab = () => {
	tabBox.querySelector('.active').classList.remove('active');
	contentBox.querySelector('.active').classList.remove('active');
	allTabs[activeTab].classList.add('active');
	allContents[activeTab].classList.add('active');
};

arrowIcons.forEach((icon) => {
	icon.addEventListener('click', () => {
		tabBox.scrollLeft += icon.id === 'left' ? -96 : 96;
		if (icon.id === 'right') {
			if (activeTab < allTabs.length - 1) {
				activeTab++;
			} else {
				activeTab = 0;
				tabBox.scrollLeft = 0;
			}
			moveTab();
		} else {
			if (activeTab > 0) {
				activeTab--;
			} else {
				activeTab = allTabs.length - 1;
				tabBox.scrollLeft = tabBox.scrollWidth;
			}
			moveTab();
		}
	});
});

allTabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		tabBox.querySelector('.active').classList.remove('active');
		contentBox.querySelector('.active').classList.remove('active');
		tab.classList.add('active');
		activeTab = Array.from(allTabs).indexOf(tab);
		allContents[activeTab].classList.add('active');
		console.log(activeTab);
	});
});

const dragging = (e) => {
	if (!isDragging) return;
	tabBox.classList.add('dragging');
	tabBox.scrollLeft -= e.movementX;
};

const dragStop = () => {
	isDragging = false;
	tabBox.classList.remove('dragging');
};

tabBox.addEventListener('mousedown', () => (isDragging = true));
tabBox.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
