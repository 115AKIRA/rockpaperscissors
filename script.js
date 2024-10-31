
window.addEventListener("load", () => {
	
	const joueurs = document.querySelectorAll("th");
	const scores = document.querySelectorAll("td p");
	
	const imagesjeux = document.querySelectorAll("section img");
	const imagesselec = document.querySelectorAll("article img");
	
	const btnReset = document.querySelector("button");
	
	let score = 0;
	
	const imageslist = ["rock.png", "paper.png", "scissors.png"];
	
	const combinations = [	
		["11", "22", "33"], //tie
		["13", "21", "32"], //p1 win
		["31", "12", "23"]  //p2 win
	];
	
	console.log(combinations);
	
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
		
			imagesjeux[0].src = (e.target.attributes.src.value);
			
			console.log(imagesjeux[0]);
			
			score += 10 + ( 10 * imageslist.indexOf(imagesjeux[0].attributes.src.value) );
			console.log("score = " + score);
			let rng = Math.floor(Math.random() * 3);
			console.log(rng);
			
			setTimeout( () => {
				score = score + 1 + ( 1 * rng );
				console.log(score);
				imagesjeux[1].src = imageslist[rng];
				
				console.log(score);
			}, "1000");
			
		
		});
	
	}
	
	startGame();
	
});