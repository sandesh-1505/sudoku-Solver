
// creating a 2d array in which  each element will store its id  that is given in the html file
var arr = [[], [], [], [], [], [], [], [], []]
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}

// created a 2d array for storing the response revied from the API
var board = [[], [], [], [], [], [], [], [], []]

// after receving the board from the API we will call this function  
// this function will assign the value receive from the API of each cell (using its id )to corresponding cell  if its filled 
// if not filled than assign with space

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

// on clicking to get puzzel this function execute and send request to API  by the below link which fetch a board of suduko each time we click we get new suduko 
GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

// on clicking solve puzzel it will start executing this function
SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};



function issafe(board,i,j,num,n){
	for(x=0;x<n;x++){

		if(board[i][x]==num) // row check
			return false;

			if( board[x][j]==num){
		   return false// column check
		}
	}

	let rn = Math.sqrt(n);
	
	let si = i-i%rn;
	let sj = j-j%rn;
	

	for(let x=si;x<si+rn;x++){
		for(let y=sj;y<sj+rn;y++){
			if(board[x][y]==num){
				return false;
			}
		}
	}
     
	
	return true;
}

function SudokuSolver(board, i, j, n){
     if(i==n){
		// reaching here means that we had solved suduko 
		FillBoard(board);// calling this function now so that it will assign all the remaining unfilled cells with the numbers calculated by the backtracking
		return true;
	 }
	 if(j==n){
		return SudokuSolver(board,i+1,0,n);
	 }
	 if(board[i][j]!=0){
		return SudokuSolver(board,i,j+1,n);
	 }
      
	 for(let num=1;num<=9;num++){
		if(issafe(board,i,j,num,n))
		{
			board[i][j]=num;
			let subAns = SudokuSolver(board,i,j+1,n);
                       
			if(subAns==true){
				return true;
			}
			board[i][j]=0;
		}
	 }
	 return false;
}