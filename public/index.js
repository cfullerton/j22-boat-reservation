function nextDay(x){
    var now = new Date();    
    now.setDate(now.getDate() + (x+(7-now.getDay())) % 7);
    return now;
}
var today = new Date();
if(today.getDay() > 3 || today.getDay() < 2){
    $('#message').text("Boat Numbers will be added after drawing")
}
var nextWednesday = nextDay(3)
var wedString = nextWednesday.getMonth() + "/" + nextWednesday.getDate() + "/" + nextWednesday.getFullYear()
$('#Wednesday').text(wedString)
$.get('https://dbzhrf18nc.execute-api.us-east-1.amazonaws.com/dev/users',function(res){
    var response = res;
    for(var i = 0; i < response.Items.length;i++){
        var boat = ""
        if(response.Items[i].boat){
            boat = response.Items[i].boat
        }
        $('#userTable').append("<tr><td>"+response.Items[i].name+'</td><td>'+boat+'</td></tr>')
    }
})
var randomNumber = Math.random() * 10000
$('#userId').val("i-"+randomNumber)
console.log($('#userId').val())