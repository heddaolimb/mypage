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
          this.enemyBullets = null;
          this.enemies = null;
          this.spaceKey = null;
          this.score = 0;
          this.scoreText = null;
          this.gameOver = false;
          this.restartBtn = null;

          // mobilknapper
          this.leftPressed = false;
          this.rightPressed = false;
          this.shootPressed = false;
        }

        preload() {
          this.load.image("ship", "/icons/ship.svg");
          this.load.image("enemy", "/icons/alien.svg"); // 👽 alien-ikon
        }

        create() {
          // ⭐ Stjerner
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
          this.ship = this.physics.add.sprite(width / 2, height - 40, "ship");
          this.ship.setScale(0.15);
          this.ship.setCollideWorldBounds(true);
          this.ship.body.immovable = true;

          // 👇 Strammere hitbox på skipet
          this.ship.body.setSize(this.ship.width * 0.5, this.ship.height * 0.5);
          this.ship.body.setOffset(
            this.ship.width * 0.25,
            this.ship.height * 0.25
          );

          // 🎮 Input PC
          this.cursors = this.input.keyboard.createCursorKeys();
          this.spaceKey = this.input.keyboard.addKey(
            PhaserLib.Input.Keyboard.KeyCodes.SPACE
          );

          // 🔫 Player bullets
          this.bullets = this.physics.add.group({
            defaultKey: "bullet",
            maxSize: 30,
          });

          // 🔫 Enemy bullets
          this.enemyBullets = this.physics.add.group({
            defaultKey: "enemyBullet",
            maxSize: 50,
          });

          // 👉 Rød bullet texture
          const graphics = this.make.graphics({ x: 0, y: 0, add: false });
          graphics.fillStyle(0xff0000, 1);
          graphics.fillRect(0, 0, 4, 12);
          graphics.generateTexture("bullet", 4, 12);
          graphics.destroy();

          // 👉 Grønn enemy bullet
          const g2 = this.make.graphics({ x: 0, y: 0, add: false });
          g2.fillStyle(0x00ff00, 1);
          g2.fillRect(0, 0, 4, 12);
          g2.generateTexture("enemyBullet", 4, 12);
          g2.destroy();

          // 👾 Enemies
          this.enemies = this.physics.add.group();

          // Spawn en enemy hvert 2. sekund
          this.time.addEvent({
            delay: 2000,
            callback: () => {
              if (this.gameOver) return;
              const x = PhaserLib.Math.Between(50, width - 50);
              const enemy = this.enemies.create(x, 0, "enemy");
              enemy.setScale(0.08);
              enemy.setVelocityY(100);

              // 👇 Strammere hitbox på enemy
              enemy.body.setSize(enemy.width * 0.8, enemy.height * 0.8);
              enemy.body.setOffset(enemy.width * 0.1, enemy.height * 0.1);

              // 👇 fienden begynner å skyte umiddelbart
              this.time.addEvent({
                delay: PhaserLib.Math.Between(500, 1500), // mye tidligere
                callback: () => {
                  if (enemy.active && !this.gameOver)
                    this.fireEnemyBullet(enemy);
                },
                loop: true,
              });
            },
            loop: true,
          });

          // 🏆 Score
          this.scoreText = this.add.text(10, 10, "Score: 0", {
            fontSize: "20px",
            fill: "#fff",
          });

          // ⚡ Collision: player bullets → enemies
          this.physics.add.overlap(
            this.bullets,
            this.enemies,
            (bullet, enemy) => {
              bullet.destroy();
              enemy.destroy();
              this.score += 10;
              this.scoreText.setText("Score: " + this.score);
            }
          );

          // 💥 Collision: enemies → ship
          this.physics.add.overlap(this.enemies, this.ship, () => {
            this.endGame();
          });

          // 💥 Collision: enemy bullets → ship
          this.physics.add.overlap(this.enemyBullets, this.ship, (bullet) => {
            bullet.destroy(); // fjern kula
            this.endGame();
          });

          // 📱 Mobilknapper
          if (isMobile) {
            this.createMobileControls();
          }
        }

        update() {
          if (this.gameOver) return;

          // 🚀 PC eller mobil-kontroller
          if (this.cursors.left.isDown || this.leftPressed) {
            this.ship.x -= 5;
          } else if (this.cursors.right.isDown || this.rightPressed) {
            this.ship.x += 5;
          }

          // 🔫 Skyte
          if (
            PhaserLib.Input.Keyboard.JustDown(this.spaceKey) ||
            this.shootPressed
          ) {
            this.fireBullet();
            this.shootPressed = false;
          }

          // Fjern player bullets utenfor
          this.bullets.getChildren().forEach((bullet) => {
            if (bullet.active && bullet.y < 0) bullet.destroy();
          });

          // Fjern enemy bullets utenfor
          this.enemyBullets.getChildren().forEach((bullet) => {
            if (bullet.active && bullet.y > this.sys.game.config.height)
              bullet.destroy();
          });

          // Game Over hvis enemy treffer bunnen
          this.enemies.getChildren().forEach((enemy) => {
            if (enemy.y > this.sys.game.config.height) this.endGame();
          });
        }

        fireBullet() {
          const offset = this.ship.displayHeight / 2;
          const bullet = this.bullets.get(this.ship.x, this.ship.y - offset);
          if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setVelocityY(-300);
          }
        }

        fireEnemyBullet(enemy) {
          const bullet = this.enemyBullets.get(enemy.x, enemy.y + 10);
          if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setVelocityY(200);

            // 👇 Strammere hitbox på enemy bullet
            bullet.body.setSize(2, 8); // mye mindre treffboks
            bullet.body.setOffset(1, 2);
          }
        }

        endGame() {
          if (this.gameOver) return;
          this.gameOver = true;

          this.add
            .text(
              this.sys.game.config.width / 2,
              this.sys.game.config.height / 2 - 30,
              "GAME OVER",
              { fontSize: "40px", fill: "#ff0000" }
            )
            .setOrigin(0.5);

          this.restartBtn = this.add
            .text(
              this.sys.game.config.width / 2,
              this.sys.game.config.height / 2 + 20,
              "RESTART",
              { fontSize: "30px", fill: "#00ff00" }
            )
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", () => {
              this.scene.restart(); // reset alt
              this.gameOver = false; // nullstill flagget
            });

          this.physics.pause(); // pause ved game over
        }

        createMobileControls() {
          const btnSize = 60;
          const y = this.sys.game.config.height - 70;

          // Venstre
          this.add
            .rectangle(50, y, btnSize, btnSize, 0x666666)
            .setInteractive()
            .on("pointerdown", () => (this.leftPressed = true))
            .on("pointerup", () => (this.leftPressed = false))
            .on("pointerout", () => (this.leftPressed = false));

          // Høyre
          this.add
            .rectangle(120, y, btnSize, btnSize, 0x666666)
            .setInteractive()
            .on("pointerdown", () => (this.rightPressed = true))
            .on("pointerup", () => (this.rightPressed = false))
            .on("pointerout", () => (this.rightPressed = false));

          // Skyte
          this.add
            .rectangle(
              this.sys.game.config.width - 70,
              y,
              btnSize,
              btnSize,
              0x999999
            )
            .setInteractive()
            .on("pointerdown", () => (this.shootPressed = true))
            .on("pointerup", () => (this.shootPressed = false))
            .on("pointerout", () => (this.shootPressed = false));

          this.add.text(40, y - 10, "<", { fontSize: "24px", fill: "#fff" });
          this.add.text(110, y - 10, ">", { fontSize: "24px", fill: "#fff" });
          this.add.text(this.sys.game.config.width - 90, y - 10, "FIRE", {
            fontSize: "20px",
            fill: "#fff",
          });
        }
      }

      const config = {
        type: PhaserLib.AUTO,
        width,
        height,
        backgroundColor: "#000000",
        parent: "phaser-container",
        physics: { default: "arcade" },
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
        width: "100%",
        height: "100%",
        background: "#000",
        display: "block",
        overflow: "hidden",
      }}
    />
  );
}
