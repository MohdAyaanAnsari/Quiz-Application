const app = document.getElementById("app");

// ======================
// QUESTIONS ARRAY
// ======================

let questions = [];

// ======================
// VARIABLES
// ======================

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let answered = false;

// ======================
// FETCH QUESTIONS FROM API
// ======================

async function fetchQuestions() {
  try {
    const response = await fetch(
      "https://the-trivia-api.com/v2/questions?categories=film_and_tv&limit=20"
    );

    const data = await response.json();

    // Filter Game of Thrones related questions
    const gotQuestions = data.filter((q) => {
      const text =
        q.question.text.toLowerCase();

      return (
        text.includes("game of thrones") ||
        text.includes("jon snow") ||
        text.includes("stark") ||
        text.includes("lannister") ||
        text.includes("targaryen") ||
        text.includes("dragon")
      );
    });

    questions = gotQuestions.map((q) => {
      const options = [
        ...q.incorrectAnswers,
        q.correctAnswer,
      ];

      // Shuffle options
      options.sort(() => Math.random() - 0.5);

      return {
        question: q.question.text,
        options,
        answer: q.correctAnswer,
      };
    });

    // Fallback if API gives less questions
    if (questions.length < 5) {
      questions = [
        {
          question:
            "Who killed the Night King?",
          options: [
            "Jon Snow",
            "Arya Stark",
            "Jaime Lannister",
            "The Hound",
          ],
          answer: "Arya Stark",
        },

        {
          question:
            "What is the motto of House Stark?",
          options: [
            "Winter is Coming",
            "Fire and Blood",
            "Hear Me Roar",
            "Ours is the Fury",
          ],
          answer: "Winter is Coming",
        },
      ];
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

// ======================
// DECODE HTML
// ======================

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// ======================
// HOME SCREEN
// ======================

function showHomeScreen() {
  app.innerHTML = `
    <section class="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      <div class="absolute w-[300px] h-[300px] bg-white/10 blur-3xl rounded-full animate-pulse"></div>

      <div class="relative z-10 text-center w-full max-w-md mx-auto">

        <div class="inline-flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full text-sm text-gray-300 mb-6">
          ⚡ Fun Quiz Game
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight">
          QUIZ APP
        </h1>

        <p class="mt-5 text-gray-400 text-sm sm:text-base md:text-lg">
          Answer 10 random questions and test yourself.
        </p>

        <button
          id="playBtn"
          class="mt-10 w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
        >
          PLAY
        </button>

      </div>

    </section>
  `;

  document
    .getElementById("playBtn")
    .addEventListener("click", startQuiz);
}

// ======================
// START QUIZ
// ======================

async function startQuiz() {
  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;
  wrongAnswers = 0;

  // Loading Screen
  app.innerHTML = `
    <section class="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div class="text-center">

        <div class="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-5"></div>

        <h1 class="text-xl font-bold">
          Loading Questions...
        </h1>

      </div>

    </section>
  `;

  await fetchQuestions();

  showQuestion();
}

// ======================
// SHOW QUESTION
// ======================

function showQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  app.innerHTML = `
    <section class="min-h-screen bg-black text-white flex items-center justify-center px-4 py-6 relative">

      <!-- Glow -->
      <div class="absolute w-[250px] h-[250px] bg-white/10 blur-3xl rounded-full pointer-events-none"></div>

      <!-- Card -->
      <div class="relative z-10 w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-5 md:p-7 my-auto">

        <!-- TOP CONTAINER -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-6">

          <div class="flex-1">

            <p class="text-gray-400 text-[11px] md:text-sm mb-0.5 font-medium tracking-wide">
              Question ${currentQuestion + 1}/${questions.length}
            </p>

            <h1 class="text-base sm:text-xl md:text-3xl font-black leading-snug break-words">
              ${q.question}
            </h1>

          </div>

          <!-- SCORE BADGE -->
          <div class="bg-white/10 border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl flex sm:flex-col justify-between sm:justify-center items-center min-w-[90px] sm:min-w-[100px] shrink-0 gap-1">

            <p class="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">
              Score
            </p>

            <h2 class="text-base sm:text-2xl md:text-3xl font-black">
              ${score}
            </h2>

          </div>

        </div>

        <!-- PROGRESS BAR -->
        <div class="mb-5 sm:mb-7">

          <div class="w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">

            <div
              class="h-full bg-white rounded-full transition-all duration-500"
              style="width:${progress}%"
            ></div>

          </div>

        </div>

        <!-- OPTIONS GRID (Reduced option padding/sizing on mobile view) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

          ${q.options
            .map(
              (option, index) => `
                <button
                  class="optionBtn group p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-left w-full h-full min-h-[52px] sm:min-h-[64px]"
                >

                  <div class="flex items-center gap-2.5 sm:gap-3 h-full">

                    <div class="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 group-hover:bg-black group-hover:text-white flex items-center justify-center font-bold text-xs sm:text-base transition-all duration-300 shrink-0">
                      ${String.fromCharCode(65 + index)}
                    </div>

                    <span class="text-xs sm:text-sm md:text-base font-medium break-words flex-1 leading-tight">
                      ${option}
                    </span>

                  </div>

                </button>
              `
            )
            .join("")}

        </div>

        <!-- NEXT BUTTON (Reduced padding from py-4 to py-3 on small screens) -->
        <button
          id="nextBtn"
          class="hidden mt-5 sm:mt-7 w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-black font-bold text-xs sm:text-sm md:text-base hover:scale-[1.01] transition-all duration-300 shadow-lg"
        >
          ${
            currentQuestion === questions.length - 1
              ? "FINISH QUIZ"
              : "NEXT QUESTION"
          }
        </button>

      </div>

    </section>
  `;

  const optionBtns =
    document.querySelectorAll(".optionBtn");

  const nextBtn =
    document.getElementById("nextBtn");

  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (answered) return;

      answered = true;

      const selectedAnswer =
        btn.innerText.trim();

      optionBtns.forEach((button) => {
        button.disabled = true;

        // CORRECT ANSWER
        if (
          button.innerText.includes(q.answer)
        ) {
          button.classList.remove(
            "bg-white/5",
            "hover:bg-white",
            "hover:text-black"
          );

          button.classList.add(
            "bg-green-500",
            "border-green-400",
            "text-white"
          );
        }
      });

      // RIGHT
      if (
        selectedAnswer.includes(q.answer)
      ) {
        score += 10;

        correctAnswers++;

        btn.classList.add(
          "bg-green-500",
          "border-green-400",
          "text-white"
        );
      }

      // WRONG
      else {
        wrongAnswers++;

        btn.classList.remove(
          "bg-white/5",
          "hover:bg-white",
          "hover:text-black"
        );

        btn.classList.add(
          "bg-red-500",
          "border-red-400",
          "text-white"
        );
      }

      nextBtn.classList.remove("hidden");
    });
  });

  // NEXT
  nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResultPopup();
    }
  });
}

