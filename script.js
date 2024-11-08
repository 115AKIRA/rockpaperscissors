
window.addEventListener("load", () => {
	
	const joueurs = document.querySelectorAll("th");
	const scores = document.querySelectorAll("td p");
	
	const imagesjeux = document.querySelectorAll("section img");
	const imagesselec = document.querySelectorAll("article img");
	
	const btnReset = document.querySelector("button");
	
	let score = 0;
	
	let clicked = 0;
	
	const imageslist = ["rock.png", "paper.png", "scissors.png"];
	
	const win_condition = [ 
	//   tie   p2    p1
		"11", "12", "13", 
		"22", "23", "21", 
		"33", "31", "32" 
	] // mod of win_condition by 3 : tie if 0, p2 win if 1, p1 win if 2
	
	function startGame() {
		
		for( let i = 0; i < imagesjeux.length; i++ ) {
			
			imagesjeux[i].src = "questionmark.png";
			scores[i].innerText = "0";
			score = 0;
			
		}
		
	}
	
	btnReset.addEventListener("click", () => {
		
		startGame();
		
	});
	
	for ( let j = 0 ; j < imagesselec.length ; j++ ) {
		
		imagesselec[j].addEventListener("click", (e) => {

			if (!(clicked)) {
				
				clicked = 1;
			
				imagesjeux[0].src = (e.target.attributes.src.value);
				
				score = 0;
				
				score += 10 + ( 10 * imageslist.indexOf(imagesjeux[0].attributes.src.value) );
				let rng = Math.floor(Math.random() * 3);
				
				score = score + 1 + ( 1 * rng );
				
				let win = ( win_condition.indexOf(score.toString()) % 3 );
				
				setTimeout( () => {
					
					imagesjeux[1].src = imageslist[rng];	

					if (win == 0) {
						
						imagesjeux[0].classList.add("tie");
						imagesjeux[1].classList.add("tie");
						
					} else if (win == 1) {
						
						imagesjeux[0].classList.add("loser");
						imagesjeux[1].classList.add("winner");
						scores[1].innerText = ( parseInt(scores[1].innerText) + 1 );
						
					} else if (win == 2) {
						
						imagesjeux[0].classList.add("winner");
						imagesjeux[1].classList.add("loser");
						scores[0].innerText = ( parseInt(scores[0].innerText) + 1 );
						
					}
					
					setTimeout( () => {
						
						for ( let k = 0 ; k < imagesjeux.length ; k++ ) {
							
							imagesjeux[k].classList.remove("winner");
							imagesjeux[k].classList.remove("loser");
							imagesjeux[k].classList.remove("tie");
							imagesjeux[k].src = "questionmark.png";
							
						}
						
					}, "1000");
					
				}, "1000");
				
				clicked = 0;
				
			}
		
		});
	
	}
	
	startGame();
	
});