from flask import Flask, request, render_template, jsonify
import joblib

tfidf = joblib.load('tfidf_vectorizer.pkl')
model = joblib.load('xgboost_model.pkl')

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email_content = data.get('email')


    transformed_text = tfidf.transform([email_content])
    prediction = model.predict(transformed_text)[0]


     # 0 = ham, 1 = spam
    result = 'spam' if prediction == 1 else 'ham'
    
    return jsonify({'Prediction': result})


if __name__ == '__main__':
    app.run(debug=True)
