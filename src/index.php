<script>
    var hash = window.location.hash.substring(14);
    var startIndexToken = hash.indexOf('&');
    var startIndexUserId = hash.lastIndexOf('user_id=') + 8;
    var access_token = hash.slice(0, startIndexToken);
    var user_id = hash.slice(startIndexUserId, hash.length);
    //alert(access_token + " и " + user_id);
</script>
<head><script src="https://vk.com/js/api/openapi.js?167" type="text/javascript"></script></head>
<body>


    <button onclick="callUserName(user_id)">Имя хочешь?</button>
    <button onclick="wallPostHello(user_id, access_token, document.forms.giverName.name.value)">Отправить привет на стену от</button>
    <form name="giverName">
        <input name="name" placeholder ="Ваше имя" spellcheck="true">
    </form>

<script type="text/javascript">
var mysql = require('mysql')
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'u0991630_sima',
password : 'nasralkorol',
database : 'u0991630_redactor'
});

connection.connect()

connection.query('SELECT * FROM access_token')
alert("connect")

connection.end()
</script>

<script type="text/javascript">
function wallPostHello (user_id, access_token, name) {
    if (name == "" || name == null) name = "Неизвестного";
    VK.Api.call('wall.post', {owner_id: -183268158, from_group: 1, message: "Привет из хелпера от " + name, access_token : access_token, v:"5.103"}, function(r) {
  if(r.response) {
    alert('Проверь группу ' + access_token + " id:" + r.response.post_id);
  }
});
}

function callUserName (user_id) {
    //alert(user_id);
    VK.Api.call('users.get', {user_ids: user_id, v:"5.73"}, function(r) {
        if(r.response) {
         alert('Привет, ' + r.response[0].first_name);
        }
    });
}
  VK.init({
    apiId: 7367967
  });
</script>
</body>
