jQuery(document).ready(function ($) {
  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }
        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });
//Github Finder
$('#searchUser').on('keyup', function(e){
    let username = e.target.value;
// Make request to Github
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'97b26d4e8ed886bd89fa',
        client_secret:'f5ebe96125addf1d85c64d0c72f810011da3401f'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'97b26d4e8ed886bd89fa',
          client_secret:'f5ebe96125addf1d85c64d0c72f810011da3401f',
          sort: 'created: asc',
          per_page: 50
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
          <br />
          <h5 class="text-center;" style="text-transform: capitalize;"><strong>${repo.name}:</strong> ${repo.description}</h5>
               <br />
              <ul class="list-group">
               <li class="list-group-item d-flex justify-content-between align-items-center">Forks: ${repo.forks_count}</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Watchers: ${repo.watchers_count}</li>
               <li class="list-group-item d-flex justify-content-between align-items-center">Stars: ${repo.stargazers_count}</li>
                </div>
               <ul class="list-group">
               <br />
           <a href="${repo.html_url}" target="_blank" class="btn btn-lg btn-success">Repo Page</a>
         </ul>
    
          `);
        });
      });
      
      $('#profile').html(`
         <h2 class="text-center">${user.name}</h2>
         <img class="img-thumbnail rounded-circle mx-auto d-block" src="${user.avatar_url}">
         <br />
         <a href="${user.html_url}" target="_blank" class="btn btn-dark btn-lg btn-block">View Profile</a>
          <br /><br />
              <div class="column-md-12">
              <span class="badge badge-secondary"><strong>Public Repos:</strong> ${user.public_repos}</span>
              <span class="badge badge-primary"><strong>Public Gists:</strong> ${user.public_gists}</span>
              <span class="badge badge-success"><strong>Followers:</strong> ${user.followers}</span>
              <span class="badge badge-info"><strong>Following:</strong> ${user.following}</span>
              <br><br>
              <ul class="list-group">
             <li class="list-group-item d-flex justify-content-between align-items-center">Company: ${user.company}</li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Location: ${user.location}</li>
             <li class="list-group-item d-flex justify-content-between align-items-center">Member Since: ${user.created_at}</li>
              </ul>
              </div>
              <br />
       <h3 class="text-center">Latest Repos</h3>
        
        <div id="repos"></div>
      `);
    });
  });  

});
