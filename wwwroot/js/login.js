$(document).ready(function () {
    PreloadLogin();
});
function PreloadLogin() {
    $.ajax({
        type: 'POST',
        url: '/Login/LoadPictures',
        contenttype: "application/json; charset=utf-8",
        success: function (r) {
            if (r.status == "success") {
                document.body.style.backgroundImage = 'url(' + r.background + ')';
                document.body.style.backgroundImage = 'url(' + r.florkillo + ')';
            } else {
                console.log(r.message);
            }
        }
    });
}
function FacebookLogin() {
    location.href = '/Account/ExternalLogin?provider=Facebook';
}
function GoogleLogin() {
    location.href = '/Account/ExternalLogin?provider=Google';
}