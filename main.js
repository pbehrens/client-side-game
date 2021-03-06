red = 1;
yellow = 2;
outside = 3;
read = 0;

//create 2d array for storing the pucks
    field =  new Array(0,0,0,0,0,0,0);
	field[0] = new Array(0,0,0,0,0,0);
	field[1] = new Array(0,0,0,0,0,0);
	field[2] = new Array(0,0,0,0,0,0);
	field[3] = new Array(0,0,0,0,0,0);
	field[4] = new Array(0,0,0,0,0,0);
	field[5] = new Array(0,0,0,0,0,0);
	field[6] = new Array(0,0,0,0,0,0);

    //set the height of the board for the pucks
height =  new Array(5,5,5,5,5,5,5); 


function get(column, row){
	if ((column < 0) || (column > 6) || (row < 0) || (row > 5)) {
		return outside;
	}
	else {
		return (field[column][row]);
	}
}       

function put(column,color){
		if (color == red) 
			document.getElementById("board").innerHTML = document.getElementById("board").innerHTML + 
			'<div style="position:absolute; top:'+(height[column]*60+68)+'px; left:'+(column*60+3)+'px;"><img src="red.png" width=55 height = 55> </div>';
		if (color == yellow) 
			document.getElementById("board").innerHTML = document.getElementById("board").innerHTML + 
			'<div style="position:absolute; top:'+(height[column]*60+68)+'px; left:'+(column*60+3)+'px;"><img src="yellow.png" width=55 height = 55> </div>';
}


var won=false;

function set(column){
	if (height[column] == -1){
		alert("This column is full");	
	}
	else
	{
		field[column][height[column]] = red;
		height[column] = height[column] - 1;
		put(column,red);
		
			if (check(column,height[column]+1,4,red,false) == true) 
			{
				won=true;
				alert("You win");
				location.reload();
			}
			if ((height[0] == -1) && (height[1] == -1) && (height[2] == -1) && (height[3] == -1) && (height[4] == -1)  && (height[5] == -1) && (height[6] == -1)) 
			{
				alert("Draw Game");
				location.reload();
			}
			if (won != true) computer();
	}
}
//check
// x = xposition in the array y = y pos in array 
// amount is the amount of computer pucks in a row
// 
function check(x,y,amount,color,check_with_2){

	var i,j,k;
	var total1,total2,total3,total4;
	var total12,total22,total32,total42;
	var color2;
	var yes=false;

	if (color == red) {color2 = yellow;} else {color2 = red;}; 
	for (k=0;k<=3;k++){
		total1 = 0;
		total2 = 0;
		total3 = 0;
		total4 = 0;
		total12 = 0;
		total22 = 0;
		total32 = 0;
		total42 = 0;

	
		for(j=0;j<=3;j++){
			if (get(x-k+j,y) == color) {total1++;};
			if (get(x,y-k+j) == color) {total2++;};
			if (get(x-k+j,y-k+j) == color) {total3++;};
			if (get(x+k-j,y-k+j) == color) {total4++;};
			if (get(x-k+j,y) == color2) {total12++;};
			if (get(x,y-k+j) == color2) {total22++;};
			if (get(x-k+j,y-k+j) == color2) {total32++;};
			if (get(x+k-j,y-k+j) == color2) {total42++;};
			if (get(x-k+j,y) == outside) {total12++;};
			if (get(x,y-k+j) == outside) {total22++;};
			if (get(x-k+j,y-k+j) == outside) {total32++;};
			if (get(x+k-j,y-k+j) == outside) {total42++;};
		}
		
		if ((total1 >= amount) && (total12 == 0)) {yes = true;} else
		if ((total2 >= amount) && (total22 == 0)) {yes = true;} else
		if ((total3 >= amount) && (total32 == 0)) {yes = true;} else
		if ((total4 >= amount) && (total42 == 0)) yes = true;


		if ((yes == true) && (check_with_2 == true)){
			total12 = 0;
			total22 = 0;
			total32 = 0;
			total42 = 0;
			field[x][y] = color;
			height[x]--;

			for(j=0;j<=3;j++){
				if ((total1 >= amount) && (get(x-k+j,y) == read) && (get(x-k+j,height[x-k+j]+1) == read)) total12++;
				if ((total2 >= amount) && (get(x,y-k+j) == read) && (get(x,height[x]+1) == read)) total22++;
				if ((total3 >= amount) && (get(x-k+j,y-k+j) == read) && (get(x-k+j,height[x-k+j]+1) == read)) total32++;
				if ((total4 >= amount) && (get(x+k-j,y-k+j) == read) && (get(x+k-j,height[x+k-j]+1) == read)) total42++;
			}
			if ((total12 == 1) || (total22 == 1) || (total32 == 1) || (total42 == 1)) yes = false;
			height[x]++;
			field[x][y] = read;
		}
	}
return yes;
}

