let cnv;
let checkbox;
let circles = [];

function setup() {
    cnv = createCanvas(window.innerWidth, window.innerHeight); // Maak de canvas even groot als de pagina
    cnv.style('z-index', '-1') // Zorg dat de canvas achter alle andere elementen komt

    // Cookie voor tonen animatie, zodat dit opgeslagen wordt wanneer je naar andere pagina's gaat
    if (getItem("showAnimation") == null) {
        storeItem("showAnimation", true);
    }
    // Gebruik de checkbox om de animatie uit en aan te zetten. Sommige mensen zouden het storend kunnen vinden bij het lezen.
    // checkbox = select('#animOn');
    // checkbox.changed(updateCanvasShown);
    // checkbox.checked(getItem("showAnimation"));
    // updateCanvasShown();

    // Maak 150 willekeurige cirkels
    for (let i = 0; i < 150; i++) {
        circles.push(new Circle(random(width), random(height), random(15, 30), color(random(50,200), random(50,200), random(50,200))));
    }
}

function draw() {
    background(173,216,230);

    // Update alle cirkels
    for (c of circles) {
        c.update();
        c.display();

        // Vergroot de cirkels binnen 120 pixels van de muis
        if (dist(mouseX, mouseY, c.x, c.y) < 120) {
            c.expand();
        } else {
            c.shrink();
        }
    }
}

// Verander de grootte van de canvas als de pagina van grootte verandert
function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

// function updateCanvasShown() {
//     if (checkbox.checked()) {
//         cnv.show(); // Laat canvas zien
//         storeItem("showAnimation", true); // Verander de cookie
//     } else {
//         cnv.hide();
//         storeItem("showAnimation", false);
//     }
// }