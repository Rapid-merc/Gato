document.addEventListener("DOMContentLoaded", function () {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    
    ctx.font = "30px Verdana";
    ctx.lineWidth = 1.5;

    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "orange");
    gradient.addColorStop("1.0", "red");

    // Fill with gradient
    ctx.strokeStyle = gradient;
    ctx.strokeText("Lifetime Error", 5, 30);
});
