# 📧 Spam and Ham Email Detection Using ML and NLP

This project is a Flask-based web application that detects whether an email is **Spam** or **Ham (legitimate)** using various machine learning algorithms and natural language processing techniques.

---

## 🎯 Objective

Automatically classify incoming emails as spam or ham to:
- Protect users from scams and phishing attacks
- Improve inbox cleanliness
- Save time with accurate filtering

---

## 🧠 Motivation

Email spam is a common issue affecting productivity and security. Manual filtering is not feasible due to the sheer volume of messages. This project introduces an intelligent system for real-time detection of spam messages.

---

## 🗃️ Dataset

- **Source:** UCI Machine Learning Repository – SMS Spam Collection
- **Size:** ~5,500 labeled messages
- **Labels:** `spam` or `ham`
- **Feature:** Email/message text

---

## 🛠️ Technologies Used

- **Language:** Python
- **Web Framework:** Flask
- **Frontend:** HTML, CSS, JavaScript
- **Libraries:**
  - `sklearn` – ML models
  - `nltk` – NLP preprocessing
  - `pandas`, `numpy` – data handling
  - `matplotlib`, `seaborn` – visualization

---

## 🧪 Machine Learning Models

| Model                | Accuracy | Spam Precision | Spam Recall | Spam F1 |
|---------------------|----------|----------------|-------------|---------|
| Naive Bayes ✅       | 97.2%    | 100%           | 80%         | 89%     |
| SVM                 | 97.3%    | 98%            | 82%         | 89%     |
| Logistic Regression | 95.5%    | 98%            | 68%         | 80%     |
| Random Forest       | 97.4%    | 98%            | 83%         | 90%     |
| XGBoost             | 97.2%    | 95%            | 84%         | 89%     |

> **Best Performing Model:** ✅ Multinomial Naive Bayes

---

## 🔄 Methodology

1. **Data Cleaning** – Remove punctuation, numbers, special characters.
2. **Preprocessing** – Lowercase, stopword removal, tokenization, stemming.
3. **Feature Extraction** – TF-IDF vectorization.
4. **Model Training** – Trained on 80% data, tested on 20%.
5. **Evaluation** – Accuracy, Precision, Recall, F1-score.

---

## 📁 Project Structure

Spam_and_Ham_Email_Detection_project/
│
├── static/
│ ├── css/styles.css
│ └── js/script.js
│
├── templates/
│ └── index.html
│
├── app.py # Flask backend
├── Logistic_Regression_model.pkl
├── tfidf_vectorizer.pkl

yaml
Copy
Edit

---

## 🚀 How to Run

1. **Clone this repo**  
   ```bash
   git clone https://github.com/yourusername/spam-detector.git
   cd spam-detector
Install required packages

bash
Copy
Edit
pip install -r requirements.txt
Run the Flask app

bash
Copy
Edit
python app.py
Access the web app
Visit: http://127.0.0.1:5000/

✅ Conclusion
This project shows how machine learning combined with NLP can accurately detect spam messages. The Naive Bayes model gave the best balance of performance and simplicity.

vbnet
Copy
Edit

Let me know if you want help with:
- Creating `requirements.txt`
- Creating a basic `index.html` for the interface
- Uploading to GitHub

I’m happy to assist!
