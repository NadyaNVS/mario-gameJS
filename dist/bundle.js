/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ (() => {

eval("const {\n  Client,\n  Account,\n  Databases,\n  ID,\n  Query\n} = Appwrite;\nconst projectId = \"6532d6ae8ef55352e84d\";\nconst databaseId = \"653685a6dd99b9ade150\";\nconst collectionId = \"653685da43197bab2431\";\nconst client = new Client();\nclient.setEndpoint(\"https://cloud.appwrite.io/v1\").setProject(projectId);\nconst account = new Account(client);\nconst database = new Databases(client);\nfunction isLoggedIn() {\n  return account.get().then(response => {\n    if (response) {\n      return true;\n    }\n    return false;\n  }).catch(error => console.error(error));\n}\nfunction getUserId() {\n  return account.get().then(response => {\n    return response.$id;\n  }).catch(error => {\n    console.error(error);\n  });\n}\nfunction displayUsername() {\n  account.get().then(response => {\n    const username = document.getElementById(\"username\");\n    username.textContent = response.name;\n  }).catch(error => console.error(error));\n}\nfunction updateScore(score) {\n  //send an update to a document\n  const currentHighScore = document.getElementById(\"highscore\").textContent;\n  if (Number(score) > Number(currentHighScore)) {\n    getUserId().then(userId => {\n      database.updateDocument(databaseId, collectionId, userId, {\n        userId: userId,\n        highscore: score\n      }).then(() => {\n        showScore();\n      }).catch(error => console.error(error));\n    });\n  }\n}\nfunction showScore() {\n  getUserId().then(userId => {\n    console.log(\"userId\", userId);\n    database.listDocuments(databaseId, collectionId, [Query.equal(\"userId\", userId)]).then(response => {\n      const highScoreElement = document.getElementById(\"highscore\");\n      highScoreElement.textContent = response.documents[0].highscore;\n    });\n  });\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  displayUsername();\n  showScore();\n  showDisplay();\n});\nfunction register(event) {\n  account.create(ID.unique(), event.target.elements[\"register-email\"].value, event.target.elements[\"register-password\"].value, event.target.elements[\"register-username\"].value).then(response => {\n    console.log(response);\n    database.createDocument(databaseId, collectionId, response.$id, {\n      userId: response.$id,\n      highscore: 0\n    });\n    account.createEmailSession(event.target.elements[\"register-email\"].value, event.target.elements[\"register-password\"].value).then(() => {\n      showDisplay();\n      displayUsername();\n      showScore();\n    });\n  }).catch(error => console.error(error));\n  event.preventDefault();\n}\nfunction login(event) {\n  account.createEmailSession(event.target.elements[\"login-email\"].value, event.target.elements[\"login-password\"].value).then(() => {\n    alert(\"Session created successfully!\");\n    showDisplay();\n    displayUsername();\n    showScore();\n    client.subscribe(\"account\", response => console.log(response));\n  }).catch(error => {\n    alert(\"Failed to create session!\");\n    console.error(error);\n  });\n  event.preventDefault();\n}\nfunction logout() {\n  account.deleteSessions().then(() => {\n    alert(\"Logged out\");\n    console.log(\"Current session deleted\");\n    showDisplay();\n    const highScoreElement = document.getElementById(\"highscore\");\n    highScoreElement.textContent = \"\";\n  }).catch(error => console.error(error));\n}\nfunction toggleModal(event) {\n  const registerForm = document.getElementById(\"register-form\");\n  const loginForm = document.getElementById(\"login-form\");\n  const registerButton = document.getElementById(\"register-button\");\n  const loginButton = document.getElementById(\"login-button\");\n  if (event.srcElement.id === \"register-button\") {\n    registerForm.classList.remove(\"hidden\");\n    registerButton.classList.remove(\"not-active\");\n    loginForm.classList.add(\"hidden\");\n    loginButton.classList.add(\"not-active\");\n  }\n  if (event.srcElement.id === \"login-button\") {\n    registerForm.classList.add(\"hidden\");\n    registerButton.classList.add(\"not-active\");\n    loginForm.classList.remove(\"hidden\");\n    loginButton.classList.remove(\"not-active\");\n  }\n}\nfunction showDisplay() {\n  const modalElement = document.getElementById(\"modal\");\n  modalElement.classList.add(\"hidden\");\n  isLoggedIn().then(isLogin => {\n    if (isLogin) {\n      const modalElement = document.getElementById(\"modal\");\n      modalElement.classList.add(\"hidden\");\n      const logoutButton = document.getElementById(\"logout-button\");\n      logoutButton.classList.remove(\"hidden\");\n      const highScoreTag = document.getElementById(\"highscore-tag\");\n      highScoreTag.classList.remove(\"hidden\");\n      startGame();\n    } else {\n      const modalElement = document.getElementById(\"modal\");\n      modalElement.classList.remove(\"hidden\");\n      const logoutButton = document.getElementById(\"logout-button\");\n      logoutButton.classList.add(\"hidden\");\n      const highScoreTag = document.getElementById(\"highscore-tag\");\n      highScoreTag.classList.add(\"hidden\");\n      const usernameElement = document.getElementById(\"username\");\n      usernameElement.textContent = \"\";\n      const canvas = document.querySelector(\"canvas\");\n      if (canvas) {\n        canvas.remove();\n      }\n    }\n  }).catch(error => console.error(error));\n}\n\n//Kaboom Game\nfunction startGame() {\n  kaboom({\n    global: true,\n    fullscreen: true,\n    scale: 2,\n    clearColor: [0, 0, 0, 1]\n  });\n\n  //Speed identifiers\n  const moveSpeed = 120;\n  const jumpForce = 360;\n  const bigJumpForce = 550;\n  let currentJumpForce = jumpForce;\n  const fallDeath = 400;\n  const enemySpeed = 20;\n\n  //Game logic\n  let isJumping = true;\n  loadRoot(\"https://i.imgur.com/\");\n  loadSprite(\"coin\", \"wbKxhcd.png\");\n  loadSprite(\"evil-shroom\", \"KPO3fR9.png\");\n  loadSprite(\"brick\", \"pogC9x5.png\");\n  loadSprite(\"block\", \"M6rwarW.png\");\n  loadSprite(\"mario\", \"Wb1qfhK.png\");\n  loadSprite(\"mushroom\", \"0wMd92p.png\");\n  loadSprite(\"surprise\", \"gesQ1KP.png\");\n  loadSprite(\"unboxed\", \"bdrLpi6.png\");\n  loadSprite(\"pipe-top-left\", \"ReTPiWY.png\");\n  loadSprite(\"pipe-top-right\", \"hj2GK4n.png\");\n  loadSprite(\"pipe-bottom-left\", \"c1cYSbt.png\");\n  loadSprite(\"pipe-bottom-right\", \"nqQ79eI.png\");\n  loadSprite(\"blue-block\", \"fVscIbn.png\");\n  loadSprite(\"blue-brick\", \"3e5YRQd.png\");\n  loadSprite(\"blue-steel\", \"gqVoI2b.png\");\n  loadSprite(\"blue-evel-mushroom\", \"SvV4ueD.png\");\n  loadSprite(\"blue-surprise\", \"RMqCc1G.png\");\n  // loadSprite(\"\", \"\");\n  // loadSprite(\"\", \"\");\n  scene(\"game\", ({\n    level,\n    score\n  }) => {\n    layers([\"bg\", \"obj\", \"ui\"], \"obj\");\n    const maps = [[\"=                                     \", \"=                                     \", \"=                                     \", \"=                                     \", \"=     %  =*=%=                        \", \"=                                     \", \"=                           -+        \", \"=              ^       ^    ()        \", \"==============================   =====\"], [\"£                                             £\", \"£                                             £\", \"£                                             £\", \"£                                             £\", \"£      @@@@@@                    x x          £\", \"£                                x x          £\", \"£  x                           x x x    x   -+£\", \"£              z       z     x x x x    x   ()£\", \"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\"]];\n    const levelCnf = {\n      width: 20,\n      height: 20,\n      \"=\": [sprite(\"block\"), solid()],\n      $: [sprite(\"coin\"), \"coin\"],\n      \"%\": [sprite(\"surprise\"), solid(), \"coin-surprise\"],\n      \"*\": [sprite(\"surprise\"), solid(), \"mushroom-surprise\"],\n      \"}\": [sprite(\"unboxed\"), solid()],\n      \"(\": [sprite(\"pipe-bottom-left\"), solid(), scale(0.5)],\n      \")\": [sprite(\"pipe-bottom-right\"), solid(), scale(0.5)],\n      \"-\": [sprite(\"pipe-top-left\"), solid(), scale(0.5), \"pipe\"],\n      \"+\": [sprite(\"pipe-top-right\"), solid(), scale(0.5), \"pipe\"],\n      \"^\": [sprite(\"evil-shroom\"), solid(), \"dangerous\"],\n      \"#\": [sprite(\"mushroom\"), solid(), \"mushroom\", body()],\n      \"!\": [sprite(\"blue-block\"), solid(), scale(0.5)],\n      \"£\": [sprite(\"blue-brick\"), solid(), scale(0.5)],\n      z: [sprite(\"blue-evel-mushroom\"), solid(), scale(0.5), \"dangerous\"],\n      \"@\": [sprite(\"blue-surprise\"), solid(), scale(0.5), \"coin-surprise\"],\n      x: [sprite(\"blue-steel\"), solid(), scale(0.5)]\n    };\n    const gameLevel = addLevel(maps[level], levelCnf);\n    const scoreLabel = add([text(score), pos(30, 6), layer(\"ui\"), {\n      value: score\n    }]);\n    add([text(\" level \" + parseInt(level + 1)), pos(40, 6)]);\n    const player = add([sprite(\"mario\"), solid(), pos(30, 0), body(), big(), origin(\"bot\")]);\n    function big() {\n      let timer = 0;\n      let isBig = false;\n      return {\n        update() {\n          if (isBig) {\n            currentJumpForce = bigJumpForce;\n            timer -= dt();\n            if (timer <= 0) {\n              this.smallyfy();\n            }\n          }\n        },\n        isBig() {\n          return isBig;\n        },\n        smallyfy() {\n          this.scale = vec2(1);\n          currentJumpForce = jumpForce;\n          isBig = false;\n        },\n        biggify(time) {\n          this.scale = vec2(2);\n          timer = time;\n          isBig = true;\n        }\n      };\n    }\n    player.on(\"headbump\", obj => {\n      if (obj.is(\"coin-surprise\")) {\n        gameLevel.spawn(\"$\", obj.gridPos.sub(0, 1));\n        destroy(obj);\n        gameLevel.spawn(\"}\", obj.gridPos.add(0, 0));\n      }\n      if (obj.is(\"mushroom-surprise\")) {\n        gameLevel.spawn(\"#\", obj.gridPos.sub(0, 1));\n        destroy(obj);\n        gameLevel.spawn(\"}\", obj.gridPos.add(0, 0));\n      }\n    });\n    action(\"mushroom\", m => {\n      m.move(20, 0);\n    });\n    action(\"dangerous\", d => {\n      d.move(-enemySpeed, 0);\n    });\n    player.action(() => {\n      camPos(player.pos);\n      if (player.pos.y >= fallDeath) {\n        go(\"lose\", {\n          score: scoreLabel.value\n        });\n      }\n    });\n    player.collides(\"coin\", c => {\n      destroy(c);\n      scoreLabel.value++;\n      scoreLabel.text = scoreLabel.value;\n    });\n    player.collides(\"mushroom\", m => {\n      destroy(m);\n      player.biggify(6);\n    });\n    player.collides(\"dangerous\", d => {\n      if (isJumping) {\n        destroy(d);\n      } else {\n        go(\"lose\", {\n          score: scoreLabel.value\n        });\n      }\n    });\n    player.collides(\"pipe\", () => {\n      keyPress(\"down\", () => {\n        go(\"game\", {\n          level: (level + 1) % maps.length,\n          score: scoreLabel.value\n        });\n      });\n    });\n    keyDown(\"left\", () => {\n      player.move(-moveSpeed, 0);\n    });\n    keyDown(\"right\", () => {\n      player.move(moveSpeed, 0);\n    });\n    player.action(() => {\n      if (player.grounded()) {\n        isJumping = false;\n      }\n    });\n    keyPress(\"space\", () => {\n      if (player.grounded()) {\n        isJumping = true;\n        player.jump(currentJumpForce);\n      }\n    });\n    scene(\"lose\", ({\n      score\n    }) => {\n      add([text(score, 32), origin(\"center\"), pos(width() / 2, height() / 2)]);\n      updateScore(score);\n    });\n  });\n  start(\"game\", {\n    level: 0,\n    score: 0\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZ2FtZS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXJpby1nYW1lLWpzLy4vc3JjL2dhbWUuanM/YWE5NCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7XG4gIENsaWVudCxcbiAgQWNjb3VudCxcbiAgRGF0YWJhc2VzLFxuICBJRCxcbiAgUXVlcnlcbn0gPSBBcHB3cml0ZTtcbmNvbnN0IHByb2plY3RJZCA9IFwiNjUzMmQ2YWU4ZWY1NTM1MmU4NGRcIjtcbmNvbnN0IGRhdGFiYXNlSWQgPSBcIjY1MzY4NWE2ZGQ5OWI5YWRlMTUwXCI7XG5jb25zdCBjb2xsZWN0aW9uSWQgPSBcIjY1MzY4NWRhNDMxOTdiYWIyNDMxXCI7XG5jb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KCk7XG5jbGllbnQuc2V0RW5kcG9pbnQoXCJodHRwczovL2Nsb3VkLmFwcHdyaXRlLmlvL3YxXCIpLnNldFByb2plY3QocHJvamVjdElkKTtcbmNvbnN0IGFjY291bnQgPSBuZXcgQWNjb3VudChjbGllbnQpO1xuY29uc3QgZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2VzKGNsaWVudCk7XG5mdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICByZXR1cm4gYWNjb3VudC5nZXQoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbn1cbmZ1bmN0aW9uIGdldFVzZXJJZCgpIHtcbiAgcmV0dXJuIGFjY291bnQuZ2V0KCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLiRpZDtcbiAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGRpc3BsYXlVc2VybmFtZSgpIHtcbiAgYWNjb3VudC5nZXQoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICBjb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWVcIik7XG4gICAgdXNlcm5hbWUudGV4dENvbnRlbnQgPSByZXNwb25zZS5uYW1lO1xuICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG59XG5mdW5jdGlvbiB1cGRhdGVTY29yZShzY29yZSkge1xuICAvL3NlbmQgYW4gdXBkYXRlIHRvIGEgZG9jdW1lbnRcbiAgY29uc3QgY3VycmVudEhpZ2hTY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaHNjb3JlXCIpLnRleHRDb250ZW50O1xuICBpZiAoTnVtYmVyKHNjb3JlKSA+IE51bWJlcihjdXJyZW50SGlnaFNjb3JlKSkge1xuICAgIGdldFVzZXJJZCgpLnRoZW4odXNlcklkID0+IHtcbiAgICAgIGRhdGFiYXNlLnVwZGF0ZURvY3VtZW50KGRhdGFiYXNlSWQsIGNvbGxlY3Rpb25JZCwgdXNlcklkLCB7XG4gICAgICAgIHVzZXJJZDogdXNlcklkLFxuICAgICAgICBoaWdoc2NvcmU6IHNjb3JlXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgc2hvd1Njb3JlKCk7XG4gICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHNob3dTY29yZSgpIHtcbiAgZ2V0VXNlcklkKCkudGhlbih1c2VySWQgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwidXNlcklkXCIsIHVzZXJJZCk7XG4gICAgZGF0YWJhc2UubGlzdERvY3VtZW50cyhkYXRhYmFzZUlkLCBjb2xsZWN0aW9uSWQsIFtRdWVyeS5lcXVhbChcInVzZXJJZFwiLCB1c2VySWQpXSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBjb25zdCBoaWdoU2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoc2NvcmVcIik7XG4gICAgICBoaWdoU2NvcmVFbGVtZW50LnRleHRDb250ZW50ID0gcmVzcG9uc2UuZG9jdW1lbnRzWzBdLmhpZ2hzY29yZTtcbiAgICB9KTtcbiAgfSk7XG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGRpc3BsYXlVc2VybmFtZSgpO1xuICBzaG93U2NvcmUoKTtcbiAgc2hvd0Rpc3BsYXkoKTtcbn0pO1xuZnVuY3Rpb24gcmVnaXN0ZXIoZXZlbnQpIHtcbiAgYWNjb3VudC5jcmVhdGUoSUQudW5pcXVlKCksIGV2ZW50LnRhcmdldC5lbGVtZW50c1tcInJlZ2lzdGVyLWVtYWlsXCJdLnZhbHVlLCBldmVudC50YXJnZXQuZWxlbWVudHNbXCJyZWdpc3Rlci1wYXNzd29yZFwiXS52YWx1ZSwgZXZlbnQudGFyZ2V0LmVsZW1lbnRzW1wicmVnaXN0ZXItdXNlcm5hbWVcIl0udmFsdWUpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICBkYXRhYmFzZS5jcmVhdGVEb2N1bWVudChkYXRhYmFzZUlkLCBjb2xsZWN0aW9uSWQsIHJlc3BvbnNlLiRpZCwge1xuICAgICAgdXNlcklkOiByZXNwb25zZS4kaWQsXG4gICAgICBoaWdoc2NvcmU6IDBcbiAgICB9KTtcbiAgICBhY2NvdW50LmNyZWF0ZUVtYWlsU2Vzc2lvbihldmVudC50YXJnZXQuZWxlbWVudHNbXCJyZWdpc3Rlci1lbWFpbFwiXS52YWx1ZSwgZXZlbnQudGFyZ2V0LmVsZW1lbnRzW1wicmVnaXN0ZXItcGFzc3dvcmRcIl0udmFsdWUpLnRoZW4oKCkgPT4ge1xuICAgICAgc2hvd0Rpc3BsYXkoKTtcbiAgICAgIGRpc3BsYXlVc2VybmFtZSgpO1xuICAgICAgc2hvd1Njb3JlKCk7XG4gICAgfSk7XG4gIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cbmZ1bmN0aW9uIGxvZ2luKGV2ZW50KSB7XG4gIGFjY291bnQuY3JlYXRlRW1haWxTZXNzaW9uKGV2ZW50LnRhcmdldC5lbGVtZW50c1tcImxvZ2luLWVtYWlsXCJdLnZhbHVlLCBldmVudC50YXJnZXQuZWxlbWVudHNbXCJsb2dpbi1wYXNzd29yZFwiXS52YWx1ZSkudGhlbigoKSA9PiB7XG4gICAgYWxlcnQoXCJTZXNzaW9uIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IVwiKTtcbiAgICBzaG93RGlzcGxheSgpO1xuICAgIGRpc3BsYXlVc2VybmFtZSgpO1xuICAgIHNob3dTY29yZSgpO1xuICAgIGNsaWVudC5zdWJzY3JpYmUoXCJhY2NvdW50XCIsIHJlc3BvbnNlID0+IGNvbnNvbGUubG9nKHJlc3BvbnNlKSk7XG4gIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICBhbGVydChcIkZhaWxlZCB0byBjcmVhdGUgc2Vzc2lvbiFcIik7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gIH0pO1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuZnVuY3Rpb24gbG9nb3V0KCkge1xuICBhY2NvdW50LmRlbGV0ZVNlc3Npb25zKCkudGhlbigoKSA9PiB7XG4gICAgYWxlcnQoXCJMb2dnZWQgb3V0XCIpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBzZXNzaW9uIGRlbGV0ZWRcIik7XG4gICAgc2hvd0Rpc3BsYXkoKTtcbiAgICBjb25zdCBoaWdoU2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoc2NvcmVcIik7XG4gICAgaGlnaFNjb3JlRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKGV2ZW50KSB7XG4gIGNvbnN0IHJlZ2lzdGVyRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnaXN0ZXItZm9ybVwiKTtcbiAgY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1mb3JtXCIpO1xuICBjb25zdCByZWdpc3RlckJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnaXN0ZXItYnV0dG9uXCIpO1xuICBjb25zdCBsb2dpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tYnV0dG9uXCIpO1xuICBpZiAoZXZlbnQuc3JjRWxlbWVudC5pZCA9PT0gXCJyZWdpc3Rlci1idXR0b25cIikge1xuICAgIHJlZ2lzdGVyRm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIHJlZ2lzdGVyQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJub3QtYWN0aXZlXCIpO1xuICAgIGxvZ2luRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGxvZ2luQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJub3QtYWN0aXZlXCIpO1xuICB9XG4gIGlmIChldmVudC5zcmNFbGVtZW50LmlkID09PSBcImxvZ2luLWJ1dHRvblwiKSB7XG4gICAgcmVnaXN0ZXJGb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgcmVnaXN0ZXJCdXR0b24uY2xhc3NMaXN0LmFkZChcIm5vdC1hY3RpdmVcIik7XG4gICAgbG9naW5Gb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgbG9naW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcIm5vdC1hY3RpdmVcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHNob3dEaXNwbGF5KCkge1xuICBjb25zdCBtb2RhbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsXCIpO1xuICBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgaXNMb2dnZWRJbigpLnRoZW4oaXNMb2dpbiA9PiB7XG4gICAgaWYgKGlzTG9naW4pIHtcbiAgICAgIGNvbnN0IG1vZGFsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIik7XG4gICAgICBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGNvbnN0IGxvZ291dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb3V0LWJ1dHRvblwiKTtcbiAgICAgIGxvZ291dEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgY29uc3QgaGlnaFNjb3JlVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoc2NvcmUtdGFnXCIpO1xuICAgICAgaGlnaFNjb3JlVGFnLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBzdGFydEdhbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbW9kYWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbiAgICAgIG1vZGFsRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgY29uc3QgbG9nb3V0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvdXQtYnV0dG9uXCIpO1xuICAgICAgbG9nb3V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBjb25zdCBoaWdoU2NvcmVUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2hzY29yZS10YWdcIik7XG4gICAgICBoaWdoU2NvcmVUYWcuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGNvbnN0IHVzZXJuYW1lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWVcIik7XG4gICAgICB1c2VybmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbiAgICAgIGlmIChjYW52YXMpIHtcbiAgICAgICAgY2FudmFzLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xufVxuXG4vL0thYm9vbSBHYW1lXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGthYm9vbSh7XG4gICAgZ2xvYmFsOiB0cnVlLFxuICAgIGZ1bGxzY3JlZW46IHRydWUsXG4gICAgc2NhbGU6IDIsXG4gICAgY2xlYXJDb2xvcjogWzAsIDAsIDAsIDFdXG4gIH0pO1xuXG4gIC8vU3BlZWQgaWRlbnRpZmllcnNcbiAgY29uc3QgbW92ZVNwZWVkID0gMTIwO1xuICBjb25zdCBqdW1wRm9yY2UgPSAzNjA7XG4gIGNvbnN0IGJpZ0p1bXBGb3JjZSA9IDU1MDtcbiAgbGV0IGN1cnJlbnRKdW1wRm9yY2UgPSBqdW1wRm9yY2U7XG4gIGNvbnN0IGZhbGxEZWF0aCA9IDQwMDtcbiAgY29uc3QgZW5lbXlTcGVlZCA9IDIwO1xuXG4gIC8vR2FtZSBsb2dpY1xuICBsZXQgaXNKdW1waW5nID0gdHJ1ZTtcbiAgbG9hZFJvb3QoXCJodHRwczovL2kuaW1ndXIuY29tL1wiKTtcbiAgbG9hZFNwcml0ZShcImNvaW5cIiwgXCJ3Ykt4aGNkLnBuZ1wiKTtcbiAgbG9hZFNwcml0ZShcImV2aWwtc2hyb29tXCIsIFwiS1BPM2ZSOS5wbmdcIik7XG4gIGxvYWRTcHJpdGUoXCJicmlja1wiLCBcInBvZ0M5eDUucG5nXCIpO1xuICBsb2FkU3ByaXRlKFwiYmxvY2tcIiwgXCJNNnJ3YXJXLnBuZ1wiKTtcbiAgbG9hZFNwcml0ZShcIm1hcmlvXCIsIFwiV2IxcWZoSy5wbmdcIik7XG4gIGxvYWRTcHJpdGUoXCJtdXNocm9vbVwiLCBcIjB3TWQ5MnAucG5nXCIpO1xuICBsb2FkU3ByaXRlKFwic3VycHJpc2VcIiwgXCJnZXNRMUtQLnBuZ1wiKTtcbiAgbG9hZFNwcml0ZShcInVuYm94ZWRcIiwgXCJiZHJMcGk2LnBuZ1wiKTtcbiAgbG9hZFNwcml0ZShcInBpcGUtdG9wLWxlZnRcIiwgXCJSZVRQaVdZLnBuZ1wiKTtcbiAgbG9hZFNwcml0ZShcInBpcGUtdG9wLXJpZ2h0XCIsIFwiaGoyR0s0bi5wbmdcIik7XG4gIGxvYWRTcHJpdGUoXCJwaXBlLWJvdHRvbS1sZWZ0XCIsIFwiYzFjWVNidC5wbmdcIik7XG4gIGxvYWRTcHJpdGUoXCJwaXBlLWJvdHRvbS1yaWdodFwiLCBcIm5xUTc5ZUkucG5nXCIpO1xuICBsb2FkU3ByaXRlKFwiYmx1ZS1ibG9ja1wiLCBcImZWc2NJYm4ucG5nXCIpO1xuICBsb2FkU3ByaXRlKFwiYmx1ZS1icmlja1wiLCBcIjNlNVlSUWQucG5nXCIpO1xuICBsb2FkU3ByaXRlKFwiYmx1ZS1zdGVlbFwiLCBcImdxVm9JMmIucG5nXCIpO1xuICBsb2FkU3ByaXRlKFwiYmx1ZS1ldmVsLW11c2hyb29tXCIsIFwiU3ZWNHVlRC5wbmdcIik7XG4gIGxvYWRTcHJpdGUoXCJibHVlLXN1cnByaXNlXCIsIFwiUk1xQ2MxRy5wbmdcIik7XG4gIC8vIGxvYWRTcHJpdGUoXCJcIiwgXCJcIik7XG4gIC8vIGxvYWRTcHJpdGUoXCJcIiwgXCJcIik7XG4gIHNjZW5lKFwiZ2FtZVwiLCAoe1xuICAgIGxldmVsLFxuICAgIHNjb3JlXG4gIH0pID0+IHtcbiAgICBsYXllcnMoW1wiYmdcIiwgXCJvYmpcIiwgXCJ1aVwiXSwgXCJvYmpcIik7XG4gICAgY29uc3QgbWFwcyA9IFtbXCI9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLCBcIj0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIsIFwiPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiwgXCI9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLCBcIj0gICAgICUgID0qPSU9ICAgICAgICAgICAgICAgICAgICAgICAgXCIsIFwiPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiwgXCI9ICAgICAgICAgICAgICAgICAgICAgICAgICAgLSsgICAgICAgIFwiLCBcIj0gICAgICAgICAgICAgIF4gICAgICAgXiAgICAoKSAgICAgICAgXCIsIFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICAgPT09PT1cIl0sIFtcIsKjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgwqNcIiwgXCLCoyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIMKjXCIsIFwiwqMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDCo1wiLCBcIsKjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgwqNcIiwgXCLCoyAgICAgIEBAQEBAQCAgICAgICAgICAgICAgICAgICAgeCB4ICAgICAgICAgIMKjXCIsIFwiwqMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggeCAgICAgICAgICDCo1wiLCBcIsKjICB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgeCB4IHggICAgeCAgIC0rwqNcIiwgXCLCoyAgICAgICAgICAgICAgeiAgICAgICB6ICAgICB4IHggeCB4ICAgIHggICAoKcKjXCIsIFwiISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISFcIl1dO1xuICAgIGNvbnN0IGxldmVsQ25mID0ge1xuICAgICAgd2lkdGg6IDIwLFxuICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgIFwiPVwiOiBbc3ByaXRlKFwiYmxvY2tcIiksIHNvbGlkKCldLFxuICAgICAgJDogW3Nwcml0ZShcImNvaW5cIiksIFwiY29pblwiXSxcbiAgICAgIFwiJVwiOiBbc3ByaXRlKFwic3VycHJpc2VcIiksIHNvbGlkKCksIFwiY29pbi1zdXJwcmlzZVwiXSxcbiAgICAgIFwiKlwiOiBbc3ByaXRlKFwic3VycHJpc2VcIiksIHNvbGlkKCksIFwibXVzaHJvb20tc3VycHJpc2VcIl0sXG4gICAgICBcIn1cIjogW3Nwcml0ZShcInVuYm94ZWRcIiksIHNvbGlkKCldLFxuICAgICAgXCIoXCI6IFtzcHJpdGUoXCJwaXBlLWJvdHRvbS1sZWZ0XCIpLCBzb2xpZCgpLCBzY2FsZSgwLjUpXSxcbiAgICAgIFwiKVwiOiBbc3ByaXRlKFwicGlwZS1ib3R0b20tcmlnaHRcIiksIHNvbGlkKCksIHNjYWxlKDAuNSldLFxuICAgICAgXCItXCI6IFtzcHJpdGUoXCJwaXBlLXRvcC1sZWZ0XCIpLCBzb2xpZCgpLCBzY2FsZSgwLjUpLCBcInBpcGVcIl0sXG4gICAgICBcIitcIjogW3Nwcml0ZShcInBpcGUtdG9wLXJpZ2h0XCIpLCBzb2xpZCgpLCBzY2FsZSgwLjUpLCBcInBpcGVcIl0sXG4gICAgICBcIl5cIjogW3Nwcml0ZShcImV2aWwtc2hyb29tXCIpLCBzb2xpZCgpLCBcImRhbmdlcm91c1wiXSxcbiAgICAgIFwiI1wiOiBbc3ByaXRlKFwibXVzaHJvb21cIiksIHNvbGlkKCksIFwibXVzaHJvb21cIiwgYm9keSgpXSxcbiAgICAgIFwiIVwiOiBbc3ByaXRlKFwiYmx1ZS1ibG9ja1wiKSwgc29saWQoKSwgc2NhbGUoMC41KV0sXG4gICAgICBcIsKjXCI6IFtzcHJpdGUoXCJibHVlLWJyaWNrXCIpLCBzb2xpZCgpLCBzY2FsZSgwLjUpXSxcbiAgICAgIHo6IFtzcHJpdGUoXCJibHVlLWV2ZWwtbXVzaHJvb21cIiksIHNvbGlkKCksIHNjYWxlKDAuNSksIFwiZGFuZ2Vyb3VzXCJdLFxuICAgICAgXCJAXCI6IFtzcHJpdGUoXCJibHVlLXN1cnByaXNlXCIpLCBzb2xpZCgpLCBzY2FsZSgwLjUpLCBcImNvaW4tc3VycHJpc2VcIl0sXG4gICAgICB4OiBbc3ByaXRlKFwiYmx1ZS1zdGVlbFwiKSwgc29saWQoKSwgc2NhbGUoMC41KV1cbiAgICB9O1xuICAgIGNvbnN0IGdhbWVMZXZlbCA9IGFkZExldmVsKG1hcHNbbGV2ZWxdLCBsZXZlbENuZik7XG4gICAgY29uc3Qgc2NvcmVMYWJlbCA9IGFkZChbdGV4dChzY29yZSksIHBvcygzMCwgNiksIGxheWVyKFwidWlcIiksIHtcbiAgICAgIHZhbHVlOiBzY29yZVxuICAgIH1dKTtcbiAgICBhZGQoW3RleHQoXCIgbGV2ZWwgXCIgKyBwYXJzZUludChsZXZlbCArIDEpKSwgcG9zKDQwLCA2KV0pO1xuICAgIGNvbnN0IHBsYXllciA9IGFkZChbc3ByaXRlKFwibWFyaW9cIiksIHNvbGlkKCksIHBvcygzMCwgMCksIGJvZHkoKSwgYmlnKCksIG9yaWdpbihcImJvdFwiKV0pO1xuICAgIGZ1bmN0aW9uIGJpZygpIHtcbiAgICAgIGxldCB0aW1lciA9IDA7XG4gICAgICBsZXQgaXNCaWcgPSBmYWxzZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgICBpZiAoaXNCaWcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRKdW1wRm9yY2UgPSBiaWdKdW1wRm9yY2U7XG4gICAgICAgICAgICB0aW1lciAtPSBkdCgpO1xuICAgICAgICAgICAgaWYgKHRpbWVyIDw9IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5zbWFsbHlmeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNCaWcoKSB7XG4gICAgICAgICAgcmV0dXJuIGlzQmlnO1xuICAgICAgICB9LFxuICAgICAgICBzbWFsbHlmeSgpIHtcbiAgICAgICAgICB0aGlzLnNjYWxlID0gdmVjMigxKTtcbiAgICAgICAgICBjdXJyZW50SnVtcEZvcmNlID0ganVtcEZvcmNlO1xuICAgICAgICAgIGlzQmlnID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGJpZ2dpZnkodGltZSkge1xuICAgICAgICAgIHRoaXMuc2NhbGUgPSB2ZWMyKDIpO1xuICAgICAgICAgIHRpbWVyID0gdGltZTtcbiAgICAgICAgICBpc0JpZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHBsYXllci5vbihcImhlYWRidW1wXCIsIG9iaiA9PiB7XG4gICAgICBpZiAob2JqLmlzKFwiY29pbi1zdXJwcmlzZVwiKSkge1xuICAgICAgICBnYW1lTGV2ZWwuc3Bhd24oXCIkXCIsIG9iai5ncmlkUG9zLnN1YigwLCAxKSk7XG4gICAgICAgIGRlc3Ryb3kob2JqKTtcbiAgICAgICAgZ2FtZUxldmVsLnNwYXduKFwifVwiLCBvYmouZ3JpZFBvcy5hZGQoMCwgMCkpO1xuICAgICAgfVxuICAgICAgaWYgKG9iai5pcyhcIm11c2hyb29tLXN1cnByaXNlXCIpKSB7XG4gICAgICAgIGdhbWVMZXZlbC5zcGF3bihcIiNcIiwgb2JqLmdyaWRQb3Muc3ViKDAsIDEpKTtcbiAgICAgICAgZGVzdHJveShvYmopO1xuICAgICAgICBnYW1lTGV2ZWwuc3Bhd24oXCJ9XCIsIG9iai5ncmlkUG9zLmFkZCgwLCAwKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYWN0aW9uKFwibXVzaHJvb21cIiwgbSA9PiB7XG4gICAgICBtLm1vdmUoMjAsIDApO1xuICAgIH0pO1xuICAgIGFjdGlvbihcImRhbmdlcm91c1wiLCBkID0+IHtcbiAgICAgIGQubW92ZSgtZW5lbXlTcGVlZCwgMCk7XG4gICAgfSk7XG4gICAgcGxheWVyLmFjdGlvbigoKSA9PiB7XG4gICAgICBjYW1Qb3MocGxheWVyLnBvcyk7XG4gICAgICBpZiAocGxheWVyLnBvcy55ID49IGZhbGxEZWF0aCkge1xuICAgICAgICBnbyhcImxvc2VcIiwge1xuICAgICAgICAgIHNjb3JlOiBzY29yZUxhYmVsLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHBsYXllci5jb2xsaWRlcyhcImNvaW5cIiwgYyA9PiB7XG4gICAgICBkZXN0cm95KGMpO1xuICAgICAgc2NvcmVMYWJlbC52YWx1ZSsrO1xuICAgICAgc2NvcmVMYWJlbC50ZXh0ID0gc2NvcmVMYWJlbC52YWx1ZTtcbiAgICB9KTtcbiAgICBwbGF5ZXIuY29sbGlkZXMoXCJtdXNocm9vbVwiLCBtID0+IHtcbiAgICAgIGRlc3Ryb3kobSk7XG4gICAgICBwbGF5ZXIuYmlnZ2lmeSg2KTtcbiAgICB9KTtcbiAgICBwbGF5ZXIuY29sbGlkZXMoXCJkYW5nZXJvdXNcIiwgZCA9PiB7XG4gICAgICBpZiAoaXNKdW1waW5nKSB7XG4gICAgICAgIGRlc3Ryb3koZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbyhcImxvc2VcIiwge1xuICAgICAgICAgIHNjb3JlOiBzY29yZUxhYmVsLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHBsYXllci5jb2xsaWRlcyhcInBpcGVcIiwgKCkgPT4ge1xuICAgICAga2V5UHJlc3MoXCJkb3duXCIsICgpID0+IHtcbiAgICAgICAgZ28oXCJnYW1lXCIsIHtcbiAgICAgICAgICBsZXZlbDogKGxldmVsICsgMSkgJSBtYXBzLmxlbmd0aCxcbiAgICAgICAgICBzY29yZTogc2NvcmVMYWJlbC52YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGtleURvd24oXCJsZWZ0XCIsICgpID0+IHtcbiAgICAgIHBsYXllci5tb3ZlKC1tb3ZlU3BlZWQsIDApO1xuICAgIH0pO1xuICAgIGtleURvd24oXCJyaWdodFwiLCAoKSA9PiB7XG4gICAgICBwbGF5ZXIubW92ZShtb3ZlU3BlZWQsIDApO1xuICAgIH0pO1xuICAgIHBsYXllci5hY3Rpb24oKCkgPT4ge1xuICAgICAgaWYgKHBsYXllci5ncm91bmRlZCgpKSB7XG4gICAgICAgIGlzSnVtcGluZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGtleVByZXNzKFwic3BhY2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKHBsYXllci5ncm91bmRlZCgpKSB7XG4gICAgICAgIGlzSnVtcGluZyA9IHRydWU7XG4gICAgICAgIHBsYXllci5qdW1wKGN1cnJlbnRKdW1wRm9yY2UpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHNjZW5lKFwibG9zZVwiLCAoe1xuICAgICAgc2NvcmVcbiAgICB9KSA9PiB7XG4gICAgICBhZGQoW3RleHQoc2NvcmUsIDMyKSwgb3JpZ2luKFwiY2VudGVyXCIpLCBwb3Mod2lkdGgoKSAvIDIsIGhlaWdodCgpIC8gMildKTtcbiAgICAgIHVwZGF0ZVNjb3JlKHNjb3JlKTtcbiAgICB9KTtcbiAgfSk7XG4gIHN0YXJ0KFwiZ2FtZVwiLCB7XG4gICAgbGV2ZWw6IDAsXG4gICAgc2NvcmU6IDBcbiAgfSk7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/game.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("b3eb93dfa2c76c5c030f")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "mario-game-js:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatemario_game_js"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.js");
/******/ 	
/******/ })()
;