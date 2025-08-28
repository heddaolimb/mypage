import { useEffect, useRef, useState } from "react";

export default function SpaceShooter() {
  const gameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 650, height: 450 });

  useEffect(() => {
    let PhaserLib;

    async function initGame() {
      const phaserModule = await import("phaser");
      PhaserLib = phaserModule.default;

      if (gameRef.current) return;

      const isMobile = window.innerWidth < 768;
      const width = isMobile ? Math.floor(window.innerWidth * 0.9) : 650;
      const height = isMobile ? 350 : 450;

      setDimensions({ width, height });

      class MainScene extends PhaserLib.Scene {
        constructor() {
          super("MainScene");
          this.stars = [];
          this.ship = null;
          this.cursors = null;
          this.bullets = null;
          this.spaceKey = null;
        }

        preload() {
          this.load.image("ship", "/icons/ship.svg");
        }

        create() {
          // ⭐ Stjerner (pulserende)
          for (let i = 0; i < 100; i++) {
            const x = PhaserLib.Math.Between(0, width);
            const y = PhaserLib.Math.Between(0, height);
            const star = this.add.circle(x, y, 2, 0xffffff);
            this.stars.push(star);

            this.tweens.add({
              targets: star,
              alpha: { from: 0.3, to: 1 },
              duration: PhaserLib.Math.Between(800, 2000),
              yoyo: true,
              repeat: -1,
            });
          }

          // 🚀 Skip
          this.ship = this.add.sprite(width / 2, height - 40, "ship");
          this.ship.setScale(0.15);

          // 🎮 Input
          this.cursors = this.input.keyboard.createCursorKeys();
          this.spaceKey = this.input.keyboard.addKey(
            PhaserLib.Input.Keyboard.KeyCodes.SPACE
          );

          // 🔫 Bullets group
          this.bullets = this.physics.add.group();
        }

        update() {
          // 🚀 Skip-kontroller
          if (this.cursors.left.isDown) {
            this.ship.x -= 5;
          } else if (this.cursors.right.isDown) {
            this.ship.x += 5;
          }

          // Begrens skipet
          if (this.ship.x < 20) this.ship.x = 20;
          if (this.ship.x > this.sys.game.config.width - 20) {
            this.ship.x = this.sys.game.config.width - 20;
          }

          // 🔫 Skyte med spacebar
          if (PhaserLib.Input.Keyboard.JustDown(this.spaceKey)) {
            const bullet = this.add.rectangle(
              this.ship.x,
              this.ship.y - 20,
              4,
              12,
              0xff0000
            );
            this.physics.add.existing(bullet);
            bullet.body.velocity.y = -300;
            this.bullets.add(bullet);
          }

          // Fjern kuler som er ute av skjermen
          this.bullets.getChildren().forEach((bullet) => {
            if (bullet.y < 0) {
              bullet.destroy();
            }
          });
        }
      }

      const config = {
        type: PhaserLib.AUTO,
        width,
        height,
        backgroundColor: "#000000",
        parent: "phaser-container",
        physics: { default: "arcade" }, // 👈 trengs for bullets
        scene: [MainScene],
      };

      gameRef.current = new PhaserLib.Game(config);
    }

    initGame();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="phaser-container"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        minHeight: `${dimensions.height}px`,
        margin: "0 auto",
        background: "#000",
        display: "block",
        overflow: "hidden", // 👈 holder kursene unna
      }}
    />
  );
}
