(function(){
    window.onscroll = () => {
    let btn = document.getElementById('back-top');
    let mainPage = document.getElementsByClassName('main-page')
    if (mainPage > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "flex";
    } else {
        btn.style.display = "none";
    }
};
})();

