
//allTags definito in index.php

$(function() {
	
	var boxes$ = $(".box");

	var allTagsFalse = true;

	var allTagsFalseFade = true,
		findappssize = $('#findapps').attr('size'),
		findlabel = 'search by title...';
	
	function checkAllTagsFalse()  //se tutti i tag sono disattivi mostra tutto!
	{
		var allFalse = true;
		for(t in allTags)
			if(allTags[t])
				allFalse = false;
		allTagsFalse = allFalse;
	}
	
	function filterBox(box$, active)
	{		
		if(active)
		{
			if(box$.parent().is('#deactives'))
				box$.fadeOut('fast',function() { box$.appendTo('#actives').fadeIn('slow'); });
		}else{
			if(box$.parent().is('#actives'))
				box$.fadeOut('fast',function() { box$.appendTo('#deactives').fadeIn('slow'); });
		}	
	}
	
	function filterBoxesForTags()	//mostra/nasconde box che hanno/non hanno tag tra quelli attivi
	{	
		boxes$.each(function() {
			
			var boxTags = $(this).data('tags').split(',');
			//i tags del box
			
			var active = false;
			for(var t in boxTags)
				if(allTags[boxTags[t]])
					active = true;
				//se il tag e' tra quell attivi show=true senno show RIMANE INVARIATO al valore precedente

			if(allTagsFalse)	//se tutti i tags sono disattivi non filtra nulla! e li mostra tutti
				active = true;
			
			filterBox($(this), active);

		});//*/
	}
	
	function filterBoxesForTitle(tit)	//nasconde i box tra quelli attivi che non contengono tit nel titolo
	{
		boxes$.each(function() {

			var boxTitle = $(this).data('title');
			var reg = new RegExp(tit,'ig');
			var hastit = boxTitle.search(reg)>-1;

			if( $(this).parent().attr('id')=='actives' )
				filterBox($(this),hastit);
		});		
	}	

	$('.tag').on('click', function(e) {
		e.preventDefault();
		
		var tags = location.hash ? $.unique(location.hash.split('#')[1].split(',')) : [],
			tag = $(this).children('span').text();
		
		allTags[tag] = allTags[tag] ? 0 : 1;
		
		if(allTags[tag])
			tags.push(tag);
		else
			tags.splice(tags.indexOf(tag),1);

		checkAllTagsFalse();  //se tutti i tag sono disattivi mostra tutto!
		filterBoxesForTags();
		$(".tag[href='#"+tag+"']").toggleClass('sel');

		window.location.hash = $.unique(tags).join();
	});

	$('#findapps')		// Ricerca tags
		.on('keyup', function() {

			var t = $(this).val();
			
			if(t.length<1) {

				checkAllTagsFalse();  //se tutti i tag sono disattivi mostra tutto!
				filterBoxesForTags();
				//mostra tutte le apps!!!
				//boxes$.fadeTo(0,1);
				
				return false;
			}
			
			if(t.length > parseInt(findappssize))
				$(this).attr('size',t.length+1);
			
			filterBoxesForTitle(t);
			//nasconde le apps che non contengono la parola!!
		})
		.on('click',function() {
			$(this).removeClass('inactive').val('');
		})
		.on('blur', function() {
			tf = setTimeout(function() {	//senza non funziona il link agli album nell'albero
				
				checkAllTagsFalse();  //se tutti i tag sono disattivi mostra tutto!
				filterBoxesForTags();
				//mostra tutte le apps!!!
				//boxes$.fadeTo(0,1);
				
			},500);
			$(this).addClass('inactive').val(findlabel).attr('size',findappssize);
		})
		.addClass('inactive').val(findlabel);

	var tags = location.hash ? $.unique(location.hash.split('#')[1].split(',')) : [];
	
	for(var t in tags)
	{
		var tag = tags[t];
		allTags[tag] = 1;
		$(".tag[href='#"+tag+"']").addClass('sel');
	}
	checkAllTagsFalse();
	filterBoxesForTags();
/*
	$.ajax({
		url: "https://api.github.com/users/stefanocudini/repos",
		jsonp: "callback",
		dataType: "jsonp",
		data: {
			type: "owner",
			access_token: '275e02f70a38c1dc818a60993124441589f3ad06'
		},
		success: function( response ) {

		    $('.box').each(function() {

				if(response.data && $.isArray(response.data))
				{
					var user = 'stefanocudini',
						name = $(this).data('name'),
						btnWatch = '<iframe class="repo-btn" src="'+
								'http://ghbtns.com/github-btn.html?user='+user+'&amp;repo='+name+'&amp;type=watch&amp;count=true'+
							'" frameborder="0" scrolling="0" width="100px" height="20px"></iframe>',
						btnStars = '<iframe class="repo-btn" src="'+
								'http://ghbtns.com/github-btn.html?user='+user+'&amp;repo='+name+'&amp;type=watch&amp;count=true'+
							'" frameborder="0" scrolling="0" width="100px" height="20px"></iframe>';
					
					var exists = response.data.filter(function(o) {
						return o.name == name;
					});

					console.log(name, exists);

					$(this).find('.btns').append(btnStars, btnWatch);
				}
	    	});
		}
	});*/
		
});

