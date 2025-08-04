window.onscroll = function (e) {
    if (window.scrollY >= screen.height) {
        document.getElementById("scroller").style.visibility = 'visible';
    } else {
        document.getElementById("scroller").style.visibility = 'hidden';
    }
};