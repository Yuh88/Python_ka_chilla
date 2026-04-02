import re

with open("script.js", "r", encoding="utf8") as f:
    c = f.read()

# 1. Update buildNavState definition
c = re.sub(
    r"const buildNavState = \(view, subject = null, chapter = null\) => \(\{",
    "const buildNavState = (view, subject = null, chapter = null, islamiyatBaabId = null) => ({",
    c
)
c = re.sub(
    r"chapter\n      \}\);",
    "chapter,\n          islamiyatBaabId\n      });",
    c
)

# 2. Update normalizeNavState
c = re.sub(
    r"if \(state\.view === 'chapters' && state\.subject\) \{\n              return buildNavState\('chapters', state\.subject\);\n          \}",
    "if (state.view === 'chapters' && state.subject) {\n              return buildNavState('chapters', state.subject, null, state.islamiyatBaabId);\n          }",
    c
)

# 3. Update renderNavState
c = re.sub(
    r"\} else if \(safeState\.view === 'chapters' && safeState\.subject\) \{\n              showChapterSelection\(safeState\.subject\);\n          \} else if \(safeState\.view === 'content'",
    "} else if (safeState.view === 'chapters' && safeState.subject) {\n              showChapterSelection(safeState.subject, safeState.islamiyatBaabId);\n          } else if (safeState.view === 'content'",
    c
)

# 4. Update the Back button logic
old_back_logic = "          if (mode === 'subjects' && activeSubject === 'Islamiyat' && activeIslamiyatBaabId) {\n                  // In Islamiyat nested view, step back from topics grid to baab grid first.\n                  showChapterSelection('Islamiyat');\n                  return;\n              }"

new_back_logic = "          if (mode === 'subjects' && activeSubject === 'Islamiyat' && activeIslamiyatBaabId) {\n                  // In Islamiyat nested view, step back from topics grid to baab grid first.\n                  const state = buildNavState('chapters', 'Islamiyat');\n                  history.replaceState(state, '', getRoutePathFromState(state));\n                  showChapterSelection('Islamiyat', '');\n                  return;\n              }"

c = c.replace(old_back_logic, new_back_logic)

# 5. Update Topic card click to add history replaceState
old_topic_logic = "             if (subject && chapter) {\n                              navigateToState(buildNavState('content', subject, chapter), 'forward');\n                          }"

new_topic_logic = "             if (subject && chapter) {\n                              const currentState = buildNavState('chapters', 'Islamiyat', null, activeIslamiyatBaabId);\n                              history.replaceState(currentState, '', getRoutePathFromState(currentState));\n                              navigateToState(buildNavState('content', subject, chapter), 'forward');\n                          }"

c = c.replace(old_topic_logic, new_topic_logic)

with open("script.js", "w", encoding="utf8") as f:
    f.write(c)

# 6. Bump cache in index.html
with open("index.html", "r", encoding="utf8") as f:
    html = f.read()

html = html.replace('v=1.0.13', 'v=1.0.14')

with open("index.html", "w", encoding="utf8") as f:
    f.write(html)

print('Done')