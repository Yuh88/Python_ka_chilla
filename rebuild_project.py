import sys

# QUESTIONS DATA

phase1_qs = [
    ("What is Design Thinking?", "Design Thinking is a method that helps look at problems from different angles to deeply understand the issue instead of just jumping to solutions.", "Key Steps:", "It involves five main steps: Empathize, Define, Ideate, Prototype, and Test."),
    ("What are the five key steps of Design Thinking?", "The five key steps are Empathize, Define, Ideate, Prototype, and Test.", "Process Flow:", "These steps ensure businesses create products that users actually want by testing different ideas and focusing on the user's experience."),
    ("Define \"Empathize\" in the context of Design Thinking.", "Empathize means putting yourself in someone else's shoes to understand their feelings, needs, and challenges.", "Purpose:", "It is the foundational step used to gather information before clearly defining the problem."),
    ("What is a Prototype?", "A prototype is a simple version of your idea that you can create quickly to show what it might look like.", "Example:", "Creating a basic model of a school bag using cardboard or fabric before manufacturing the final product."),
    ("Define a Business Plan.", "A business plan is a document that describes your business idea, how you plan to make it successful, and the steps you will take to achieve your goals.", "Purpose:", "It acts like a map for starting and running a business, ensuring you are ready before launching."),
    ("What is an Executive Summary in a business plan?", "An Executive Summary is a brief overview of your business idea that includes what your business does, your goals, and how you plan to achieve them.", "Key Point:", "It is meant to capture the most important points of the entire business plan."),
    ("What is Market Analysis?", "Market Analysis is a section of a business plan that shows you understand your market by researching your potential customers, their needs, and your competitors.", "Example:", "Finding out how many pet owners live in your area and analyzing other existing pet-sitting services."),
    ("What is Market Research?", "Market research is the process of gathering data about the market in which your business operates to understand customer needs, preferences, and behaviors.", "Key Categories:", "It is mainly divided into two types: qualitative and quantitative research."),
    ("Differentiate between Qualitative and Quantitative Research.", "Qualitative research uses non-numerical data (like interviews) to understand underlying reasons and opinions, while quantitative research uses numerical data (like surveys) that can be measured statistically to find trends.", "Key Difference:", "Qualitative focuses on the \"why\" and \"how,\" whereas quantitative focuses on measurable patterns."),
    ("What is Market Segmentation?", "Market segmentation is the process of breaking down a larger target market into smaller, more specific groups based on factors like age, income, or buying habits.", "Benefit:", "It allows a business to adjust its products and marketing efforts to better meet the needs of each specific group."),
    ("Define Competitor Analysis.", "Competitor analysis involves studying your competitors' strengths, weaknesses, pricing strategies, and customer feedback.", "Strategic Advantage:", "It helps identify opportunities to differentiate your business from others in the market."),
    ("What is Predictive Analysis?", "Predictive analysis uses historical data to forecast future trends and outcomes.", "Example:", "If past sales data shows a steady increase in demand for a product, you can predict the trend will continue and increase production accordingly."),
    ("What is a Business Pitch?", "A business pitch is a short presentation where you clearly explain your business idea.", "Importance:", "It is crucial for getting the support and investment needed to turn an idea into reality."),
    ("What are the five key steps to pitching your idea?", "The steps are: 1) Start with the Problem, 2) Introduce Your Solution, 3) Explain Why It's Unique, 4) Know Your Audience, and 5) Be Prepared to Answer Questions.", "Key Point:", "Tailoring the pitch depends on the audience; investors focus on money, while customers focus on product benefits."),
    ("What is a Marketing Plan?", "A marketing plan details the strategies for reaching your target market.", "Components:", "It includes selecting promotional channels such as social media, television, or word-of-mouth."),
    ("Define Communication in everyday and business life.", "Communication is the process of exchanging information, ideas, or feelings with others.", "Types:", "It can be verbal (speaking or writing) or non-verbal (using gestures or facial expressions)."),
    ("What is Storytelling in a business context?", "Storytelling involves using words, images, and emotions to create a narrative that engages the audience.", "Impact:", "A well-crafted story captures attention, simplifies complex ideas, and helps the audience retain the message."),
    ("Define Collaboration.", "Collaboration is when two or more people work together to achieve a common goal.", "Process:", "It involves sharing ideas, resources, and efforts to solve problems or create something entirely new."),
    ("What is Iteration?", "Iteration means repeating a process with the aim of getting closer to a desired result.", "Mechanism:", "It involves making changes and improvements based on continuous feedback until the final outcome is achieved."),
    ("Why are Collaboration and Iteration important?", "They are important because collaboration allows people to pool knowledge to solve complex problems, while iteration helps refine the work, making it better with each step.", "Real-World Example:", "Community members planning a clean-up drive, adjusting their plans as they work (iteration), and continuing to work together (collaboration)."),
    ("Differentiate between Innovation and Creativity.", "Innovation is the process of developing new ideas, products, or methods that bring about significant change or improvement, whereas Creativity is the ability to use imagination to think in new and original ways.", "Key Difference:", "Creativity is generating unique ideas, while innovation is applying them to improve or invent something tangible."),
    ("How can one foster Innovation and Creativity?", "You can foster these skills by being curious, being willing to take risks, thinking outside the box, and collaborating with others.", "Key Point:", "Many successful innovations come directly from learning from initial failures while taking risks."),
    ("What is a Focus Group?", "A focus group consists of a small, diverse set of individuals brought together to engage in detailed discussions about a product, service, or concept.", "Objective:", "The primary goal is to obtain a comprehensive, qualitative understanding of customer opinions, likes, and dislikes."),
    ("What role do collaborative tools play in teamwork?", "Collaborative tools allow multiple people to contribute to a task or document simultaneously, providing a platform for real-time feedback and revisions.", "Examples:", "Platforms like Google Drive or Dropbox Paper."),
    ("What is the purpose of collecting market insights?", "Collecting market insights involves gathering information about target customers and competitors to make informed decisions about business strategy, products, and marketing efforts.", "Key Advantage:", "It helps a business understand trends and turn raw data into useful strategies.")
]


