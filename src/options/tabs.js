module.exports = {
  onLoad: function() {

    var tablinks = document.querySelectorAll('#tabs a');

    tablinks.forEach(function(tablink) {

      tablink.addEventListener('click', function(e) {

        document.querySelectorAll('section').forEach(function(section) {
          section.style.display = 'none';
        });

        document.querySelectorAll('#tabs li[class=selected]').forEach(function(li) {
          li.className = "";
        });

        var sectionId = e.target.href.split('#').pop() + '-settings';
        document.getElementById(sectionId).style.display = 'block';

        e.target.parentNode.className = "selected";

      });

    });
  }
};