// ======================
// RESULT POPUP
// ======================

function showResultPopup() {
  app.innerHTML = `
    <section class="min-h-screen bg-black flex items-center justify-center px-4 py-8 text-white">

      <div class="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-center my-auto">

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black mb-8 tracking-tight">
          QUIZ FINISHED
        </h1>

        <div class="space-y-4 text-sm sm:text-base md:text-lg">

          <p class="flex justify-between border-b border-white/5 pb-2">
            <span class="text-gray-400">Total Score:</span>
            <span class="font-bold text-green-400">
              ${score}
            </span>
          </p>

          <p class="flex justify-between border-b border-white/5 pb-2">
            <span class="text-gray-400">Correct Answers:</span>
            <span class="font-bold text-green-400">
              ${correctAnswers}
            </span>
          </p>

          <p class="flex justify-between pb-2">
            <span class="text-gray-400">Wrong Answers:</span>
            <span class="font-bold text-red-400">
              ${wrongAnswers}
            </span>
          </p>

        </div>

        <!-- BUTTONS (Adjusted layout spacing on mobile views) -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">

          <button
            id="restartBtn"
            class="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-black font-bold text-xs sm:text-sm md:text-base hover:scale-105 transition-all duration-300"
          >
            PLAY AGAIN
          </button>

          <button
            id="backBtn"
            class="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-xs sm:text-sm md:text-base"
          >
            BACK
          </button>

        </div>

      </div>

    </section>
  `;

  // Restart
  document
    .getElementById("restartBtn")
    .addEventListener("click", startQuiz);

  // Back
  document
    .getElementById("backBtn")
    .addEventListener("click", showHomeScreen);
}

// ======================
// INITIAL LOAD
// ======================

showHomeScreen();
