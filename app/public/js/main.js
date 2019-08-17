var base_url = window.location.protocol + "//" + window.location.host + "/"

$(document).ready(function(){
    clickActions();

});

function clickActions() {
    $('.login').click(()=> {
        window.location.href = base_url + 'login';
    })
    $('.signup').click(()=> {
        window.location.href = base_url + 'signup';
    })
}