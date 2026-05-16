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
      "https://opentdb.com/api.php?amount=10&category=11&type=multiple"
    );

    const data = await response.json();

    questions = data.results.map((q) => {

      // Merge correct + incorrect answers
      const allOptions = [
        ...q.incorrect_answers,
        q.correct_answer,
      ];

      // Shuffle options
      allOptions.sort(() => Math.random() - 0.5);

      return {
        question: decodeHTML(q.question),

        options: allOptions.map((option) =>
          decodeHTML(option)
        ),

        answer: decodeHTML(q.correct_answer),
      };

    });

  } catch (error) {

    console.log("Error Fetching Questions:", error);

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

      <div class="relative z-10 text-center">

        <div class="inline-flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full text-sm text-gray-300 mb-6">
          ⚡ Fun Quiz Game
        </div>

        <h1 class="text-5xl md:text-7xl font-black">
          QUIZ APP
        </h1>

        <p class="mt-5 text-gray-400 text-base md:text-lg">
          Answer 10 random questions and test yourself.
        </p>

        <button
          id="playBtn"
          class="mt-10 px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
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
    <section class="min-h-screen bg-black text-white flex items-center justify-center">

      <div class="text-center">

        <div class="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-5"></div>

        <h1 class="text-2xl font-bold">
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
    <section class="min-h-screen bg-black text-white flex items-center justify-center px-4 py-6 overflow-hidden relative">

      <!-- Glow -->
      <div class="absolute w-[250px] h-[250px] bg-white/10 blur-3xl rounded-full"></div>

      <!-- Card -->
      <div class="relative z-10 w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 md:p-7">

        <!-- TOP -->
        <div class="flex items-center justify-between gap-4 mb-6">

          <div>

            <p class="text-gray-400 text-xs md:text-sm mb-1">
              Question ${currentQuestion + 1}/${questions.length}
            </p>

            <h1 class="text-xl sm:text-2xl md:text-3xl font-black leading-snug">
              ${q.question}
            </h1>

          </div>

          <!-- SCORE -->
          <div class="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl text-center min-w-[90px] shrink-0">

            <p class="text-gray-400 text-[10px] uppercase">
              Score
            </p>

            <h2 class="text-2xl md:text-3xl font-black">
              ${score}
            </h2>

          </div>

        </div>

        <!-- PROGRESS -->
        <div class="mb-7">

          <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">

            <div
              class="h-full bg-white rounded-full transition-all duration-500"
              style="width:${progress}%"
            ></div>

          </div>

        </div>

        <!-- OPTIONS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

          ${q.options
            .map(
              (option, index) => `
                <button
                  class="optionBtn group p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-left"
                >

                  <div class="flex items-center gap-3">

                    <div class="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-black group-hover:text-white flex items-center justify-center font-bold transition-all duration-300 shrink-0">
                      ${String.fromCharCode(65 + index)}
                    </div>

                    <span class="text-sm md:text-base font-medium break-words">
                      ${option}
                    </span>

                  </div>

                </button>
              `
            )
            .join("")}

        </div>

        <!-- NEXT BUTTON -->
        <button
          id="nextBtn"
          class="hidden mt-7 w-full py-4 rounded-2xl bg-white text-black font-bold text-sm md:text-base hover:scale-[1.01] transition-all duration-300"
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
    <section class="min-h-screen bg-black flex items-center justify-center px-6 text-white">

      <div class="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

        <h1 class="text-4xl md:text-5xl font-black mb-8">
          QUIZ FINISHED
        </h1>

        <div class="space-y-4 text-lg">

          <p>
            Total Score :
            <span class="font-bold text-green-400">
              ${score}
            </span>
          </p>

          <p>
            Correct Answers :
            <span class="font-bold text-green-400">
              ${correctAnswers}
            </span>
          </p>

          <p>
            Wrong Answers :
            <span class="font-bold text-red-400">
              ${wrongAnswers}
            </span>
          </p>

        </div>

        <!-- BUTTONS -->
        <div class="flex gap-4 mt-10">

          <button
            id="restartBtn"
            class="flex-1 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-all duration-300"
          >
            PLAY AGAIN
          </button>

          <button
            id="backBtn"
            class="flex-1 py-4 rounded-2xl border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
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