phase2_qs = [
    ("What is the primary goal of entrepreneurship?", "To solve problems and create value for customers.", "Value:", "Understanding and assisting users is top priority."),
    ("How do you define the \"Define\" step?", "Clearly defining the problem after gathering info.", "Significance:", "Provides clear context to focus ideation."),
    ("What is \"Ideate\"?", "Brainstorming all possible solutions.", "Methodology:", "Encourages free thinking and out of box ideas."),
    ("Describe \"Test\" phase.", "Gathering feedback from users on the prototype.", "Outcome:", "Tells if the solution effectively solves user needs."),
    ("What are Business Solutions?", "Practical ways to solve company problems.", "Focus:", "Creating new market opportunities successfully."),
    ("What is in a \"Business Description\"?", "Products/services, target customers, and uniqueness.", "Application:", "Forms the core identity of the business."),
    ("Purpose of \"Products or Services\" section?", "Detailing features and benefits.", "Clarity:", "Explains exactly what the product brings to market."),
    ("What does a \"Financial Plan\" outline?", "Budget, funding needs, and expected revenue.", "Importance:", "Ensures long term business feasibility."),
    ("How do digital tools assist in business plans?", "Provide templates and financial modeling.", "Advantage:", "Saves time and makes data reliable."),
    ("What are Customer Surveys?", "Tools for numerical data from large groups.", "Data Type:", "Quantitative data for statistical trends."),
    ("Why is \"Trends and Patterns\" important?", "To adjust marketing/promotions effectively.", "Strategy:", "Maintains business competitiveness."),
    ("Main purpose of Data-Driven Decisions?", "Well-informed decisions to improve success.", "Benefit:", "Drives realistic and accurate results."),
    ("Three elements of effective communication?", "Clear Speaking, Body Language, and Listening.", "Importance:", "Ensures exact message transmission."),
    ("What is \"Understanding Customer Needs\"?", "Providing products that meet specific demands.", "Result:", "Improves overall satisfaction metric."),
    ("What is \"Thinking Outside the Box\"?", "Looking at problems from different perspectives.", "Creativity:", "Sparks original and completely new paths.")
]

phase3_qs = [
    ("Why advertise more during Ramadan/Eid?", "People shop more; strategic for boosting sales.", "Cultural Event:", "Timing is critical for revenue."),
    ("Mobile banking as innovation?", "Saves time for rural areas via phone transactions.", "Impact:", "Provides services to previously unbanked sectors."),
    ("Indus Valley Civilization example?", "Early examples of collaboration and iteration.", "History:", "Deeply rooted proof of human group effort."),
    ("Traditional Pakistani storytelling?", "Heer Ranjha and Sassi Punnu lessons.", "Engagement:", "Uses familiar regional narrative structure."),
    ("How have adaptive platforms changed education?", "Personalized learning by adjusting difficulty.", "Tech Advance:", "Makes teaching fit the specific child pace."),
    ("Iteration vs Cooking?", "Both involve adjusting based on feedback until perfect.", "Analogy:", "Tasting and adding missing pieces naturally."),
    ("Core principle of Design Thinking?", "Human-centered approach.", "Focus:", "It is about the human using the system."),
    ("Characteristics of a successful pitch?", "Clear and persuasive.", "Goal:", "Helps quickly grab needed investments."),
    ("Purpose of collecting market insights?", "Understand customer needs and trends.", "Utility:", "Avoids building useless products."),
    ("Why conduct school debates on storytelling?", "Makes arguments more engaging/persuasive.", "Skill Building:", "Helps create structured speaking habits.")
]

def generate_card(q, a, b_title, b_text):
    return f'''
                <!-- Question Card -->
                <article class="question-card">
                    <div class="q-header">
                        <span class="q-label">Q:</span>
                        <h3 class="question-title">{q}</h3>
                        <button class="copy-btn" aria-label="Copy Q&A">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                    <div class="a-body">
                        <span class="a-label">Ans:</span>
                        <p class="answer-text">{a}</p>
                    </div>
                    <div class="card-footer">
                        <span class="extra-badge">{b_title}</span>
                        <p class="extra-text">{b_text}</p>
                    </div>
                </article>'''

