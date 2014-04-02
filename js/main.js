$(function (){

	$('.equipe').each(function(index){

		var $container = $(this),
			$show = $container.find('.show'),
			$edit = $container.find('.edit'),

			$listeJoueurs = $container.find('.joueurs-list'),
			$listeJoueursEdit = $container.find('.joueurs-list-edit .joueurs-detail'),

			$colorPicker = $container.find('.joueurs-list-edit .colorPicker'),

			$addJoueur = $listeJoueursEdit.find('.joueurs-add'),

			$score = $container.find('.score'),
			$nom = $container.find('.nom'),
			$nomChange = $container.find('.nom-change'),


			score = 0,
			joueurs = {}
		;

		console.log($listeJoueursEdit)

		$container.find('.joueurs').click(function(){

			$show.toggleClass('hidden');
			$edit.toggleClass('hidden');

			bindName();

		});

		$('.options').click(function(){

			if(confirm("Commencer un nouveau match ?")){
				window.location.reload();
			}

		});

		//Fonction de gestion du nom

			function bindName(){

				$nom.text($nomChange.val()) ;
			}

		//Fonction de score
			$container.find('.plus').click(function(){
				score++ ;
				bindScore();
			});

			$container.find('.moins').click(function(){
				score-- ;
				bindScore();
			});

			function bindScore(){
				$score.text(score);
			}

		//Fonction de gestion des joueurs 
			var removeJoueur = function(){ delete joueurs[ $(this).parent().remove().attr('data-n') ] }

			$listeJoueursEdit.find('.supprimer').click(removeJoueur);

			$addJoueur.click(function(){

				$('<li>')
				.attr('data-n', 0)
				.append(
					$('<span>')
						.addClass('detail')
						.addClass('supprimer')
						.text('Supprimer')
						.click(removeJoueur)
				)
				.append(
					$('<span>')
						.addClass('numero')
						.append(
							$('<input>')
								.attr('type', 'number')
								.val(0)
						)
				)
				.insertBefore(this);

			});

			$container.find('.edit-list').click(function(){

				if($listeJoueurs.is(':visible')){
					$addJoueur.removeClass('hidden');
				}
				else {
					$addJoueur.addClass('hidden');
					$listeJoueursEdit.find('li[data-n]').each(function(index){

						var $t = $(this);

						if(!joueurs[ $t.attr('data-n') ]){ joueurs[ $t.attr('data-n') ] = {}; }

						joueurs[ $t.attr('data-n') ].numero = $t.find('.numero input').val()

					});

					$listeJoueurs.empty();
					console.log(joueurs);

					for (var n in joueurs) {
					
					$('<li>')
						.append(
								$('<span>')
									.addClass('detail')
									.text("rien")
						)
						.append(
							$('<span>')
								.addClass('numero')
								.text(joueurs[n].numero)
						)
						.appendTo($listeJoueurs)
					;
				};
				}

				$listeJoueurs.toggleClass('hidden');
				$listeJoueursEdit.parent().toggleClass('hidden');

			})

	})

});