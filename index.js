//allTags definito in index.php
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));


document.addEventListener('DOMContentLoaded', () => {

	const tags = $('#tags');
	const boxes = $$('.box');
	
	const locationTags = location.hash ? 
		[...new Set(location.hash.split('#')[1].split(','))] : [];
	
	let allTagsFalse = true;
	let allTagsFalseFade = true;
	const findappssize = $('#findapps').getAttribute('size');
	const findlabel = 'search by title...';
	
	function checkAllTagsFalse() {
		allTagsFalse = Object.values(allTags).every(tag => !tag);
	}
	
	function filterBox(box, active) {
		const actives = $('#actives');
		const deactives = $('#deactives');
		
		if (active) {
			if (box.parentElement === deactives) {
				box.style.display = 'none';
				setTimeout(() => {
					actives.appendChild(box);
					box.style.display = '';
				}, 200);
			}
		} else {
			if (box.parentElement === actives) {
				box.style.display = 'none';
				setTimeout(() => {
					deactives.appendChild(box);
					box.style.display = '';
				}, 200);
			}
		}
	}
	
	function filterBoxesForTags() {
		boxes.forEach(box => {
			const boxTags = box.dataset.tags.split(',');
			const active = allTagsFalse || boxTags.some(tag => allTags[tag]);
			filterBox(box, active);
		});
	}
	
	function filterBoxesForTitle(tit) {
		boxes.forEach(box => {
			const boxTitle = box.dataset.title;
			const reg = new RegExp(tit, 'ig');
			const hastit = reg.test(boxTitle);
			
			if (box.parentElement.id === 'actives') {
				filterBox(box, hastit);
			}
		});
	}
	
	$('article').addEventListener('click', e => {
		const tagEl = e.target.closest('.tag');
		if (!tagEl) return;
		
		e.preventDefault();
		const tag = tagEl.querySelector('span').textContent;
		
		allTags[tag] = !allTags[tag];
		
		if (allTags[tag]) {
			locationTags.push(tag);
		} else {
			locationTags.splice(locationTags.indexOf(tag), 1);
		}
		
		checkAllTagsFalse();
		filterBoxesForTags();
		
		$$('.tag[href="#' + tag + '"]').forEach(el => 
			el.classList.toggle('sel'));
		
		if (locationTags.length > 0) {
			window.location.hash = [...new Set(locationTags)].join();
		}
	});
	
	const findapps = $('#findapps');
	let tf;
	
	findapps.addEventListener('keyup', function() {
		const t = this.value;
		
		if (t.length < 1) {
			checkAllTagsFalse();
			filterBoxesForTags();
			return false;
		}
		
		if (t.length > parseInt(findappssize)) {
			this.setAttribute('size', t.length + 1);
		}
		
		filterBoxesForTitle(t);
	});
	
	findapps.addEventListener('click', function() {
		this.classList.remove('inactive');
		this.value = '';
	});
	
	findapps.addEventListener('blur', function() {
		tf = setTimeout(() => {
			checkAllTagsFalse();
			filterBoxesForTags();
		}, 500);
		
		this.classList.add('inactive');
		this.value = findlabel;
		this.setAttribute('size', findappssize);
	});
	
	findapps.classList.add('inactive');
	findapps.value = findlabel;
	
	locationTags.forEach(tag => {
		allTags[tag] = 1;
		$$('.tag[href="#' + tag + '"]').forEach(el => 
			el.classList.add('sel'));
	});
	
	checkAllTagsFalse();
	filterBoxesForTags();
	
	$('h1').addEventListener('mouseenter', function(e) {
		this.classList.add('hover');
	}, { once: true });
});