function computer(){
    // i is the column index, j in the row index 
	var x,i,j,k;
	var column;
	var count;
	chance = new Array(0,0,0,0,0,0,0);

    // set some sort of random number for the computer AI to make a decision that is somewhat educated, but also faulty in some way
	chance[0] = 13+Math.random()*4;
	chance[1] = 13+Math.random()*4;
	chance[2] = 16+Math.random()*4;
	chance[3] = 16+Math.random()*4;
	chance[4] = 16+Math.random()*4;
	chance[5] = 13+Math.random()*4;
	chance[6] = 13+Math.random()*4;

	for (i=0;i<=6;i++) if (height[i] < 0) chance[i] = chance[i]-30000;
	
	for (i=0;i<=6;i++)
	{
		//won
		if (check(i,height[i],3,yellow,false) == true) chance[i] = chance[i] + 20000;

		
		if (check(i,height[i],3,red,false) == true) chance[i] = chance[i] + 10000;

		//threre are 3 reds in a row
		if (check(i,height[i]-1,3,red,false) == true) chance[i] = chance[i] -4000;

		//there are 3 yellow in a row somehwere
		if (check(i,height[i]-1,3,yellow,false) == true) chance[i] = chance[i] -200;

		//
		if (check(i,height[i],2,red,false) == true) chance[i] = chance[i] +50+Math.random()*3;

		//
		if ((check(i,height[i],2,yellow,true) == true) && (height[i] > 0)){
			field[i][height[i]] = yellow;
			height[i]--;
			count = 0;
			for(j=0;j<=6;j++) if(check(j,height[j],3,yellow,false) == true) count++;
			if (count == 0) {chance[i] = chance[i] +60+Math.random()*2;} else {chance[i] = chance[i] - 60;}
			height[i]++;
			field[i][height[i]] = read;
	    }


		
		if (check(i,height[i]-1,2,red,false) == true) chance[i] = chance[i] -10;

		if (check(i,height[i]-1,2,yellow,false) == true) chance[i] = chance[i] -8;
        // use a random number to make the probabaility of winning lower
		if (check(i,height[i],1,red,false) == true) chance[i] = chance[i] +5+Math.random()*2;

		if (check(i,height[i],1,yellow,false) == true) chance[i] = chance[i] +5+Math.random()*2;
	

		if (check(i,height[i]-1,1,red,false) == true) chance[i] = chance[i] -2;


		//if it is yellow then 
		if (check(i,height[i]-1,1,yellow,false) == true) chance[i] = chance[i] +1;


		//look for tricks that can be played in the certain columns
		if ((check(i,height[i],2,yellow,true) == true) && (height[i] > 0)) {
			field[i][height[i]] = yellow;
			height[i]--;
			for(k=0;k<=6;k++)       
				if ((check(k,height[k],3,yellow,false) == true) && (height[k] > 0)) 
				{
					field[k][height[k]] = red;
					height[k]--;
					for(j=0;j<=6;j++) 
						if (check(j,height[j],3,yellow,false) == true) chance[i] = chance[i] + 2000;
					height[k]++;
					field[k][height[k]] = read;
				}
			height[i]++;
			field[i][height[i]] = read;
		}

		//check if some one can trick the other player
		if ((check(i,height[i],2,red,true) == true) && (height[i] > 0)) 
		{
			field[i][height[i]] = red;
			height[i]--;
			for(k=0;k<=6;k++)
				if ((check(k,height[k],3,red,false) == true) && (height[k] > 0)) 
				{
					field[k][height[k]] = yellow;
					height[k]--;
					for(j=0;j<=6;j++)
						if (check(j,height[j],3,red,false) == true) chance[i] = chance[i] + 1000;
					height[k]++;
					field[k][height[k]] = read;
				}
			height[i]++;
			field[i][height[i]] = read;
		}       


		if ((check(i,height[i]-1,2,red,true) == true) && (height[i] > 1))
		{
			field[i][height[i]] = red;
			height[i]--;
			for(k=0;k<=6;k++)
				if ((check(k,height[k]-1,3,red,false) == true) && (height[k] > 0))
				{
					field[k][height[k]] = yellow;
					height[k]--;
					for(j=0;j<=6;j++)
						if (check(j,height[j]-1,3,red,false) == true) chance[i] = chance[i] - 500;
					height[k]++;
					field[k][height[k]] = read;
				}
			height[i]++;
			field[i][height[i]] = read;
		}
	}

	column = 0;
	x = -10000;
	for(i=0;i<=6;i++)
	if (chance[i] > x)
	{
		x = chance[i];
		column = i;
	}

	field[column][height[column]] = yellow;
	height[column] = height[column] - 1;
	put(column,yellow);
	if (check(column,height[column]+1,4,yellow,false) == true) 
	{
		alert("You have lost");
		location.reload();
	}
	if ((height[0] == -1) && (height[1] == -1) && (height[2] == -1) && (height[3] == -1) && (height[4] == -1)  && (height[5] == -1) && (height[6] == -1)) 
	{
		alert("Draw game");
		location.reload();
	}
}
