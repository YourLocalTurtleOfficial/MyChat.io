// Load ChatGPT API
const chatgptApiKey = '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';
const chatgptEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Get DOM elements
const questionEl = document.getElementById('question');
const answerInputEl = document.getElementById('answer-input');
const feedbackEl = document.getElementById('feedback');
const submitAnswerBtn = document.getElementById('submit-answer');

// Initialize game
let currentQuestion;

async function loadQuestion() {
	// Use ChatGPT API to generate a question
	const prompt = 'Ask a trivia question';
	const temperature = 0.5;
	const maxTokens = 100;
	const response = await fetch(chatgptEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${chatgptApiKey}`
		},
		body: JSON.stringify({
			prompt: prompt,
			temperature: temperature,
			max_tokens: maxTokens,
			top_p: 1,
			n: 1,
			stream: false,
			stop: ['\n']
		})
	});
	const data = await response.json();
	const question = data.choices[0].text.trim();
	currentQuestion = question;

	// Update question element with generated question
	questionEl.innerText = question;
}

function checkAnswer() {
	// Check if answer matches question
	const answer = answerInputEl.value.trim();
	if (answer.toLowerCase() === currentQuestion.toLowerCase()) {
		feedbackEl.innerText = 'Correct!';
	} else {
		feedbackEl.innerText = 'Incorrect. Try again!';
	}
}

// Event listeners
submitAnswerBtn.addEventListener('click', checkAnswer);

// Initialize game
loadQuestion();
