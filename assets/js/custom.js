$( document ).ready(function() {
	fox();
});

// window.setInterval(fox, 1000);

var max_number_of_teams =16;

if(online==1){
    var x=httpGet(url);
	var teams=JSON.parse(x).teamInfoList; //from API
}else{
	var teams=teamsarray; //from FILE
}
if(online==1){
    var y=httpGet(url2);
    var players=JSON.parse(y).playerInfoList; //from API
}else{
	var players=playersarray; //from FILE
}
var counter=1;

var array = [];

function search(array, insert, cb) {
    var left = -1,
        right = array.length,
        actual;

    while (left !== right && left + 1 !== right) {
        actual = Math.floor((left + right) / 2);
        if (cb(array[actual]) >= cb(insert)) {
            left = actual;
            continue;
        }
        // else if(cb(array[actual]) == cb(insert)){
    		// if (points(array[actual]) >= points(insert)) {
    			// left = actual;
    			// continue;
    		// }else{
    			// right = actual;
    		// }
    	// }else 
    	if (cb(array[actual]) < cb(insert)) {
            right = actual;
        }
    }
    return left;
}


function teamtoarray(item, index) {
  	var insert = { "damage": item.damage,"playerName": item.playerName,"liveState": item.liveState,"rank": item.rank,"killNum": item.killNum, "teamId": item.teamId };
	var index = search(array, insert, function (a) { return a.damage; });
	array.splice(index + 1, 0, insert);
} 
function totalrank(item) {
	var player = players.find(function (el) {return el.teamId == item.teamId;});
	return player.rank;
}
function totalpoints(item) {
	var total=item.killNum*kill;
	var player = players.find(function (el) {return el.teamId == item.teamId;});
	if(solo==0){//teams
		if(player.rank==1){
			total+=First_Place;
		}else if(player.rank==2){
			total+=Second_Place;
		}else if(player.rank==3){
			total+=Third_Place;
		}else if(player.rank==4){
			total+=Fourth_Place;
		}else if(player.rank>=5 && player.rank<=10){
			total+=Fifth_Place_to_Tenth;
		}else if(player.rank>=11 && player.rank<=16){
			total+=Eleventh_to_Sixteen;
		}else if(player.rank>=17 && player.rank<=32){
			total+=Seventeen_to_Thirty_Two;
		}else if(player.rank>=33 && player.rank<=64){
			total+=Thirty_Three_to_Sixty_Four;
		}
	}else if(solo==1){//solo
		if(player.rank==1){
			total+=First_Place;
		}else if(player.rank==2){
			total+=Second_Place;
		}else if(player.rank==3){
			total+=Third_Place;
		}else if(player.rank>=4 && player.rank<=10){
			total+=Fourth_Place_to_Tenth;
		}else if(player.rank>=11 && player.rank<=20){
			total+=Eleventh_to_Twenty;
		}
	}else if(solo==2){//dous
		if(player.rank==1){
			total+=First_Place;
		}else if(player.rank==2){
			total+=Second_Place;
		}else if(player.rank==3){
			total+=Third_Place;
		}else if(player.rank==4){
			total+=Fourth_Place;
		}else if(player.rank>=5 && player.rank<=10){
			total+=Fifth_Place_to_Tenth;
		}else if(player.rank>=11 && player.rank<=16){
			total+=Eleventh_to_Sixteen;
		}else if(player.rank>=17 && player.rank<=32){
			total+=Seventeen_to_Thirty_Two;
		}else if(player.rank>=33 && player.rank<=64){
			total+=Thirty_Three_to_Sixty_Four;
		}
	}
	
	
	return total;
}


//printing
function fox(){
	
	if(online==1){
	    var x=httpGet(url);
		var teams=JSON.parse(x).teamInfoList; //from API
	}else{
		var teams=teamsarray; //from FILE
	}
	if(online==1){
	    var y=httpGet(url2);
	    var players=JSON.parse(y).playerInfoList; //from API
	}else{
		var players=playersarray; //from FILE
	}
	array = [];
	players.forEach(teamtoarray);
	
	
	teamss="";
	counter=1;
	array.forEach(team);
	document.getElementById("content").innerHTML=teamss;
 	// console.log(array);
}

function team(item, index) {
  teamss+=teamstotable(item);
}
function teamstotable(item, index) {

	if(counter<=max_number_of_teams)
	{
		if(item.rank>0){
			var rank='#'+item.rank;
			var total_points=item.total_points+'P';
		}else{
			var rank='';
			var total_points='';
		}
		var team='<tr class="liveState'+item.liveState+'">'
	      +'<th class="team-rank-td">'+counter++ +'#</th>'
	      // +'<th class="team-rank-td">'+rank +'</th>'
	      +'<th class="team-img-td"><img src="assets/img/'+lpad(item.teamId, 3)+'.png"></th>'
	      +'<td class="team-name-td">'+item.playerName+'</td>'
	      +'<td class="team-points-td">'+item.damage+'</td>'
	      // +'<td class="team-alive-td">'+alivehtml(item.liveMemberNum)+'</td>'
	    +'</tr>';
	}else{
		var team='';
	}
	
	return team;
}
function alivehtml(liveMemberNum) {
	if(liveMemberNum>=1){var first_alive='live';}
	if(liveMemberNum>=2){var sec_alive='live';}
	if(liveMemberNum>=3){var thr_alive='live';}
	if(liveMemberNum>=4){var frth_alive='live';}
  var html='<span class="member '+first_alive+'"></span>'
		+'<span class="member '+sec_alive+'"></span>'
		+'<span class="member '+thr_alive+'"></span>'
		+'<span class="member '+frth_alive+'"></span>';
		return html;
}
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}	 
		 
		 
		 
		 
		  