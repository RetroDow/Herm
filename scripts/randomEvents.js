var fame = {};
fame.niceCounter = 0;
fame.rapeCounter = 0;
fame.moanCounter = null;
fame.animateTimeout = null;
fame.event = function (roomId, returnBtn) {
    if (g.isNight()) {
        let orallevel = levels.get("oral").l;
        let anallevel = levels.get("anal").l;
        if ((orallevel > 9 || anallevel > 9) && !daily.get("fameEventHypno") && g.rand(0, 3) === 0) {
            daily.set("fameEventHypno");
            if (orallevel > 8 && anallevel > 8) {
                if (g.rand(0, 2) === 0) {
                    nav.bg("1001_rand/hypno0.gif");
                    chat(7, 0);
                }
                else {
                    nav.bg("1001_rand/hypno1.gif");
                    chat(8, 0);
                }
            }
            else if (orallevel > 8) {
                nav.bg("1001_rand/hypno0.gif");
                chat(7, 0);
            }
            else {
                nav.bg("1001_rand/hypno1.gif");
                chat(8, 0);
            }
            return true;
        }
        let rapeplace = [50, 225, 250, 375, 450, 500, 650, 776, 825, 900];
        let thisAppearance = cl.appearance();
        let rapeFame = 10 - levels.get("fame").l;
        let rapeAppearance = 10 - thisAppearance * 2;
        let rapeDay = g.dt.getDay() === 5 ? 0 : 6;
        if (rapeFame < 0)
            rapeFame = 0;
        let totalRapeChance = rapeFame + rapeAppearance + rapeDay;
        console.log(totalRapeChance);
        if (thisAppearance > 0 && rapeplace.includes(g.nextRoomId) && fame.rapeCounter < 2 && g.rand(0, totalRapeChance) === 0) {
            fame.rapeCounter++;
            rape.init(null, "street", roomId, returnBtn);
            return true;
        }
    }
    else {
        let niceday = [50, 250, 300, 350, 400, 404, 500, 575, 625, 700, 776, 900];
        let randFame = 10 - levels.get("fame").l;
        if (randFame < 0)
            randFame = 0;
        if (niceday.includes(g.nextRoomId) && fame.niceCounter < 2 && g.rand(0, randFame + 10) === 0) {
            fame.niceCounter++;
            trap.init("encounter", "street", roomId, returnBtn);
            return true;
        }
    }
    return false;
};

fame.moankill = function () {
    nav.killbutton("fame.moan-kill");
};

//side: left, right, center, double
fame.moanAnimate = function (side) {
    if (fame.animateTimeout !== null) return;
    fame.moan(side);
    fame.animateTimeout = setInterval(function () {
        nav.killbutton("fame.moan-kill"); 
        fame.moan(side);
    }, 1200);
};

fame.moanAnimateStop = function () {
    nav.killbutton("fame.moan-kill");
    clearInterval(fame.animateTimeout);
    fame.animateTimeout = null;
};

fame.moan = function (side = "center") {
    //0-8
    fame.moankill();
    let initmoan0 = g.rand(150, 201);
    let initmoan1 = g.rand(150, 201);
    let top = g.rand(200, 700);
    let left = g.rand(100, 540);
    let center = g.rand(540, 1180);
    let right = g.rand(1180, 1500);
    if (fame.moanCounter === null)
        fame.moanCounter = g.rand(0, 9);
    fame.moanCounter++;
    if (fame.moanCounter > 8)
        fame.moanCounter = 0;
    
    if (side === "left") {
        nav.button({
            "type": "img",
            "name": "fame.moan-kill",
            "left": left,
            "top": top,
            "width": initmoan0 * 2,
            "height": initmoan0,
            "image": "1001_rand/moan" + fame.moanCounter + ".webp"
        }, 1010);
    }
    else if (side === "right") {
        nav.button({
            "type": "img",
            "name": "fame.moan-kill",
            "left": right,
            "top": top,
            "width": initmoan0 * 2,
            "height": initmoan0,
            "image": "1001_rand/moan" + fame.moanCounter + ".webp"
        }, 1010);
    }
    else if (side === "center") {
        nav.button({
            "type": "img",
            "name": "fame.moan-kill",
            "left": center,
            "top": top,
            "width": initmoan0 * 2,
            "height": initmoan0,
            "image": "1001_rand/moan" + fame.moanCounter + ".webp"
        }, 1010);
    }
    else if (side === "double") {
        nav.button({
            "type": "img",
            "name": "fame.moan-kill",
            "left": left,
            "top": g.rand(400, 700),
            "width": initmoan1 * 2,
            "height": initmoan1,
            "image": "1001_rand/moan" + fame.moanCounter + ".webp"
        }, 1010);
        fame.moanCounter++;
        if (fame.moanCounter > 8)
            fame.moanCounter = 0;
        nav.button({
            "type": "img",
            "name": "fame.moan-kill",
            "left": right,
            "top": top,
            "width": initmoan0 * 2,
            "height": initmoan0,
            "image": "1001_rand/moan" + fame.moanCounter + ".webp"
        }, 1010);
    }
};