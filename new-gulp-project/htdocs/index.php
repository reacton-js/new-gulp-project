<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <title>New Project</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
  </style>
  <link rel="stylesheet" href="css/style.css">
</head>
<?php
  function getPageName() {
    return isset($_GET['id']) ? $_GET['id'] : 'home';
  }
  function hasActive($page) {
    return $_GET['id'] === $page ? ' menu__item--active' : '';
  }
?>
<body id="<?= getPageName() ?>">
  <aside class="menu">
    <nav class="menu__inner menu__inner--wrapper">
      <a class="logo menu__logo" href="/">New Project</a>
      
      <a class="menu__link" href="/">
        <svg class="home menu__home">
          <use xlink:href="svg/symbols.svg#home"></use>
        </svg>
      </a>

      <button class="menu__button"></button>
      
      <a class="menu__item<?= hasActive(null) ?>" href="/">Home</a>
      <a class="menu__item<?= hasActive('about') ?>" href="/about">About</a>
      <a class="menu__item<?= hasActive('contacts') ?>" href="/contacts">Contacts</a>
      <a class="menu__item" href="#">Page4</a>
      <a class="menu__item" href="#">Page5</a>
      <a class="menu__item" href="#">Page6</a>
      <a class="menu__item" href="#">Page7</a>
      <a class="menu__item" href="#">Page8</a>
    </nav>
  </aside>

  <header class="header header--wrapper">
    <picture class="header__banner<?= $_GET['id'] ? ' header__banner--small' : '' ?>">
      <source media="(min-width: 740px)" srcset="img/large.webp" type="image/webp">
      <source media="(min-width: 740px)" srcset="img/large.jpg">
      <source srcset="img/medium.webp" type="image/webp">
      <img class="header__img" src="img/medium.jpg" alt="banner">
    </picture>
  </header>

  <main class="content content--wrapper">
    <?php include 'includes/'.getPageName().'.php' ?>
  </main>

  <footer class="footer">
    <div class="footer__inner footer__inner--wrapper">
      <p>© 2022-2023 | New Project
      </p>
    </div>
  </footer>

  <button class="button-up"></button>

  <script src="js/script.js"></script>

</body>
</html>