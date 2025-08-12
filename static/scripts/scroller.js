window.onscroll = function (e) {
    if (window.scrollY >= screen.height) {
        document.getElementById("scroller").style.display = 'block';
    } else {
        document.getElementById("scroller").style.display = 'none';
    }
};