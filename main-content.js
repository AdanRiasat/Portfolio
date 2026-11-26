(function(){
    const btn = document.getElementById('back-top');
    window.onscroll = () => {
        btn.classList.toggle('active', document.documentElement.scrollTop > 300);
    };
})();
