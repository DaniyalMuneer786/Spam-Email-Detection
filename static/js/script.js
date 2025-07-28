// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const emailContent = document.getElementById('emailContent');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const clearBtn = document.getElementById('clearBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    const resultSection = document.getElementById('resultSection');
    const resultCard = document.getElementById('resultCard');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const confidenceFill = document.getElementById('confidenceFill');
    const confidenceText = document.getElementById('confidenceText');
    const detailsGrid = document.getElementById('detailsGrid');
    const keywordsList = document.getElementById('keywordsList');
    const keywordsContainer = document.getElementById('keywordsContainer');
    const analysisDetails = document.getElementById('analysisDetails');

    // Sample spam email for the "Try Sample" button
    const sampleSpamEmail = `CONGRATULATIONS! You've WON our $5,000,000 LOTTERY!!!
    
Dear Lucky Winner,

YOUR EMAIL has been selected as the WINNER of our International Lottery with a prize of $5,000,000.00 (FIVE MILLION DOLLARS)!!!

To claim your prize, you MUST contact our agent IMMEDIATELY:
Email: agent.payment@scam-lottery.com
WhatsApp: +1234567890

You need to send the following information:
1. Full Name
2. Address
3. Phone Number
4. Copy of ID
5. Bank Details

THIS IS URGENT!!! You must respond within 24 HOURS or your prize will be VOID!!!

This is 100% LEGITIMATE and NOT A SCAM!!!

Best Regards,
Dr. James Williams
International Lottery Commission`;

    // Event listeners
    analyzeBtn.addEventListener('click', analyzeEmail);
    clearBtn.addEventListener('click', clearForm);
    sampleBtn.addEventListener('click', loadSampleEmail);

    // Function to analyze email content
    function analyzeEmail() {
        // Get the email content
        const content = emailContent.value.trim();
        
        // Validate input
        if (!content) {
            alert('Please enter some email content to analyze.');
            return;
        }
        
        // Show the result section with loading state
        resultSection.classList.remove('hidden');
        resultCard.className = 'card result-card';
        resultIcon.className = 'result-icon';
        resultIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        resultTitle.textContent = 'Analyzing...';
        resultTitle.className = '';
        confidenceFill.style.width = '0%';
        confidenceFill.className = 'confidence-fill';
        confidenceText.textContent = '0%';
        detailsGrid.innerHTML = '';
        keywordsList.innerHTML = '';
        keywordsContainer.style.display = 'none';
        
        // Scroll to result section
        resultSection.scrollIntoView({ behavior: 'smooth' });
        
        // Simulate analysis delay (would be an API call in a real app)
        setTimeout(() => {
            // Perform the analysis
            const result = analyzeEmailContent(content);
            
            // Update the UI with results
            displayResults(result);
        }, 1500);
    }
    
    // Function to analyze email content for spam indicators
    function analyzeEmailContent(content) {
        // Convert to lowercase for case-insensitive matching
        const lowerContent = content.toLowerCase();
        
        // Common spam keywords and phrases
        const spamKeywords = [
            'congratulations', 'winner', 'won', 'lottery', 'prize', 'million', 
            'urgent', 'bank details', 'claim', 'offer', 'limited time', 
            'investment opportunity', 'bitcoin', 'cryptocurrency', 'inheritance',
            'nigeria', 'prince', 'transaction', 'overseas', 'fund transfer',
            'unclaimed', 'beneficiary', 'payment', 'lucky', 'selected',
            'casino', 'discount', 'free', 'guaranteed', 'cash', 'credit',
            'viagra', 'medication', 'pharmacy', 'prescription', 'pills'
        ];
        
        // Find matching spam keywords
        const foundKeywords = spamKeywords.filter(keyword => 
            lowerContent.includes(keyword)
        );
        
        // Calculate keyword score (more matches = higher score)
        const keywordScore = Math.min(foundKeywords.length / 5, 1);
        
        // Check for excessive capitalization (common in spam)
        const words = content.split(/\s+/);
        const capsWords = words.filter(word => 
            word.length > 3 && word === word.toUpperCase()
        );
        const capsScore = Math.min(capsWords.length / (words.length * 0.3), 1);
        
        // Check for excessive punctuation (common in spam)
        const exclamationCount = (content.match(/!/g) || []).length;
        const questionCount = (content.match(/\?/g) || []).length;
        const punctuationScore = Math.min((exclamationCount + questionCount) / 10, 1);
        
        // Check for suspicious links or email addresses
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const emails = content.match(emailRegex) || [];
        const urls = content.match(urlRegex) || [];
        const linkScore = Math.min((emails.length + urls.length) / 3, 1);
        
        // Check for urgency language
        const urgencyTerms = ['urgent', 'immediately', 'today', 'now', 'hurry', 'limited', 'expires', 'deadline'];
        const urgencyMatches = urgencyTerms.filter(term => lowerContent.includes(term));
        const urgencyScore = Math.min(urgencyMatches.length / 3, 1);
        
        // Calculate overall spam score (weighted average)
        const overallScore = (
            keywordScore * 0.35 + 
            capsScore * 0.2 + 
            punctuationScore * 0.15 + 
            linkScore * 0.15 + 
            urgencyScore * 0.15
        );
        
        // Determine if it's spam based on threshold
        const isSpam = overallScore > 0.5;
        const confidenceScore = Math.round(isSpam ? overallScore * 100 : (1 - overallScore) * 100);
        
        // Return the analysis result
        return {
            isSpam: isSpam,
            confidence: confidenceScore,
            details: {
                suspiciousKeywords: {
                    score: Math.round(keywordScore * 100),
                    count: foundKeywords.length,
                    items: foundKeywords
                },
                excessiveCaps: {
                    score: Math.round(capsScore * 100),
                    count: capsWords.length
                },
                excessivePunctuation: {
                    score: Math.round(punctuationScore * 100),
                    count: exclamationCount + questionCount
                },
                suspiciousLinks: {
                    score: Math.round(linkScore * 100),
                    count: emails.length + urls.length
                },
                urgencyLanguage: {
                    score: Math.round(urgencyScore * 100),
                    count: urgencyMatches.length,
                    items: urgencyMatches
                }
            }
        };
    }
    
    // Function to display analysis results
    function displayResults(result) {
        // Update result card class
        resultCard.className = `card result-card ${result.isSpam ? 'spam' : 'ham'}`;
        
        // Update result icon
        resultIcon.className = `result-icon ${result.isSpam ? 'spam' : 'ham'}`;
        resultIcon.innerHTML = result.isSpam 
            ? '<i class="fas fa-exclamation-triangle"></i>' 
            : '<i class="fas fa-check-circle"></i>';
        
        // Update result title
        resultTitle.textContent = result.isSpam 
            ? 'Spam Detected' 
            : 'Legitimate Email';
        resultTitle.className = result.isSpam ? 'spam' : 'ham';
        
        // Update confidence meter
        confidenceFill.style.width = `${result.confidence}%`;
        confidenceFill.className = `confidence-fill ${result.isSpam ? 'spam' : 'ham'}`;
        confidenceText.textContent = `${result.confidence}%`;
        
        // Update details grid
        detailsGrid.innerHTML = `
            <div class="detail-item">
                <span class="detail-label">Suspicious Keywords</span>
                <span class="detail-value ${getScoreClass(result.details.suspiciousKeywords.score)}">${result.details.suspiciousKeywords.score}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Excessive Caps</span>
                <span class="detail-value ${getScoreClass(result.details.excessiveCaps.score)}">${result.details.excessiveCaps.score}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Excessive Punctuation</span>
                <span class="detail-value ${getScoreClass(result.details.excessivePunctuation.score)}">${result.details.excessivePunctuation.score}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Suspicious Links</span>
                <span class="detail-value ${getScoreClass(result.details.suspiciousLinks.score)}">${result.details.suspiciousLinks.score}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Urgency Language</span>
                <span class="detail-value ${getScoreClass(result.details.urgencyLanguage.score)}">${result.details.urgencyLanguage.score}%</span>
            </div>
        `;
        
        // Update keywords list if there are any
        const allKeywords = [
            ...result.details.suspiciousKeywords.items,
            ...result.details.urgencyLanguage.items
        ];
        
        if (allKeywords.length > 0) {
            keywordsContainer.style.display = 'block';
            keywordsList.innerHTML = '';
            
            // Remove duplicates and sort
            const uniqueKeywords = [...new Set(allKeywords)].sort();
            
            // Add each keyword to the list
            uniqueKeywords.forEach(keyword => {
                const keywordElement = document.createElement('span');
                keywordElement.className = 'keyword';
                keywordElement.textContent = keyword;
                keywordsList.appendChild(keywordElement);
            });
        } else {
            keywordsContainer.style.display = 'none';
        }
        
        // Add animation to result card
        resultCard.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            resultCard.style.animation = '';
        }, 500);
    }
    
    // Helper function to get CSS class based on score
    function getScoreClass(score) {
        if (score >= 70) return 'high';
        if (score >= 40) return 'medium';
        return 'low';
    }
    
    // Function to clear the form
    function clearForm() {
        emailContent.value = '';
        resultSection.classList.add('hidden');
        emailContent.focus();
    }
    
    // Function to load sample spam email
    function loadSampleEmail() {
        emailContent.value = sampleSpamEmail;
        analyzeEmail();
    }
});







function analyzeEmail() {
    const content = emailContent.value.trim();

    if (!content) {
        alert('Please enter some email content to analyze.');
        return;
    }

    // Show loading screen
    resultSection.classList.remove('hidden');
    resultTitle.textContent = 'Analyzing...';
    resultIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Call Flask API
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: content }),
    })
    .then(response => response.json())
    .then(data => {
        const isSpam = (data.prediction === 'Spam');

        // Update result UI based on prediction
        resultIcon.innerHTML = isSpam 
            ? '<i class="fas fa-exclamation-triangle"></i>' 
            : '<i class="fas fa-check-circle"></i>';
        resultTitle.textContent = isSpam ? 'Spam Detected' : 'Legitimate Email';
        confidenceFill.style.width = isSpam ? '90%' : '90%'; // fake confidence
        confidenceText.textContent = '90%';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong!');
    });
}
