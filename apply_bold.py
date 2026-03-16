import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

keywords = [
    "Design Thinking", "Human-centered", "Empathize", "Define", "Ideate", "Prototype", "Test",
    "Problem solving", "Cloud Computing", "IaaS", "PaaS", "SaaS", "E-commerce", "Entrepreneurship",
    "Digital Age", "User experience", "Target audience", "Startups", "Innovation", "Business Model",
    "Value Proposition", "Revenue Stream", "Revenue Streaming", "Digital Marketing", "SEO", "Search Engine Optimization",
    "Social Media", "Analytics", "Data", "Cybersecurity", "Blockchain", "Agile", "Scrum",
    "Minimum Viable Product", "MVP", "Pitch", "Pitching", "Funding", "Venture Capital", "Angel Investors",
    "Networking", "Scalability", "Target Market", "Market Research", "Machine Learning", "AI",
    "Artificial Intelligence", "Internet of Things", "IoT", "Big Data", "Automation", "Disruption",
    "Customer Acquisition", "Retention", "ROI", "Return on Investment", "KPI", "Metrics",
    "Freelancing", "Gig Economy", "Remote Work", "Product-Market Fit", "Brainstorming",
    "Information and Communication Technology", "Information Technology", "Cloud Storage",
    "Target customers", "Competitors", "Customer feedback", "Numerical data", "Interviews", "Qualitative research", "Quantitative research",
    "Executive Summary", "Market Analysis", "Market segmentation", "Competitor analysis", "Predictive analysis", "Focus group", "Collaborative tools", "Creativity", "Communication", "Storytelling", "Iteration"
]

def replacer(match):
    prefix = match.group(1)
    inner_text = match.group(2)
    suffix = match.group(3)
    
    sorted_kws = sorted(keywords, key=len, reverse=True)
    
    for i, kw in enumerate(sorted_kws):
        pattern = re.compile(r'\b(' + re.escape(kw) + r')\b', re.IGNORECASE)
        def temp_repl(m):
            return f"__TOKEN_{i}_{m.group(1)}__"
        inner_text = pattern.sub(temp_repl, inner_text)
        
    def expand_token(m):
        return f"<strong>{m.group(1)}</strong>"
    
    inner_text = re.sub(r'__TOKEN_\d+_(.*?)__', expand_token, inner_text)
    
    return f"{prefix}{inner_text}{suffix}"

text = re.sub(r'(<p class="answer-text">)(.*?)(</p>)', replacer, text, flags=re.DOTALL)
text = re.sub(r'(<p class="extra-text">)(.*?)(</p>)', replacer, text, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("success")