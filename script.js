
// --------------------------------------
// --------------------------------------
// ------- CHIFOUMI par Franck ----------
// --------------------------------------
// --------------------------------------

window.addEventListener("load", () => {
	
	// on selectionne les elements html ici
	
	// le tableau avec le bom des joueurs (non utilisé ici, peut etre utilise pour changer dynamiquement de nom)
	const joueurs = document.querySelectorAll("th");
	// score des joueurs
	const scores = document.querySelectorAll("td p");
	
	// images en haut (joueur vs IA)
	const imagesjeux = document.querySelectorAll("section img");
	// images en bas (les 3 choix du joueur)
	const imagesselec = document.querySelectorAll("article img");
	
	// bouton pour reset
	const btnReset = document.querySelector("button");
	
	
	// on met en place des variables et tableaux pour la gestion du jeux et pour optimiser la recuperation de donnee
	
	// score de la confrontation en cours, 0 par default
	let score = 0;
	
	// si un choix a ete clique, clicked = 1, sinon clicked = 0
	let clicked = 0;
	
	// table avec les liens des images dans l'ordre interne ( 1 - pierre ; 2 - feuille ; 3 - ciseaux )
	const imageslist = ["./img/rock.png", "./img/paper.png", "./img/scissors.png"];
	
	// table qui montre toutes les combinaisons et leur resultat. ex: j1 -> 1 1 <- j2
	// y'a 9 combinaisons au total et 3 resultats different, donc ...
	const win_condition = [ 
	//   tie   p2    p1
		"11", "12", "13", 
		"22", "23", "21", 
		"33", "31", "32" 
	] // modulo de win_condition par 3 : equalite si 0, j2 gagne si 1, j1 gagne si 2	
	
	
	// DEBUT DU JEUX
	
	// fonction qui reinitialise toutes les images de joueur vs AI à default ainsi que le score
	function startGame() {
		
		for( let i = 0; i < imagesjeux.length; i++ ) {
			
			// on modifie la source de l'element html img
			imagesjeux[i].src = "./img/questionmark.png";
			// on reinitialise le score sur le tableau a 0
			scores[i].innerText = "0";
			
		}
		
		// variables pour le jeux
		score = 0;
		clicked = 0;
		
	}
	
	// pour toutes les images des choix pour le joueur
	for ( let j = 0 ; j < imagesselec.length ; j++ ) {
		
		// on y associe un event, et quand on clique sur les images ...
		imagesselec[j].addEventListener("click", (e) => {

			// on regarde si on a pas clique sur quelque chose avant. sinon ca fait rien du tout en on sort de l'evenement
			if ((clicked == 0)) {
			
				// pour toutes les images de choix
				for ( let l = 0 ; l < imagesselec.length ; l++ ) {
					
					// on y ajoute une classe pour eviter qu'en survolant la sourie sur l'image, une bordure rouge apparaisse
					imagesselec[l].classList.add("none");
					
				}
				
				// et sur l'image specifique qui a ete choisie, on enleve cette classe et on y ajoute une bordure rouge sans qu'on ai besoin de survoler l'image
				imagesselec[j].classList.remove("none");
				imagesselec[j].classList.add("hovered");
				
				// on a clique sur quelque chose ON NE PEUT PLUS CLIQUER SUR AUTRE CHOSE POUR L'INSTANT
				clicked = 1;
			
				// la source de l'image du joueur dans la section joueur vs IA est actualise a la valeur de l'image du choix (c'est long a expliquer mais ca fait sens)
				// pourquoi "attributes.src.value" au lieu de directement "src" ? car "src" donne une valeur absolute, et que ca casse tout
				imagesjeux[0].src = (e.target.attributes.src.value);
				
				// on initialise le score a 0
				score = 0;
				
				// et on dit que le score de la confrontation est egal a (valeur du choix de l'image) * 10. ex : pierre -> 10. tableau indexe a 0 donc on fait un + 10 au debut
				score += 10 + ( 10 * imageslist.indexOf(imagesjeux[0].attributes.src.value) );
				
				//rng entre 0 et 2 ; CHOIX DE L'IA
				let rng = Math.floor(Math.random() * 3);
				
				// on ajoute au score de la confrontation le choix de l'IA
				score = score + 1 + ( 1 * rng );
				
				// et on determine le resultat : 0 = egalite, 1 = victoire IA, 2 = victoire PJ
				let win = ( win_condition.indexOf(score.toString()) % 3 );
				
				// pour attendre 1 seconde (1000 ms)
				setTimeout( () => {
					
					// la source de l'image de l'IA dans la section joueur vs AI est actualise a l'image dans la table d'image dont l'index correspond avec la rng
					imagesjeux[1].src = imageslist[rng];	

					// si egalite
					if (win == 0) {
						
						// les deux images joueurs et IA ont une classe qui affiche une bordure orange
						imagesjeux[0].classList.add("tie");
						imagesjeux[1].classList.add("tie");
						
					// sinon si j2 (IA) gagne
					} else if (win == 1) {
						
						// le j1 est perdant, le j2 est gagnant, on ajoute des classes appropriees (vert pour gagnant, rouge pour perdant) et on increment le score du gagnant
						imagesjeux[0].classList.add("loser");
						imagesjeux[1].classList.add("winner");
						// pourquoi parseInt ? pour etre sur que la valeur du score est comprise comme un nombre et non une chaine de caractere (ne pas concatener)
						scores[1].innerText = ( parseInt(scores[1].innerText) + 1 );
						
					// sinon si j1 (joueur) gagne
					} else if (win == 2) {
						
						// c'est l'inverse
						imagesjeux[0].classList.add("winner");
						imagesjeux[1].classList.add("loser");
						scores[0].innerText = ( parseInt(scores[0].innerText) + 1 );
						
					}
					
					// un autre timer de 1 seconde
					setTimeout( () => {
						
						// sur les images joueur et IA
						for ( let k = 0 ; k < imagesjeux.length ; k++ ) {
							
							// on enleve toute les classes pour les bordures et on reinitialise la source de l'image
							imagesjeux[k].classList.remove("winner");
							imagesjeux[k].classList.remove("loser");
							imagesjeux[k].classList.remove("tie");
							imagesjeux[k].src = "./img/questionmark.png";
							
						}
						
						// sur les 3 choix du joueurs
						for ( let m = 0 ; m < imagesselec.length ; m++ ) {
							
							// on enleve les clesses css qui empechent qu'on voient une bordure rouge eu survolant une image
							imagesselec[m].classList.remove("none");
							imagesselec[m].classList.remove("hovered");
							
						}

						
					// et juste avant la fin du 2eme timer, on active la possibiliter de cliquer sur un choix ou sur un bouton
					clicked = 0;
						
					}, "1000");
					
				}, "1000");
				
			}
		
		});
	
	}
	
	// event sur le bouton : si on clique dessus ET que un combat joueur vs IA n'est pas en cours, alors on reinitialise la partie
	btnReset.addEventListener("click", () => {
		
		if (!(clicked)) {
			startGame();
		}
		
	});
	
});
