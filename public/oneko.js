// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  const catVariants = [
    "/oneko.gif",
    "/kuroneko.gif",
    "/oneko-dog.gif",
    "/oneko-maia.gif",
    "/oneko-tora.gif"
  ];

  function createNeko(id, startX, startY, nekoFile) {
    const nekoEl = document.createElement("div");

    let nekoPosX = startX;
    let nekoPosY = startY;
    
    let targetPosX = startX;
    let targetPosY = startY;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
    
    let grabbing = false;
    let grabStop = true;
    let lastDeltaX = 0;
    let lastDeltaY = 0;
    
    let startDragX = 0;
    let startDragY = 0;
    let startNekoX = 0;
    let startNekoY = 0;
    let grabInterval = null;

    const nekoSpeed = 10;

    function init() {
      // Pick initial random target
      targetPosX = Math.max(32, Math.min(window.innerWidth - 32, Math.random() * window.innerWidth));
      targetPosY = Math.max(32, Math.min(window.innerHeight - 32, Math.random() * window.innerHeight));

      nekoEl.id = `oneko-${id}`;
      nekoEl.ariaHidden = true;
      nekoEl.style.width = "32px";
      nekoEl.style.height = "32px";
      nekoEl.style.position = "fixed";
      nekoEl.style.pointerEvents = "auto";
      nekoEl.style.cursor = "grab";
      nekoEl.style.imageRendering = "pixelated";
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      nekoEl.style.zIndex = 2147483647;

      nekoEl.style.backgroundImage = `url(${nekoFile})`;
      
      document.body.appendChild(nekoEl);

      // Drag events
      nekoEl.addEventListener("mousedown", onDragStart);
      nekoEl.addEventListener("touchstart", onDragStart, { passive: false });
      
      window.requestAnimationFrame(onAnimationFrame);
    }

    function onDragStart(event) {
      grabbing = true;
      nekoEl.style.cursor = "grabbing";
      idleAnimation = null;
      idleAnimationFrame = 0;

      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      startDragX = clientX;
      startDragY = clientY;
      startNekoX = nekoPosX;
      startNekoY = nekoPosY;

      lastDeltaX = 0;
      lastDeltaY = 0;

      window.addEventListener("mousemove", onDragMove);
      window.addEventListener("touchmove", onDragMove, { passive: false });
      window.addEventListener("mouseup", onDragEnd);
      window.addEventListener("touchend", onDragEnd);

      onDragMove(event);
    }

    function updateGrabSprite() {
      const absDeltaX = Math.abs(lastDeltaX);
      const absDeltaY = Math.abs(lastDeltaY);

      if (absDeltaX > absDeltaY && absDeltaX > 10) {
        setSprite(lastDeltaX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
      } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
        setSprite(lastDeltaY > 0 ? "scratchWallN" : "scratchWallS", frameCount);
      } else {
        // Held still: flail downwards using scratchWallS
        setSprite("scratchWallS", frameCount);
      }
    }

    function onDragMove(event) {
      if (!grabbing) return;
      
      if (event.cancelable) {
        event.preventDefault();
      }

      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      lastDeltaX = clientX - startDragX;
      lastDeltaY = clientY - startDragY;

      updateGrabSprite();

      if (grabStop || Math.abs(lastDeltaX) > 10 || Math.abs(lastDeltaY) > 10 || Math.sqrt(lastDeltaX ** 2 + lastDeltaY ** 2) > 10) {
        grabStop = false;
        clearTimeout(grabInterval);
        grabInterval = setTimeout(() => {
          grabStop = true;
          startDragX = clientX;
          startDragY = clientY;
          startNekoX = nekoPosX;
          startNekoY = nekoPosY;
          lastDeltaX = 0;
          lastDeltaY = 0;
        }, 150);
      }

      nekoPosX = startNekoX + clientX - startDragX;
      nekoPosY = startNekoY + clientY - startDragY;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    function onDragEnd() {
      if (!grabbing) return;
      grabbing = false;
      nekoEl.style.cursor = "grab";

      window.removeEventListener("mousemove", onDragMove);
      window.removeEventListener("touchmove", onDragMove);
      window.removeEventListener("mouseup", onDragEnd);
      window.removeEventListener("touchend", onDragEnd);

      // Stay exactly where dropped
      targetPosX = nekoPosX;
      targetPosY = nekoPosY;
      idleTime = 5; // Alert/landing impact pose at drop position
      setSprite("alert", 0);
    }

    let lastFrameTimestamp;

    function onAnimationFrame(timestamp) {
      if (!nekoEl.isConnected) {
        return;
      }
      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp;
      }

      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      window.requestAnimationFrame(onAnimationFrame);
    }

    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation === null
      ) {
        let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) {
          avalibleIdleAnimations.push("scratchWallW");
        }
        if (nekoPosY < 32) {
          avalibleIdleAnimations.push("scratchWallN");
        }
        if (nekoPosX > window.innerWidth - 32) {
          avalibleIdleAnimations.push("scratchWallE");
        }
        if (nekoPosY > window.innerHeight - 32) {
          avalibleIdleAnimations.push("scratchWallS");
        }
        idleAnimation =
          avalibleIdleAnimations[
            Math.floor(Math.random() * avalibleIdleAnimations.length)
          ];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;

      if (grabbing) {
        updateGrabSprite();
        return;
      }

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime -= 1;
        return;
      }

      const diffX = nekoPosX - targetPosX;
      const diffY = nekoPosY - targetPosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < nekoSpeed || distance < 48) {
        if (Math.floor(Math.random() * 40) === 0) {
          targetPosX = Math.max(32, Math.min(window.innerWidth - 32, Math.random() * window.innerWidth));
          targetPosY = Math.max(32, Math.min(window.innerHeight - 32, Math.random() * window.innerHeight));
          idleTime = 5; // Alert pause before wandering
        }
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      let direction;
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    init();
  }

  let catCount = 2;

  function spawnNewCat() {
    catCount++;
    const startX = Math.random() * (window.innerWidth - 64) + 32;
    const startY = Math.random() * (window.innerHeight - 64) + 32;
    const nekoFile = catVariants[Math.floor(Math.random() * catVariants.length)];
    createNeko(catCount, startX, startY, nekoFile);
  }

  if (typeof window !== "undefined") {
    window.onekoSpawnCat = spawnNewCat;
  }

  // Spawn initial 2 cats
  createNeko(1, 64, 64, "/kuroneko.gif");
  
  const initialWidth = typeof window !== "undefined" && window.innerWidth ? window.innerWidth : 800;
  const initialHeight = typeof window !== "undefined" && window.innerHeight ? window.innerHeight : 600;
  createNeko(2, initialWidth - 100, initialHeight - 100, "/oneko.gif");
})();
