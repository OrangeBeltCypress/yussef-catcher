const coins = document.querySelector(".coins");
const text = document.querySelector(".text")
const bucket = document.querySelector(".bucket");
let amt = 0; 


//code needed to load in the bucket, so it can move
window.addEventListener('load', () => {
    bucket.style.position = 'absolute';
    bucket.style.left = 0;
    bucket.style.top = 0;
})


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            bucket.style.left = parseInt(bucket.style.left) - 15 + "px";
            break;
        case 'ArrowRight':
            bucket.style.left = parseInt(bucket.style.left) + 15 + "px";
            break;
    }
})

//repeats every 1.5 seconds
setInterval(() => {
    let spawnLocation = Math.round(Math.random() * 100); // creates new random spawn location

    const obj = document.createElement("img"); // creates an img tag in JavaScript (NEW)

    obj.style.top = "5%"; // places obj near the top

    obj.classList.add("coin"); // gives obj the class name of coin, so it can be given CSS attributes

    obj.style.left = (spawnLocation) + "%"; // sets random spawn location

    coins.appendChild(obj); // adds the new obj to the coin div (screen)

    //need 2nd set interval to ensure the obj doesn't fall before it's made since there's another setTimeout in the descend (kind of complicated)
    setInterval(() => {
        descend(obj);
        checkCollision(obj, bucket);
    }, 1800)
}, 1500)

function descend(obj) {
    
    setTimeout(() => {
        obj.style.top = "90%";
    }, 0.02);
    setTimeout(() => {
        obj.remove();
    }, 5000);
}

function checkCollision(coin, bucket) {
    const coinRect = coin.getBoundingClientRect();
    const bucketRect = bucket.getBoundingClientRect();

    if (
        coinRect.left < bucketRect.right &&
        coinRect.right > bucketRect.left &&
        coinRect.top < bucketRect.bottom &&
        coinRect.bottom > bucketRect.top
    ) {
       coin.remove()
       text.innerHTML = "Coins: " + ++amt
    }
}