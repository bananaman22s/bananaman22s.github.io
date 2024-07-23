<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Happy Hour">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">

    <!-- App Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">

    <title>Assignment 2</title>
    <link rel="stylesheet" href="style.css"> <!-- Link to CSS stylesheet -->
    <script src="script.js" defer></script> <!-- Link to JavaScript file -->
</head>
<body>
    <!-- Your existing body content -->
    <header>
        <!-- Create logo -->
        <img src="images/cat.jpg" class="logo" alt="Logo">
        <nav>
            <!-- Hamburger menu button -->
            <button id="hamIcon" class="ham-icon">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
            <!-- Menu system with navigation buttons and dropdown -->
            <ul class="nav-list">
                <li><button id="page1btn">History</button></li> <!-- Button for page 1 -->
                <li><button id="page2btn">Cocktails</button></li> <!-- Button for page 2 -->
                <li><button id="page3btn">Types of alcohol</button></li> <!-- Button for page 3 -->
                <li><button id="fullscreenBtn">Toggle Fullscreen</button></li> <!-- Fullscreen button -->
            </ul>
        </nav>
    </header>
    
    <!-- Overlay with a heading -->
    <div class="video-overlay">
        <h1>Alcohol</h1>
    </div>
    
    <!-- Background video -->
    <video autoplay loop muted playsinline class="back-video">
        <source src="videos/alc.mp4" type="video/mp4">
    </video>

    <!-- Container for all pages -->
    <div id="pagecontainer">
        <!-- Page 1 content -->
        <div class="page" id="page1">
            <section class='hidden'>
                <div class="content-container">
                    <!-- Text box area -->
                    <div class="text-box">
                        <h2>The beginning</h2>
                        <p>Back in 7000-6000BCE, china used ingredients that contains sugar(sucrose,flucose,glucose,etc) and ferment them to make alcohol. Ingredients such as, honey, rice, fruits, etc.
                            Wine were made too using grapes in europe, which is a huge part of their culture and religion.    
                        </p>
                    </div>
                    <!-- Image containers -->
                    <div class="image-container">
                        <img src="images/alc1.jpg" alt="Image">
                    </div>
                    <div class="image-container">
                        <img src="images/alc2.jpg" alt="Image">
                    </div>
                    <!-- Another text box -->
                    <div class="text-box">
                        <h2>Mordern</h2>
                        <p>
                            Today, alcohol production is made easy using machinery. Beer, wines, spirits have been made accessible. State-of-the-art technology that guarantees high quality alcohol. Alcohol is still a huge part in modern culture and society, however it is noted that excessive consumption will lead to health risks.
                        </p>
                    </div>
                </div>
            </section>
        </div>
        
        <!-- Page 2 content with slider -->
        <div class="page" id="page2">
            <div class="slider">
                <button class="prev" onclick="prevSlide()">&#10094;</button>
                <div class="slider-wrapper">
                    <img src="images/margarita.jpg" class="slide" alt="Image 1">
                    <img src="images/EspressoMartini.jpg" class="slide" alt="Image 2">
                    <img src="images/Mojito.jpg" class="slide" alt="Image 3">
                    <img src="images/PinaColada.jpg" class="slide" alt="Image 4">
                    <img src="images/sexonthebeach.jpg" class="slide" alt="Image 5">
                    <img src="images/classicnegroni.jpg" class="slide" alt="Image 6">
                    <img src="images/oldfassion.jpg" class="slide" alt="Image 7">
                    <img src="images/Pimms.jpg" class="slide" alt="Image 8">
                </div>
                <button class="next" onclick="nextSlide()">&#10095;</button>
            </div>
            
            <!-- Text box for cocktails outside of the slider -->
            <div class="Cocktails">
                <div class="text-box" id="cocktail-text-box">
                    <p>Your text goes here. This is a sample text that you can replace with your actual content.</p>
                </div>
            </div>
        </div>
        
        <!-- Page 3 content -->
        <div class="page" id="page3">
            <section class="hidden">
                <div class="gallery">
                    <div class="page3-img"><h2>Base liquors - distilled alcoholic drink</h2></div>
                    <div class="page3-img"><h2>Liqueurs - distilled with plant products</h2></div>
                    <div class="page3-img"><h2>Wines - fermented grape juice</h2></div>
                    <div class="page3-img"><h2>Beer - fermented cereal grains</h2></div>
                </div>
            </section>
        </div>
    </div>

    <!-- Game Board Container -->
    <div id="game-container">
        <h1>Alcohol Crush</h1>
        <h1>Score: <span id="score">0</span></h1>
        <div id="board"></div>
    </div>
</body>
</html>