html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EduNotes Mastery | Board Exam Notes</title>
    <!-- Premium Tech Font: Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="dashboard-container">

    <!-- ========================================== -->
    <!-- GLASSMORPHISM SIDEBAR (LEFT)               -->
    <!-- ========================================== -->
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <!-- Logo Area -->
            <div class="logo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
                <span>EduNotes Mastery</span>
            </div>
            <!-- Mobile Close Button -->
            <button class="close-sidebar-btn" id="closeSidebar" aria-label="Close Sidebar">&times;</button>
        </div>

        <nav class="sidebar-nav">
            <p class="nav-title">SUBJECTS</p>

            <!-- Accordion Item: Computer Science -->
            <div class="nav-item has-dropdown active">
                <a href="#" class="nav-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                    <span>Computer Science</span>
                </a>
                <!-- Dropdown for Chapters -->
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-link">Chapter 1</a>
                    <a href="#" class="dropdown-link">Chapter 2</a>
                    <a href="#" class="dropdown-link">Chapter 3</a>
                    <a href="#" class="dropdown-link">Chapter 4</a>
                    <a href="#" class="dropdown-link">Chapter 5</a>
                    <a href="#" class="dropdown-link">Chapter 6</a>
                    <a href="#" class="dropdown-link">Chapter 7</a>
                    <a href="#" class="dropdown-link">Chapter 8</a>
                    <a href="#" class="dropdown-link active-dropdown">Chapter 9</a>
                </div>
            </div>

            <!-- Placeholder Links for Other Subjects -->
            <div class="nav-item">
                <a href="#" class="nav-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                    <span>Physics</span>
                </a>
            </div>
            <div class="nav-item">
                <a href="#" class="nav-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                    <span>English</span>
                </a>
            </div>
            <div class="nav-item">
                <a href="#" class="nav-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    <span>Urdu</span>
                </a>
            </div>
            <div class="nav-item">
                <a href="#" class="nav-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    <span>Islamiyat</span>
                </a>
            </div>
        </nav>
    </aside>

    <!-- ========================================== -->
    <!-- MAIN CONTENT AREA (RIGHT)                  -->
    <!-- ========================================== -->
    <div class="main-wrapper">

        <!-- Top Navbar -->
        <header class="topbar">
            <!-- Mobile Hamburger Menu Toggle -->
            <button class="menu-toggle-btn" id="openSidebar" aria-label="Open Sidebar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>

            <!-- Modern Search Bar -->
            <div class="search-container">
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="searchInput" placeholder="Search questions, chapters..." class="search-input">
            </div>

            <!-- Theme Toggle Placeholder -->
            <div class="theme-toggle">
                <button class="theme-btn" id="themeToggleBtn" aria-label="Toggle Dark/Light Mode">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
            </div>
        </header>

        <!-- Main Content Feed -->
        <main class="content-area" id="contentArea"> <!-- Added ID here for script -->

            <!-- Scroll Progress Bar -->
            <div class="progress-container">
                <div class="progress-bar" id="progressBar"></div>
            </div>

            <!-- Chapter Header Banner -->
            <div class="chapter-header-banner">
                <div class="banner-content">
                    <span class="badge">Computer Science</span>
                    <h1>Chapter 9: Entrepreneurship in Digital Age</h1>
                    <p>Comprehensive Short Questions Bank</p>
                </div>
            </div>

            <!-- Tab Navigation System -->
            <div class="tab-navigation">
                <button class="tab-btn active" data-target="tab-most-important">
                    <span class="tab-icon">??</span> Most Important
                </button>
                <button class="tab-btn" data-target="tab-important">
                    <span class="tab-icon">?</span> Important
                </button>
                <button class="tab-btn" data-target="tab-conceptual">
                    <span class="tab-icon">??</span> Conceptual / Gems
                </button>
            </div>

            <!-- Questions Feed Container -->
            <div class="questions-feed">
                <!-- Tab 1 -->
                <div class="tab-pane active" id="tab-most-important">
'''

for q, a, bt, bx in phase1_qs:
    html += generate_card(q, a, bt, bx)

html += '''
                </div>
                <!-- Tab 2 -->
                <div class="tab-pane" id="tab-important">
'''

for q, a, bt, bx in phase2_qs:
    html += generate_card(q, a, bt, bx)

html += '''
                </div>
                <!-- Tab 3 -->
                <div class="tab-pane" id="tab-conceptual">
'''

for q, a, bt, bx in phase3_qs:
    html += generate_card(q, a, bt, bx)

html += '''
                </div>
            </div>
        </main>
    </div>
</div>

<script src="script.js"></script>
</body>
</html>
'''

with open(r'd:\Python_ka_chilla\index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Rebuilt index.html securely!")
