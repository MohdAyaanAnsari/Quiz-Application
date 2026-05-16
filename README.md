# 🎯 Quiz App

An interactive **Quiz Application** built using **HTML, Tailwind CSS, and JavaScript**.  
Fetches 10 random movie trivia questions from the Open Trivia Database (OpenTDB) API and delivers a clean, animated quiz experience with real-time scoring and instant feedback.

---

## 🚀 Features

- 🌐 Fetches 10 live questions from the **OpenTDB API** (Movies category)
- 📌 Multiple-choice questions with 4 shuffled options per question
- 🖱️ Click-based answer selection
- 🔒 Options lock after one selection (no multiple attempts)
- ✅ Instant feedback — correct answers highlight **green**, wrong answers highlight **red**
- 📊 Live score tracker displayed on each question card
- 📈 Progress bar showing quiz completion
- 🏁 Result screen with total score, correct, and wrong answer counts
- 🔄 Play Again & Back to Home options
- ⚡ Loading screen while fetching questions
- 📱 Fully responsive UI for desktop & mobile

---

## 🛠️ Tech Stack

- **HTML5** – Structure
- **Tailwind CSS (CDN)** – Styling & animations
- **JavaScript (ES6+)** – Logic, API calls & interactivity

---

## 📂 Project Structure

```
quiz-app/
│── index.html      # Main HTML file (Tailwind CDN, app root div)
│── script.js       # Quiz logic (API fetch, rendering, scoring, navigation)
│── README.md       # Project documentation
```

---

## 🔌 API Used

**Open Trivia Database (OpenTDB)**
```
https://opentdb.com/api.php?amount=10&category=11&type=multiple
```
- `amount=10` — Fetches 10 questions
- `category=11` — Movies category
- `type=multiple` — Multiple choice format

---

## 🖥️ How It Works

1. User lands on the **Home Screen** and clicks **PLAY**
2. A **loading screen** appears while questions are fetched from the API
3. Questions are displayed one at a time with a **progress bar** and **live score**
4. On selecting an option:
   - Correct answer turns **green**
   - Selected wrong answer turns **red**, and correct answer is still revealed
   - All options are **disabled** after selection
5. User clicks **Next Question** / **Finish Quiz** to proceed
6. **Result screen** shows total score, correct answers, and wrong answers
7. User can **Play Again** (new API fetch) or go **Back** to the home screen

---

## 📸 Screenshots

### Desktop
![Desktop Screenshot](https://github.com/user-attachments/assets/258ddb6f-a6c7-4ff4-894a-ad12c5e5ca7f)

### Mobile
<!-- Add your mobile screenshot here -->

---

## 🧑‍💻 Author

**Mohd Ayaan Ansari**  
Software Developer
