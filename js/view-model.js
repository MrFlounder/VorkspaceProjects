
function Users(name){
    this.name = name;
}

var data = [];   
var viewModel = {
    vendors: ko.observableArray(data)
};

var obj = {
    users:ko.observableArray([new Users('Guangshuo Zang'),new Users('Kenny Chan')])
};

ko.applyBindings(viewModel);

var CREDENTIALS = {
    appId: 36862,
    authKey: 'bRKqvP2v6Zgh5ff',
    authSecret: '3mHcF7VZbxe4Sbc'
};


QB.init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret);

QB.createSession(function(err,result){
    console.log('Session create callback', err, result);
});

$('#sign_up').on('click', function() {
    console.log("start of method");
    var login = $('#signup_name').val();
    var password = $('#signup_pwd').val();
    var email = $('#email').val();
    var firstname = $('#first_name').val();
    var lastname = $('#last_name').val();
    var fullname = firstname + " " + lastname;
    
    var params = { 
        'login': login, 
        'password': password,
        'email' : email,
        'full_name' : fullname
    };
    QB.users.create(params, function(err, user){
        if (user) {
            $('#output_place').val(JSON.stringify(user));
        } else  {
            $('#output_place').val(JSON.stringify(err));
        }

        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    console.log("end of method");
});

$('#sign_in').on('click', function() {
    var login = $('#login_email').val();
    var password = $('#login_pwd').val();
    
    var params = { 'email': login, 'password': password};

    QB.login(params, function(err, user){
        if (user) {
            $('#output_place').val(JSON.stringify(user));
        
        } else  {
            $('#output_place').val(JSON.stringify(err));
        }


        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    
});

$('#getuser').on('click', function() {
    var params = { page: '1', per_page: '100'};
    QB.users.listUsers(params, function(err, result){
        if (result) {
            console.log(result.items);
            var x = result.items;
            viewModel.vendors(x);
        } else  {
            console.log(err);
        }
    });
});


$(document).ready(function(){    
    console.log("ko running!");
    
});

